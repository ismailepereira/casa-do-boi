/** Tipos de domínio da loja. Fase 2 troca a origem dos dados, não estes tipos. */

export type Categoria = {
  slug: string;
  nome: string;
  descricao: string;
  /** Nome do ícone do lucide-react usado no card da categoria. */
  icone: string;
  destaque?: boolean;
};

/**
 * Como o item chega ao cliente.
 *
 * A loja envia **somente pelos Correios**. O que não cabe nos limites deles
 * (30 kg, lado ≤ 100 cm, soma ≤ 200 cm) ou não pode ser postado fica disponível
 * apenas para retirada na loja — a entrega por transportadora é uma etapa
 * contratada à parte.
 */
export type ModalidadeEnvio = "correios" | "retirada";

/**
 * Dados de logística do produto — **do produto embalado, pronto para postar**.
 *
 * ATENÇÃO: os valores atuais são ESTIMATIVAS. Cada item precisa ser pesado na
 * balança e medido com a caixa fechada antes de virar cotação de frete real:
 * peso a menos = frete cobrado abaixo do custo em toda venda.
 */
export type Logistica = {
  /** Peso bruto em kg, com embalagem. */
  pesoKg: number;
  comprimentoCm: number;
  larguraCm: number;
  alturaCm: number;
  modalidade: ModalidadeEnvio;
  /** Motivo da modalidade ou restrição a observar na postagem. */
  observacao?: string;
};

export type Produto = {
  slug: string;
  nome: string;
  marca: string;
  categoria: string;
  /** Preço à vista no PIX, em reais. */
  preco: number;
  /** Preço "de", riscado. Ausente = sem desconto. */
  precoDe?: number;
  imagem: string;
  /** Fotos adicionais para a galeria. A `imagem` é sempre a primeira. */
  imagens?: string[];
  descricao: string;
  especificacoes: { rotulo: string; valor: string }[];
  /** Unidade de venda exibida no card: un, saco 30kg, litro… */
  unidade: string;
  emEstoque: boolean;
  logistica: Logistica;
  destaque?: boolean;
  /** Produto pesado/volumoso: venda só por orçamento no WhatsApp. */
  somenteOrcamento?: boolean;
};

export type ItemCarrinho = {
  produto: Produto;
  quantidade: number;
};

/** Uma opção de envio devolvida pela cotação. */
export type OpcaoFrete = {
  id: string;
  transportadora: string;
  servico: string;
  precoBRL: number;
  prazoDias: number;
  /** true quando o valor é estimado, não veio da transportadora. */
  simulado: boolean;
};

/**
 * Um bloco de entrega do pedido. Um mesmo carrinho pode gerar dois: o que vai
 * pelos Correios e o que sai apenas na retirada.
 */
export type GrupoFrete = {
  chave: ModalidadeEnvio;
  titulo: string;
  /** Nomes dos produtos que caem neste grupo. */
  itens: string[];
  opcoes: OpcaoFrete[];
  /** Explicação mostrada quando o grupo não tem preço a exibir. */
  aviso?: string;
};

export type ResultadoFrete = {
  grupos: GrupoFrete[];
  /** true quando algum valor exibido ainda é estimativa. */
  simulado: boolean;
};

// ── Pedido ───────────────────────────────────────────────────────────

export type EnderecoEntrega = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type ClientePedido = {
  nome: string;
  /** CPF ou CNPJ, so digitos. Necessario para a nota fiscal. */
  documento: string;
  email: string;
  telefone: string;
  endereco: EnderecoEntrega;
};

export type ItemPedido = {
  slug: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
};

export type EntregaPedido = {
  tipo: ModalidadeEnvio;
  /** Nome do servico escolhido, quando houver (PAC, SEDEX). */
  servico?: string;
  valor: number;
  prazoDias: number;
};

/** Pedido ja validado no servidor, pronto para virar e-mail. */
export type PedidoRecebido = {
  /** Numero visivel ao cliente, no formato CB-AAMMDD-XXXX. */
  numero: string;
  criadoEm: string;
  cliente: ClientePedido;
  itens: ItemPedido[];
  entrega: EntregaPedido;
  subtotal: number;
  total: number;
  observacao?: string;
};
