import type { MetadataRoute } from "next";
import { CATEGORIAS } from "@/data/categorias";
import { listarProdutos } from "@/services/catalogo";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://casa-do-boi.vercel.app";

/**
 * Mapa do site para os buscadores.
 *
 * Em modo demonstração o `robots.ts` bloqueia tudo, então este arquivo só passa
 * a valer quando a loja entrar no ar de verdade.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const agora = new Date();
  const produtos = await listarProdutos();

  const institucionais = [
    "/entrega",
    "/trocas-e-devolucoes",
    "/politica-de-privacidade",
    "/termos-de-uso",
    "/rastreio",
  ];

  return [
    { url: BASE, lastModified: agora, changeFrequency: "daily", priority: 1 },

    ...CATEGORIAS.map((c) => ({
      url: `${BASE}/categoria/${c.slug}`,
      lastModified: agora,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...produtos.map((p) => ({
      url: `${BASE}/produto/${p.slug}`,
      lastModified: agora,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    ...institucionais.map((caminho) => ({
      url: `${BASE}${caminho}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
