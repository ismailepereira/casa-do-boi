/** Tipos de domínio da loja. Fase 2 troca a origem dos dados, não estes tipos. */

export type Categoria = {
  slug: string;
  nome: string;
  descricao: string;
  /** Nome do ícone do lucide-react usado no card da categoria. */
  icone: string;
  destaque?: boolean;
};

/** Como o item chega ao cliente. Define se entra na cotação de frete dos Correios. */
export type ModalidadeEnvio =
  /** Cabe nos limites dos Correios (30 kg, lado ≤ 100 cm, soma ≤ 200 cm). */
  | "correios"
  /** Excede os Correios ou o frete fica inviável: transportadora/entrega própria. */
  | "transportadora"
  /** Só retirada na loja (cadeia fria, produto controlado). */
  | "retirada";

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
 * Um bloco de entrega do pedido. Um mesmo carrinho pode gerar mais de um:
 * o que vai pelos Correios, o que vai de transportadora e o que só sai na loja.
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
