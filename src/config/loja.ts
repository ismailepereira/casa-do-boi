/**
 * Dados da loja. Tudo que o cliente pode querer mudar sem mexer em componente.
 * TODO(cliente): confirmar telefone, endereço, horário e CNPJ reais.
 */
export const LOJA = {
  /**
   * Versão demonstrativa: exibe a faixa de aviso e bloqueia a indexação em
   * buscadores. Vira `false` com NEXT_PUBLIC_DEMO=false quando a loja for real.
   */
  demonstracao: process.env.NEXT_PUBLIC_DEMO !== "false",

  nome: "Casa do Boi FOS",
  slogan: "Tudo para o seu campo, do curral à roça",
  descricao:
    "Agropecuária completa: máquinas e ferramentas STIHL, suplemento mineral, ração, linha veterinária, cerca, insumos, vestuário e selaria.",

  // Só dígitos, com DDI. Sobrescrito por NEXT_PUBLIC_WHATSAPP.
  // TODO(cliente): confirmar se o WhatsApp é (91) 99205-9121 (com o 9 na frente).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "559192059121",
  whatsappExibicao: "(91) 9205-9121",
  telefone: "(91) 9205-9121",
  email: "contato@casadoboi.com.br",

  /** Dados cadastrais da Receita (CNPJ 52.433.274/0001-78, consultado em 04/09/2026). */
  razaoSocial: "Casa do Boi FOS LTDA",
  cnpj: "52.433.274/0001-78",

  endereco: {
    // TODO(cliente): a Receita traz o logradouro como "PARA, S/N" — confirmar se
    // é Rua ou Avenida Pará e se existe número/referência para a entrega.
    rua: "Rua Pará, s/n",
    bairro: "Imperatriz",
    cidade: "Anapu",
    uf: "PA",
    cep: "68365-000",
  },

  /** Onde a loja posta. Vira o `from.postal_code` da cotação de frete. */
  origemEnvio: {
    cep: "68365-000",
    agenciaCorreios: "AC Anapu — Av. Getúlio Vargas, 74, Centro",
    pontoTransportadora: "Viopex — Av. Getúlio Vargas, 27, Centro",
  },

  horario: [
    { dias: "Segunda a sexta", horas: "07h30 às 18h00" },
    { dias: "Sábado", horas: "07h30 às 12h00" },
    { dias: "Domingo", horas: "Fechado" },
  ],

  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",

  /** Frete grátis acima deste valor (em reais). */
  freteGratisAcima: 500,
  /** Desconto no PIX, em fração. */
  descontoPix: 0.05,
  /** Máximo de parcelas sem juros no cartão. */
  parcelasMax: 10,
} as const;
