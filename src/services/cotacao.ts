import "server-only";

import { FRETE_TRANSPORTADORA, faixaPorDistancia } from "@/config/freteTransportadora";
import { pesoTaxavel } from "@/lib/frete";
import { coordenadaDoCep, distanciaRodoviariaKm } from "@/services/geoCep";
import { cotarCorreios } from "@/services/melhorEnvio";
import type { GrupoFrete, ItemCarrinho, OpcaoFrete, ResultadoFrete } from "@/types";

/**
 * Orquestra a cotação do pedido inteiro.
 *
 * Um carrinho pode misturar sal de 30 kg com óleo de 500 ml — cada parte segue
 * por um caminho diferente, então a resposta vem separada em grupos e o cliente
 * entende por que recebe em duas entregas.
 */

const CEP_ORIGEM = (process.env.FRETE_CEP_ORIGEM ?? "68365000").replace(/\D/g, "");

function pesoTotal(itens: ItemCarrinho[]): number {
  return itens.reduce(
    (soma, { produto, quantidade }) => soma + pesoTaxavel(produto.logistica) * quantidade,
    0,
  );
}

/** Cotação rodoviária pela tabela negociada, sem depender de API externa. */
async function cotarTransportadora(
  cepDestino: string,
  itens: ItemCarrinho[],
): Promise<GrupoFrete> {
  const grupo: GrupoFrete = {
    chave: "transportadora",
    titulo: "Transportadora",
    itens: itens.map((i) => i.produto.nome),
    opcoes: [],
  };

  const peso = pesoTotal(itens);
  if (peso > FRETE_TRANSPORTADORA.pesoMaximoKg) {
    grupo.aviso = `São ${peso.toFixed(0)} kg — acima disso o frete é fechado caso a caso. Peça o orçamento pelo WhatsApp.`;
    return grupo;
  }

  const [origem, destino] = await Promise.all([
    coordenadaDoCep(CEP_ORIGEM),
    coordenadaDoCep(cepDestino),
  ]);

  if (!origem || !destino) {
    grupo.aviso =
      "Não conseguimos localizar esse CEP para calcular a rota. Peça o orçamento pelo WhatsApp que a gente confirma o valor.";
    return grupo;
  }

  const km = distanciaRodoviariaKm(origem, destino);
  const faixa = faixaPorDistancia(km);
  const bruto = faixa.taxaFixa + peso * faixa.porKg;
  const preco = Math.max(FRETE_TRANSPORTADORA.valorMinimo, bruto);

  grupo.opcoes = [
    {
      id: "transportadora-rodoviario",
      transportadora: FRETE_TRANSPORTADORA.transportadora,
      servico: faixa.regiao,
      precoBRL: Math.round(preco * 100) / 100,
      prazoDias: faixa.prazoDias,
      simulado: !FRETE_TRANSPORTADORA.tabelaConfirmada,
    },
  ];
  return grupo;
}

export async function cotarPedido(
  cepDestinoBruto: string,
  itens: ItemCarrinho[],
): Promise<ResultadoFrete> {
  const cepDestino = cepDestinoBruto.replace(/\D/g, "");

  const porCorreios = itens.filter((i) => i.produto.logistica.modalidade === "correios");
  const porTransportadora = itens.filter(
    (i) => i.produto.logistica.modalidade === "transportadora",
  );
  const paraRetirada = itens.filter((i) => i.produto.logistica.modalidade === "retirada");

  const grupos: GrupoFrete[] = [];

  if (porCorreios.length > 0) {
    const { opcoes } = await cotarCorreios(cepDestino, porCorreios);
    grupos.push({
      chave: "correios",
      titulo: "Correios",
      itens: porCorreios.map((i) => i.produto.nome),
      opcoes,
      aviso:
        opcoes.length === 0
          ? "Os Correios não retornaram opção para este CEP. Fale com a loja pelo WhatsApp."
          : undefined,
    });
  }

  if (porTransportadora.length > 0) {
    grupos.push(await cotarTransportadora(cepDestino, porTransportadora));
  }

  if (paraRetirada.length > 0) {
    grupos.push({
      chave: "retirada",
      titulo: "Retirada na loja",
      itens: paraRetirada.map((i) => i.produto.nome),
      opcoes: [],
      aviso:
        paraRetirada[0].produto.logistica.observacao ??
        "Este item não pode ser transportado por encomenda e sai apenas na loja.",
    });
  }

  const simulado = grupos.some((g) => g.opcoes.some((o: OpcaoFrete) => o.simulado));

  return { grupos, simulado };
}
