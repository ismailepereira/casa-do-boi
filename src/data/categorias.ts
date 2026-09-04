import type { Categoria } from "@/types";

export const CATEGORIAS: Categoria[] = [
  {
    slug: "maquinas-e-ferramentas",
    nome: "Máquinas e Ferramentas",
    descricao:
      "Motosserra, roçadeira, soprador, lavadora de alta pressão e a linha completa de óleos e acessórios STIHL.",
    icone: "Wrench",
    destaque: true,
  },
  {
    slug: "suplemento-e-racao",
    nome: "Suplemento e Ração",
    descricao:
      "Sal mineral, fosfato, núcleo proteico, ração bovina e sal branco — nutrição para o rebanho o ano inteiro.",
    icone: "Wheat",
    destaque: true,
  },
  {
    slug: "veterinario",
    nome: "Veterinário",
    descricao:
      "Vermífugo, carrapaticida, vacina, antibiótico, vitamina injetável, seringa e material de manejo sanitário.",
    icone: "Syringe",
    destaque: true,
  },
  {
    slug: "cerca-e-insumos",
    nome: "Cerca e Insumos",
    descricao:
      "Arame liso e farpado, cerca elétrica, isolador, mourão, adubo e semente de pastagem.",
    icone: "Fence",
    destaque: true,
  },
  {
    slug: "vestuario-e-selaria",
    nome: "Vestuário e Selaria",
    descricao:
      "Bota, chapéu, camisa de campo, sela, cabresto, corda e todo o arreio do dia a dia.",
    icone: "Shirt",
    destaque: true,
  },
];

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}
