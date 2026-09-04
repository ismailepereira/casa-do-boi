/**
 * Tabela de frete rodoviário para os itens que não vão pelos Correios
 * (sal, ração, arame, adubo, cocho, roçadeira, sela).
 *
 * Não existe API pública da Viopex nem da Transpress — quem calcula é esta
 * tabela. É assim que loja de agropecuária e de material de construção cotam
 * carga pesada: preço negociado por faixa de distância, aplicado sobre o peso.
 *
 * ⚠️ OS VALORES ABAIXO SÃO PROVISÓRIOS. Negocie a tabela com a transportadora,
 * substitua os números e vire `tabelaConfirmada` para `true` — enquanto estiver
 * `false`, o site mostra o valor como estimativa, com aviso na tela.
 */

export type FaixaFrete = {
  /** Limite superior da faixa, em km rodados a partir da loja. */
  ateKm: number;
  /** Rótulo mostrado ao cliente. */
  regiao: string;
  /** Valor fixo por despacho, em reais. */
  taxaFixa: number;
  /** Valor por quilo transportado, em reais. */
  porKg: number;
  prazoDias: number;
};

export const FRETE_TRANSPORTADORA = {
  /** Vire para `true` depois de cadastrar a tabela real da transportadora. */
  tabelaConfirmada: false,

  transportadora: "Transportadora rodoviária",

  /** Nenhum despacho sai por menos que isso. */
  valorMinimo: 45,

  /**
   * Acima deste peso a carga deixa de ser fracionada e vira negociação
   * caso a caso — o site manda para o WhatsApp em vez de dar preço.
   */
  pesoMaximoKg: 1000,

  faixas: [
    { ateKm: 60, regiao: "Anapu e entorno", taxaFixa: 20, porKg: 0.55, prazoDias: 2 },
    { ateKm: 200, regiao: "Altamira, Pacajá e Novo Repartimento", taxaFixa: 35, porKg: 0.95, prazoDias: 4 },
    { ateKm: 600, regiao: "Marabá, Tucuruí e região", taxaFixa: 60, porKg: 1.6, prazoDias: 7 },
    { ateKm: 1200, regiao: "Belém e nordeste do Pará", taxaFixa: 95, porKg: 2.4, prazoDias: 10 },
    { ateKm: Number.POSITIVE_INFINITY, regiao: "Demais regiões do Brasil", taxaFixa: 140, porKg: 3.6, prazoDias: 15 },
  ] satisfies FaixaFrete[],
} as const;

/** Faixa correspondente à distância rodada, em km. */
export function faixaPorDistancia(km: number): FaixaFrete {
  return (
    FRETE_TRANSPORTADORA.faixas.find((f) => km <= f.ateKm) ??
    FRETE_TRANSPORTADORA.faixas[FRETE_TRANSPORTADORA.faixas.length - 1]
  );
}
