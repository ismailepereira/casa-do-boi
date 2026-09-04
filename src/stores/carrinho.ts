"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ItemCarrinho, Produto } from "@/types";

type EstadoCarrinho = {
  itens: ItemCarrinho[];
  aberto: boolean;

  adicionar: (produto: Produto, quantidade?: number) => void;
  remover: (slug: string) => void;
  alterarQuantidade: (slug: string, quantidade: number) => void;
  limpar: () => void;

  abrir: () => void;
  fechar: () => void;
};

export const useCarrinho = create<EstadoCarrinho>()(
  persist(
    (set) => ({
      itens: [],
      aberto: false,

      adicionar: (produto, quantidade = 1) =>
        set((estado) => {
          const existente = estado.itens.find((i) => i.produto.slug === produto.slug);
          const itens = existente
            ? estado.itens.map((i) =>
                i.produto.slug === produto.slug
                  ? { ...i, quantidade: i.quantidade + quantidade }
                  : i,
              )
            : [...estado.itens, { produto, quantidade }];
          return { itens, aberto: true };
        }),

      remover: (slug) =>
        set((estado) => ({
          itens: estado.itens.filter((i) => i.produto.slug !== slug),
        })),

      alterarQuantidade: (slug, quantidade) =>
        set((estado) => ({
          itens:
            quantidade <= 0
              ? estado.itens.filter((i) => i.produto.slug !== slug)
              : estado.itens.map((i) =>
                  i.produto.slug === slug ? { ...i, quantidade } : i,
                ),
        })),

      limpar: () => set({ itens: [] }),
      abrir: () => set({ aberto: true }),
      fechar: () => set({ aberto: false }),
    }),
    {
      name: "casa-do-boi-carrinho",
      version: 2, // v2 descarta o estado antigo que persistia `aberto`
      // Só os itens sobrevivem ao refresh — `aberto` é estado de sessão, senão o
      // painel reabriria sozinho a cada carregamento de página.
      partialize: (estado) => ({ itens: estado.itens }),
    },
  ),
);

/** Total em reais dos itens do carrinho. */
export function totalCarrinho(itens: ItemCarrinho[]): number {
  return itens.reduce((soma, i) => soma + i.produto.preco * i.quantidade, 0);
}

/** Quantidade total de peças (soma das quantidades, não de linhas). */
export function quantidadeTotal(itens: ItemCarrinho[]): number {
  return itens.reduce((soma, i) => soma + i.quantidade, 0);
}
