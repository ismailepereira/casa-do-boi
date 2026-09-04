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
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5591000000000",
  whatsappExibicao: "(91) 90000-0000",
  telefone: "(91) 90000-0000",
  email: "contato@casadoboi.com.br",

  endereco: {
    // TODO(cliente): confirmar rua e número. 68365-000 é o CEP geral de Anapu.
    rua: "Av. Getúlio Vargas, 000",
    bairro: "Centro",
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
