/**
 * Regras de prazo e de pagamento do pedido.
 *
 * TODO(cliente): todos os números abaixo precisam ser confirmados pelo dono da
 * loja. Prazo prometido a menos gera reclamação; a mais, perde venda.
 */

export const ENTREGA = {
  /**
   * Dias úteis entre a confirmação do pagamento e a postagem na agência.
   * É o tempo de separar, embalar e emitir a etiqueta.
   */
  diasSeparacao: 2,

  /**
   * Horário de corte da AC Anapu. Pedido postado depois disso entra na malha
   * do dia seguinte.
   * TODO(cliente): confirmar na agência (Av. Getúlio Vargas, 74, Centro).
   */
  horarioCorte: "16h00",

  /** Prazo dos Correios por região, a partir de Anapu-PA, em dias úteis. */
  prazoCorreiosPorRegiao: [
    { regiao: "Pará e Amazonas", pac: "6 a 10 dias", sedex: "3 a 5 dias" },
    { regiao: "Norte (demais estados)", pac: "8 a 12 dias", sedex: "4 a 6 dias" },
    { regiao: "Nordeste e Centro-Oeste", pac: "10 a 15 dias", sedex: "5 a 8 dias" },
    { regiao: "Sudeste", pac: "12 a 18 dias", sedex: "6 a 9 dias" },
    { regiao: "Sul", pac: "14 a 20 dias", sedex: "7 a 10 dias" },
  ],

  /**
   * Prazo mostrado ao cliente = separação + transporte. Prometer só o prazo
   * dos Correios é o erro clássico: o pacote não sai no mesmo minuto da compra.
   */
  observacaoPrazo:
    "O prazo começa a contar depois da confirmação do pagamento e já inclui o tempo de separação na loja.",
} as const;

export const PAGAMENTO = {
  /**
   * Nesta etapa o pagamento é manual: a loja envia a cobrança e confere.
   * Quando o checkout online for contratado, esta seção sai.
   */
  manual: true,

  /** TODO(cliente): chave PIX real da Casa do Boi FOS LTDA. */
  chavePix: "52.433.274/0001-78",
  tipoChavePix: "CNPJ",
  favorecido: "Casa do Boi FOS LTDA",

  formas: [
    "PIX à vista, com desconto",
    "Cartão de crédito na loja",
    "Dinheiro na retirada",
  ],

  /** Horas para o cliente pagar antes do pedido ser liberado do estoque. */
  horasParaPagar: 24,
} as const;
