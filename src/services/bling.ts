import "server-only";

import type { Produto } from "@/types";

/**
 * Cliente da API v3 do Bling.
 *
 * O Bling é a fonte da verdade do catálogo: produto, preço e estoque são
 * cadastrados lá uma vez e valem para o site e para os marketplaces.
 *
 * Autenticação: OAuth 2.0 authorization code. O `refresh_token` (válido por 30
 * dias) fica no ambiente e é trocado por um `access_token` de vida curta a cada
 * necessidade. Enquanto não houver credenciais, o site usa o catálogo local —
 * ver `src/services/catalogo.ts`.
 *
 * Docs: https://developer.bling.com.br/bling-api
 */

const API = "https://api.bling.com.br/Api/v3";
const CLIENT_ID = process.env.BLING_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.BLING_CLIENT_SECRET ?? "";
const REFRESH_TOKEN = process.env.BLING_REFRESH_TOKEN ?? "";

export function blingConfigurado(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN);
}

/** Token em memória, renovado só quando falta menos de um minuto para expirar. */
let tokenCache: { valor: string; expiraEm: number } | null = null;

export async function accessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiraEm - 60_000) {
    return tokenCache.valor;
  }
  if (!blingConfigurado()) {
    throw new Error("Bling sem credenciais: preencha BLING_* no .env.local.");
  }

  const basica = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const resposta = await fetch(`${API}/oauth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basica}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(
      `Bling recusou o refresh_token (${resposta.status}). ` +
        `Ele vale 30 dias — se expirou, refaça a autorização. ${detalhe.slice(0, 200)}`,
    );
  }

  const dados = (await resposta.json()) as { access_token: string; expires_in: number };
  tokenCache = {
    valor: dados.access_token,
    expiraEm: Date.now() + dados.expires_in * 1000,
  };
  return tokenCache.valor;
}

async function chamar<T>(caminho: string): Promise<T> {
  const resposta = await fetch(`${API}${caminho}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${await accessToken()}`,
    },
    // O catálogo muda pouco; revalida de hora em hora.
    next: { revalidate: 3600 },
  });

  if (!resposta.ok) {
    throw new Error(`Bling respondeu ${resposta.status} em ${caminho}`);
  }
  return (await resposta.json()) as T;
}

/** Formato reduzido do produto do Bling — só o que o site usa. */
export type ProdutoBling = {
  id: number;
  nome: string;
  codigo?: string;
  preco?: number;
  situacao?: string;
  descricaoCurta?: string;
  imagemURL?: string;
  pesoLiquido?: number;
  pesoBruto?: number;
  estoque?: { saldoVirtualTotal?: number };
  categoria?: { id?: number; descricao?: string };
  dimensoes?: {
    largura?: number;
    altura?: number;
    profundidade?: number;
    unidadeMedida?: number;
  };
  marca?: string;
};

/** Percorre a paginação e devolve o catálogo inteiro. */
export async function listarProdutosBling(limitePaginas = 20): Promise<ProdutoBling[]> {
  const todos: ProdutoBling[] = [];

  for (let pagina = 1; pagina <= limitePaginas; pagina++) {
    const { data } = await chamar<{ data: ProdutoBling[] }>(
      `/produtos?pagina=${pagina}&limite=100&criterio=2`,
    );
    if (!data?.length) break;
    todos.push(...data);
    if (data.length < 100) break;
  }

  return todos;
}

/** Slug estável a partir do nome, para a URL do produto. */
export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

/**
 * Converte o produto do Bling para o tipo usado nas telas.
 *
 * `mapearCategoria` recebe a categoria do Bling e devolve o slug do
 * departamento do site — o de-para fica em `catalogo.ts`, porque depende de
 * como o cliente nomeou as categorias dentro do Bling.
 */
export function paraProduto(
  p: ProdutoBling,
  mapearCategoria: (nome: string | undefined) => string,
): Produto {
  const largura = p.dimensoes?.largura ?? 0;
  const altura = p.dimensoes?.altura ?? 0;
  const comprimento = p.dimensoes?.profundidade ?? 0;
  const peso = p.pesoBruto ?? p.pesoLiquido ?? 0;

  // Sem medida cadastrada não dá para cotar frete: cai em orçamento.
  const temMedidas = peso > 0 && largura > 0 && altura > 0 && comprimento > 0;
  const cabeNosCorreios =
    temMedidas &&
    peso <= 30 &&
    Math.max(largura, altura, comprimento) <= 100 &&
    largura + altura + comprimento <= 200;

  return {
    slug: slugify(p.codigo || p.nome),
    nome: p.nome,
    marca: p.marca ?? "",
    categoria: mapearCategoria(p.categoria?.descricao),
    preco: p.preco ?? 0,
    imagem: p.imagemURL || "/produtos/placeholder.svg",
    descricao: p.descricaoCurta ?? "",
    especificacoes: [],
    unidade: "unidade",
    emEstoque: (p.estoque?.saldoVirtualTotal ?? 0) > 0,
    somenteOrcamento: !temMedidas,
    logistica: {
      pesoKg: peso,
      comprimentoCm: comprimento,
      larguraCm: largura,
      alturaCm: altura,
      modalidade: cabeNosCorreios ? "correios" : "transportadora",
      observacao: temMedidas
        ? undefined
        : "Sem peso e dimensões cadastrados no Bling — frete por orçamento.",
    },
  };
}
