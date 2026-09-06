import "server-only";

import { PRODUTOS } from "@/data/produtos";
import type { Produto } from "@/types";

/**
 * Fonte única do catálogo para as telas.
 *
 * Hoje os produtos vêm do arquivo local. A camada existe para que a troca por
 * banco ou ERP, quando for contratada, não encoste em nenhuma página: elas
 * chamam estas funções e não sabem de onde vem o dado.
 */

export type OrigemCatalogo = "local";

export async function catalogo(): Promise<{
  produtos: Produto[];
  origem: OrigemCatalogo;
}> {
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
  return (await listarProdutos()).filter((p) => p.destaque).slice(0, limite);
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
