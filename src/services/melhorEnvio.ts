import "server-only";

import { pesoTaxavel } from "@/lib/frete";
import type { OpcaoFrete, Produto, ResultadoFrete } from "@/types";

/**
 * Cliente da API do Melhor Envio.
 *
 * Enquanto `MELHORENVIO_TOKEN` estiver vazio, a cotação sai em modo SIMULADO —
 * a tela funciona ponta a ponta e o resultado vem marcado como estimativa.
 * Basta preencher o token no `.env.local` para passar a cotar de verdade, sem
 * mexer em componente nenhum.
 *
 * Docs: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos
 */

const URL_BASE = process.env.MELHORENVIO_URL ?? "https://sandbox.melhorenvio.com.br";
const TOKEN = process.env.MELHORENVIO_TOKEN ?? "";
const CEP_ORIGEM = (process.env.FRETE_CEP_ORIGEM ?? "68365000").replace(/\D/g, "");

export function integracaoConfigurada(): boolean {
  return TOKEN.length > 0;
}

type ItemCotacao = { produto: Produto; quantidade: number };

/** Monta o corpo que o Melhor Envio espera em /api/v2/me/shipment/calculate. */
function corpoCotacao(cepDestino: string, itens: ItemCotacao[]) {
  return {
    from: { postal_code: CEP_ORIGEM },
    to: { postal_code: cepDestino },
    products: itens.map(({ produto, quantidade }) => ({
      id: produto.slug,
      width: produto.logistica.larguraCm,
      height: produto.logistica.alturaCm,
      length: produto.logistica.comprimentoCm,
      weight: produto.logistica.pesoKg,
      insurance_value: produto.preco,
      quantity: quantidade,
    })),
  };
}

/**
 * Estimativa usada enquanto não há token. Não é tabela dos Correios — é uma
 * regra grosseira só para a tela ter o que mostrar durante o desenvolvimento.
 */
function cotacaoSimulada(cepDestino: string, itens: ItemCotacao[]): OpcaoFrete[] {
  const peso = itens.reduce(
    (soma, { produto, quantidade }) => soma + pesoTaxavel(produto.logistica) * quantidade,
    0,
  );
  // Região pelo primeiro dígito do CEP: Norte custa mais a partir do Pará.
  const regiao = Number(cepDestino[0]);
  const fator = regiao >= 6 ? 1 : 1.45;

  const basePac = (24 + peso * 3.2) * fator;
  const baseSedex = (38 + peso * 5.1) * fator;
  const prazoBase = regiao >= 6 ? 5 : 9;

  return [
    {
      id: "sim-pac",
      transportadora: "Correios",
      servico: "PAC",
      precoBRL: Math.round(basePac * 100) / 100,
      prazoDias: prazoBase + 4,
      simulado: true,
    },
    {
      id: "sim-sedex",
      transportadora: "Correios",
      servico: "SEDEX",
      precoBRL: Math.round(baseSedex * 100) / 100,
      prazoDias: prazoBase,
      simulado: true,
    },
  ];
}

type RespostaMelhorEnvio = {
  id?: number | string;
  name?: string;
  price?: string | number;
  delivery_time?: number;
  company?: { name?: string };
  error?: string;
};

/** Cota o frete dos itens postáveis. Itens de transportadora ficam de fora. */
export async function cotarFrete(
  cepDestinoBruto: string,
  itens: ItemCotacao[],
): Promise<ResultadoFrete> {
  const cepDestino = cepDestinoBruto.replace(/\D/g, "");

  const postaveis = itens.filter((i) => i.produto.logistica.modalidade === "correios");
  const foraDoCorreios = itens
    .filter((i) => i.produto.logistica.modalidade !== "correios")
    .map((i) => ({
      nome: i.produto.nome,
      motivo:
        i.produto.logistica.observacao ??
        (i.produto.logistica.modalidade === "retirada"
          ? "Somente retirada na loja"
          : "Entrega por transportadora"),
    }));

  if (postaveis.length === 0) {
    return { opcoes: [], simulado: false, foraDoCorreios };
  }

  if (!integracaoConfigurada()) {
    return { opcoes: cotacaoSimulada(cepDestino, postaveis), simulado: true, foraDoCorreios };
  }

  const resposta = await fetch(`${URL_BASE}/api/v2/me/shipment/calculate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "User-Agent": "Casa do Boi FOS (contato@casadoboi.com.br)",
    },
    body: JSON.stringify(corpoCotacao(cepDestino, postaveis)),
    cache: "no-store",
  });

  if (!resposta.ok) {
    throw new Error(`Melhor Envio respondeu ${resposta.status}`);
  }

  const dados = (await resposta.json()) as RespostaMelhorEnvio[];

  const opcoes = dados
    .filter((s) => !s.error && s.price != null)
    .map((s) => ({
      id: String(s.id ?? s.name ?? "servico"),
      transportadora: s.company?.name ?? "Transportadora",
      servico: s.name ?? "Serviço",
      precoBRL: Number(s.price),
      prazoDias: Number(s.delivery_time ?? 0),
      simulado: false,
    }))
    .sort((a, b) => a.precoBRL - b.precoBRL);

  return { opcoes, simulado: false, foraDoCorreios };
}
