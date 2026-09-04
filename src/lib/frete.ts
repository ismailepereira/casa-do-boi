import type { Logistica, Produto } from "@/types";

/**
 * Regras de encomenda dos Correios (PAC/SEDEX), verificadas em 04/09/2026.
 * Reconferir antes de fechar contrato — os Correios revisam esses limites.
 */
export const CORREIOS = {
  pesoMaximoKg: 30,
  ladoMaximoCm: 100,
  somaMaximaCm: 200,
  /** Acima disso em qualquer lado, incide taxa de grande formato. */
  ladoTaxaExtraCm: 70,
  minimo: { comprimentoCm: 15, larguraCm: 10, alturaCm: 1 },
  /** Divisor da cubagem: C × L × A ÷ 6000. */
  fatorCubagem: 6000,
} as const;

/** Peso cubado em kg — C × L × A ÷ 6000, com medidas em cm. */
export function pesoCubado(l: Logistica): number {
  return (l.comprimentoCm * l.larguraCm * l.alturaCm) / CORREIOS.fatorCubagem;
}

/** Peso que os Correios cobram: o maior entre o real e o cubado. */
export function pesoTaxavel(l: Logistica): number {
  return Math.max(l.pesoKg, pesoCubado(l));
}

export type AvaliacaoCorreios = {
  cabe: boolean;
  /** Motivos pelos quais o pacote não é postável. Vazio quando cabe. */
  impedimentos: string[];
  /** Avisos que não impedem a postagem, mas encarecem o frete. */
  alertas: string[];
};

/** Confere um pacote contra os limites dos Correios. */
export function avaliarCorreios(l: Logistica): AvaliacaoCorreios {
  const lados = [l.comprimentoCm, l.larguraCm, l.alturaCm];
  const soma = lados.reduce((a, b) => a + b, 0);
  const maiorLado = Math.max(...lados);

  const impedimentos: string[] = [];
  if (l.pesoKg > CORREIOS.pesoMaximoKg) {
    impedimentos.push(`Peso de ${l.pesoKg} kg acima do limite de ${CORREIOS.pesoMaximoKg} kg`);
  }
  if (maiorLado > CORREIOS.ladoMaximoCm) {
    impedimentos.push(`Lado de ${maiorLado} cm acima do limite de ${CORREIOS.ladoMaximoCm} cm`);
  }
  if (soma > CORREIOS.somaMaximaCm) {
    impedimentos.push(`Soma de ${soma} cm acima do limite de ${CORREIOS.somaMaximaCm} cm`);
  }

  const alertas: string[] = [];
  if (maiorLado > CORREIOS.ladoTaxaExtraCm && maiorLado <= CORREIOS.ladoMaximoCm) {
    alertas.push(`Lado de ${maiorLado} cm: incide taxa de grande formato`);
  }
  if (pesoCubado(l) > l.pesoKg) {
    alertas.push(
      `Frete cobrado pelo peso cubado (${pesoCubado(l).toFixed(1)} kg), não pelo real`,
    );
  }
  if (
    l.comprimentoCm < CORREIOS.minimo.comprimentoCm ||
    l.larguraCm < CORREIOS.minimo.larguraCm ||
    l.alturaCm < CORREIOS.minimo.alturaCm
  ) {
    alertas.push("Abaixo da caixa mínima (15 × 10 × 1 cm): usar embalagem maior");
  }

  return { cabe: impedimentos.length === 0, impedimentos, alertas };
}

/** Divide o carrinho entre o que vai por Correios e o que precisa de transportadora. */
export function separarPorModalidade(produtos: Produto[]) {
  return {
    correios: produtos.filter((p) => p.logistica.modalidade === "correios"),
    transportadora: produtos.filter((p) => p.logistica.modalidade === "transportadora"),
    retirada: produtos.filter((p) => p.logistica.modalidade === "retirada"),
  };
}
