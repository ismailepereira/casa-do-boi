import { NextResponse } from "next/server";
import { produtoPorSlug } from "@/services/catalogo";
import { cotarPedido } from "@/services/cotacao";
import { enviarEmailsDoPedido } from "@/services/email";
import { ipDaRequisicao, verificarLimite } from "@/lib/limiteTaxa";
import {
  apenasDigitos,
  cepValido,
  documentoValido,
  emailValido,
  limparTexto,
  nomeValido,
  telefoneValido,
} from "@/lib/validacao";
import type { ItemPedido, PedidoRecebido } from "@/types";

/**
 * Recebe o pedido do checkout.
 *
 * Regras que valem aqui, não no navegador:
 * - preço vem SEMPRE do catálogo do servidor, nunca do corpo da requisição
 * - o frete é recalculado, não aceito do cliente
 * - limite por IP para não virar porta de pedido falso
 */

const MAXIMO_ITENS = 40;

type Corpo = {
  cliente?: Record<string, unknown> & { endereco?: Record<string, unknown> };
  itens?: { slug?: string; quantidade?: number }[];
  entregaEscolhida?: { id?: string };
  observacao?: string;
  /** Campo invisível: se vier preenchido, foi robô. */
  armadilha?: string;
};

function erro(mensagem: string, status = 400) {
  return NextResponse.json({ erro: mensagem }, { status });
}

export async function POST(requisicao: Request) {
  // Um pedido a cada 30s por IP, no máximo 5 por hora.
  const ip = ipDaRequisicao(requisicao);
  const curto = verificarLimite(`pedido-curto:${ip}`, 1, 30);
  const longo = verificarLimite(`pedido-longo:${ip}`, 5, 3600);
  if (!curto.permitido || !longo.permitido) {
    return erro(
      "Muitas tentativas seguidas. Aguarde um instante e envie de novo.",
      429,
    );
  }

  let corpo: Corpo;
  try {
    corpo = (await requisicao.json()) as Corpo;
  } catch {
    return erro("Não consegui ler os dados do pedido.");
  }

  // Robô preenche todo campo que encontra; pessoa não vê este.
  if (limparTexto(corpo.armadilha, 10)) {
    return erro("Não foi possível enviar o pedido.");
  }

  // ── Cliente ────────────────────────────────────────────────────────
  const c = corpo.cliente ?? {};
  const e = c.endereco ?? {};

  const nome = limparTexto(c.nome, 120);
  const documento = apenasDigitos(limparTexto(c.documento, 20));
  const email = limparTexto(c.email, 254);
  const telefone = apenasDigitos(limparTexto(c.telefone, 20));
  const cep = apenasDigitos(limparTexto(e.cep, 12));

  if (!nomeValido(nome)) return erro("Informe seu nome completo.");
  if (!documentoValido(documento)) return erro("CPF ou CNPJ inválido.");
  if (!emailValido(email)) return erro("E-mail inválido.");
  if (!telefoneValido(telefone)) return erro("Telefone inválido.");
  if (!cepValido(cep)) return erro("CEP inválido.");

  const endereco = {
    cep,
    logradouro: limparTexto(e.logradouro, 120),
    numero: limparTexto(e.numero, 20),
    complemento: limparTexto(e.complemento, 60) || undefined,
    bairro: limparTexto(e.bairro, 80),
    cidade: limparTexto(e.cidade, 80),
    uf: limparTexto(e.uf, 2).toUpperCase(),
  };
  if (!endereco.logradouro || !endereco.numero || !endereco.bairro || !endereco.cidade) {
    return erro("Preencha o endereço completo.");
  }

  // ── Itens: preço vem do catálogo, nunca do cliente ─────────────────
  const pedidos = corpo.itens ?? [];
  if (pedidos.length === 0) return erro("Seu carrinho está vazio.");
  if (pedidos.length > MAXIMO_ITENS) return erro("Pedido grande demais para o site.");

  const itensCarrinho = [];
  const itens: ItemPedido[] = [];

  for (const linha of pedidos) {
    const produto = await produtoPorSlug(String(linha.slug ?? ""));
    if (!produto) return erro("Um dos produtos saiu do catálogo. Refaça o carrinho.", 409);

    const quantidade = Math.max(1, Math.min(99, Math.trunc(Number(linha.quantidade) || 1)));
    itensCarrinho.push({ produto, quantidade });
    itens.push({
      slug: produto.slug,
      nome: produto.nome,
      quantidade,
      precoUnitario: produto.preco,
    });
  }

  /** Centavos fecham em 2 casas: soma de ponto flutuante gera resto. */
  const emReais = (v: number) => Math.round(v * 100) / 100;

  const subtotal = emReais(
    itens.reduce((s, i) => s + i.precoUnitario * i.quantidade, 0),
  );

  // ── Frete: recalculado no servidor ─────────────────────────────────
  let entrega: PedidoRecebido["entrega"];
  try {
    const cotacao = await cotarPedido(cep, itensCarrinho);
    const grupoCorreios = cotacao.grupos.find((g) => g.chave === "correios");
    const opcao =
      grupoCorreios?.opcoes.find((o) => o.id === corpo.entregaEscolhida?.id) ??
      grupoCorreios?.opcoes[0];

    entrega = opcao
      ? {
          tipo: "correios",
          servico: `${opcao.transportadora} ${opcao.servico}`.trim(),
          valor: opcao.precoBRL,
          prazoDias: opcao.prazoDias,
        }
      : { tipo: "retirada", valor: 0, prazoDias: 0 };
  } catch (falha) {
    console.error("Falha ao recalcular o frete do pedido:", falha);
    return erro("Não consegui confirmar o frete agora. Tente de novo em instantes.", 502);
  }

  // ── Pedido ─────────────────────────────────────────────────────────
  const agora = new Date();
  // Data no fuso da loja: em Anapu ainda e dia 5 quando o UTC ja virou dia 6.
  const dia = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Belem",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
    .format(agora)
    .split("/")
    .reverse()
    .join("");
  const sufixo = Math.random().toString(36).slice(2, 6).toUpperCase();

  const pedido: PedidoRecebido = {
    numero: `CB-${dia}-${sufixo}`,
    criadoEm: agora.toISOString(),
    cliente: { nome, documento, email, telefone, endereco },
    itens,
    entrega,
    subtotal,
    total: emReais(subtotal + entrega.valor),
    observacao: limparTexto(corpo.observacao, 500) || undefined,
  };

  try {
    const { enviado, motivo } = await enviarEmailsDoPedido(pedido);
    return NextResponse.json({
      numero: pedido.numero,
      total: pedido.total,
      entrega: pedido.entrega,
      avisoEnvio: enviado ? undefined : motivo,
    });
  } catch (falha) {
    console.error(`[pedido ${pedido.numero}] falha ao enviar e-mail:`, falha);
    return erro(
      "Seu pedido foi registrado, mas não conseguimos avisar a loja por e-mail. " +
        "Ligue para a loja informando o número " +
        pedido.numero,
      502,
    );
  }
}
