import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { DrawerCarrinho } from "@/components/carrinho/DrawerCarrinho";
import { AvisoDemonstracao } from "@/components/layout/AvisoDemonstracao";
import { Cabecalho } from "@/components/layout/Cabecalho";
import { Rodape } from "@/components/layout/Rodape";
import { LOJA } from "@/config/loja";
import "./globals.css";

const fonteTitulo = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--fonte-titulo",
  display: "swap",
});

const fonteCorpo = Inter({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3210"),
  title: {
    default: `${LOJA.nome} — Agropecuária online`,
    template: `%s | ${LOJA.nome}`,
  },
  description: LOJA.descricao,
  openGraph: {
    title: `${LOJA.nome} — ${LOJA.slogan}`,
    description: LOJA.descricao,
    type: "website",
    locale: "pt_BR",
  },
  // Enquanto for demonstração, fora dos buscadores: preço ilustrativo indexado
  // sob a marca do cliente seria confundido com oferta real.
  robots: LOJA.demonstracao ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fonteTitulo.variable} ${fonteCorpo.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-verde-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <AvisoDemonstracao />
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <DrawerCarrinho />
      </body>
    </html>
  );
}
