/** Tipos de domínio da loja. Fase 2 troca a origem dos dados, não estes tipos. */

export type Categoria = {
  slug: string;
  nome: string;
  descricao: string;
  /** Nome do ícone do lucide-react usado no card da categoria. */
  icone: string;
  destaque?: boolean;
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
  descricao: string;
  especificacoes: { rotulo: string; valor: string }[];
  /** Unidade de venda exibida no card: un, saco 30kg, litro… */
  unidade: string;
  emEstoque: boolean;
  destaque?: boolean;
  /** Produto pesado/volumoso: venda só por orçamento no WhatsApp. */
  somenteOrcamento?: boolean;
};

export type ItemCarrinho = {
  produto: Produto;
  quantidade: number;
};
