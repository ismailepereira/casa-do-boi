import type { MetadataRoute } from "next";
import { LOJA } from "@/config/loja";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://casa-do-boi.vercel.app";

/**
 * Enquanto for demonstração, nada é indexado — preço ilustrativo sob a marca do
 * cliente não pode aparecer em busca. Ao desligar `NEXT_PUBLIC_DEMO`, o site
 * libera a indexação e aponta o sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  if (LOJA.demonstracao) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nada aqui interessa a buscador e pode expor dado de pedido.
        disallow: ["/api/", "/checkout", "/carrinho"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
