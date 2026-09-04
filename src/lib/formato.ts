/** Formatação de valores exibidos na loja. */

export function precoBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

/** Valor de cada parcela sem juros, respeitando o mínimo de R$ 50 por parcela. */
export function parcelamento(valor: number, parcelasMax: number) {
  const parcelas = Math.max(1, Math.min(parcelasMax, Math.floor(valor / 50)));
  return { parcelas, valorParcela: valor / parcelas };
}

export function descontoPercentual(precoDe: number, preco: number): number {
  return Math.round(((precoDe - preco) / precoDe) * 100);
}
