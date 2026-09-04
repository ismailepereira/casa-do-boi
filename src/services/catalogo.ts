import "server-only";

import { CATEGORIAS } from "@/data/categorias";
import { PRODUTOS } from "@/data/produtos";
import { blingConfigurado, listarProdutosBling, paraProduto } from "@/services/bling";
import type { Produto } from "@/types";

/**
 * Fonte única do catálogo para as telas.
 *
 * Com o Bling configurado, o catálogo vem de lá — o mesmo cadastro que abastece
 * o Mercado Livre e emite a nota. Sem credenciais, cai no catálogo local de
 * demonstração. Nenhuma página precisa saber qual dos dois está valendo.
 */

/**
 * De-para entre a categoria cadastrada no Bling e o departamento do site.
 * TODO(cliente): ajustar depois de ver como as categorias foram nomeadas lá.
 */
const DE_PARA_CATEGORIA: Record<string, string> = {
  "máquinas e ferramentas": "maquinas-e-ferramentas",
  máquinas: "maquinas-e-ferramentas",
  ferramentas: "maquinas-e-ferramentas",
  stihl: "maquinas-e-ferramentas",
  "suplemento e ração": "suplemento-e-racao",
  suplemento: "suplemento-e-racao",
  ração: "suplemento-e-racao",
  "sal mineral": "suplemento-e-racao",
  veterinário: "veterinario",
  medicamentos: "veterinario",
  "cerca e insumos": "cerca-e-insumos",
  cerca: "cerca-e-insumos",
  insumos: "cerca-e-insumos",
  "vestuário e selaria": "vestuario-e-selaria",
  vestuário: "vestuario-e-selaria",
  selaria: "vestuario-e-selaria",
};

const CATEGORIA_PADRAO = CATEGORIAS[0].slug;

function mapearCategoria(nome: string | undefined): string {
  if (!nome) return CATEGORIA_PADRAO;
  const chave = nome.trim().toLowerCase();
  if (DE_PARA_CATEGORIA[chave]) return DE_PARA_CATEGORIA[chave];

  // Tenta casar pelo nome do próprio departamento do site.
  const direta = CATEGORIAS.find(
    (c) => c.nome.toLowerCase() === chave || c.slug === chave,
  );
  return direta?.slug ?? CATEGORIA_PADRAO;
}

/** De onde veio o catálogo — útil para diagnóstico e para avisar na tela. */
export type OrigemCatalogo = "bling" | "local";

let cache: { produtos: Produto[]; origem: OrigemCatalogo; em: number } | null = null;
const VALIDADE_MS = 5 * 60 * 1000;

export async function catalogo(): Promise<{
  produtos: Produto[];
  origem: OrigemCatalogo;
}> {
  if (cache && Date.now() - cache.em < VALIDADE_MS) {
    return { produtos: cache.produtos, origem: cache.origem };
  }

  if (blingConfigurado()) {
    try {
      const doBling = await listarProdutosBling();
      const produtos = doBling
        .filter((p) => p.situacao !== "I") // fora os inativos
        .map((p) => paraProduto(p, mapearCategoria));

      if (produtos.length > 0) {
        cache = { produtos, origem: "bling", em: Date.now() };
        return { produtos, origem: "bling" };
      }
    } catch (erro) {
      // Catálogo do Bling fora do ar não pode derrubar a loja: cai no local.
      console.error("Bling indisponível, usando catálogo local:", erro);
    }
  }

  cache = { produtos: PRODUTOS, origem: "local", em: Date.now() };
  return { produtos: PRODUTOS, origem: "local" };
}

export async function listarProdutos(): Promise<Produto[]> {
  return (await catalogo()).produtos;
}

export async function produtoPorSlug(slug: string): Promise<Produto | undefined> {
  return (await listarProdutos()).find((p) => p.slug === slug);
}

export async function produtosPorCategoria(slug: string): Promise<Produto[]> {
  return (await listarProdutos()).filter((p) => p.categoria === slug);
}

export async function produtosDestaque(limite = 8): Promise<Produto[]> {
  const todos = await listarProdutos();
  const marcados = todos.filter((p) => p.destaque);
  // Sem destaque marcado (caso do Bling), mostra os primeiros em estoque.
  return (marcados.length > 0 ? marcados : todos.filter((p) => p.emEstoque)).slice(0, limite);
}

export async function produtosEmOferta(limite = 8): Promise<Produto[]> {
  return (await listarProdutos()).filter((p) => p.precoDe).slice(0, limite);
}

export async function buscarProdutos(termo: string): Promise<Produto[]> {
  const t = termo.trim().toLowerCase();
  if (!t) return [];
  return (await listarProdutos()).filter((p) =>
    [p.nome, p.marca, p.categoria, p.descricao].join(" ").toLowerCase().includes(t),
  );
}
