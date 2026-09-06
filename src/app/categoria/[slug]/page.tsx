import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { DadosDaTrilha } from "@/components/DadosEstruturados";
import { CardProduto } from "@/components/produto/CardProduto";
import { CATEGORIAS, categoriaPorSlug } from "@/data/categorias";
import { produtosPorCategoria } from "@/services/catalogo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoria = categoriaPorSlug(slug);
  if (!categoria) return {};
  return {
    title: categoria.nome,
    description: categoria.descricao,
    alternates: { canonical: `/categoria/${categoria.slug}` },
  };
}

export default async function PaginaCategoria({ params }: Props) {
  const { slug } = await params;
  const categoria = categoriaPorSlug(slug);
  if (!categoria) notFound();

  const produtos = await produtosPorCategoria(slug);

  return (
    <>
      <DadosDaTrilha
        itens={[
          { nome: "Início", caminho: "/" },
          { nome: categoria.nome, caminho: `/categoria/${categoria.slug}` },
        ]}
      />

      <div className="border-b border-verde-800/8 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <nav aria-label="Você está aqui" className="flex items-center gap-1 text-xs text-verde-800/50">
            <Link href="/" className="hover:text-verde-600">
              Início
            </Link>
            <ChevronRight size={13} aria-hidden />
            <span className="text-verde-800">{categoria.nome}</span>
          </nav>

          <h1 className="mt-3 text-4xl text-verde-900 sm:text-5xl">{categoria.nome}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-verde-800/65">
            {categoria.descricao}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-verde-500">
            {produtos.length} {produtos.length === 1 ? "produto" : "produtos"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl gap-8 px-4 py-10 lg:grid lg:grid-cols-[15rem_1fr]">
        <aside className="mb-8 lg:mb-0">
          <h2 className="text-lg text-verde-900">Departamentos</h2>
          <ul className="mt-3 space-y-1">
            {CATEGORIAS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categoria/${c.slug}`}
                  aria-current={c.slug === slug ? "page" : undefined}
                  className={
                    c.slug === slug
                      ? "block rounded-lg bg-verde-800 px-3 py-2.5 text-sm font-semibold text-white"
                      : "block rounded-lg px-3 py-2.5 text-sm text-verde-800/70 transition-colors hover:bg-verde-50 hover:text-verde-800"
                  }
                >
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {produtos.map((produto) => (
            <CardProduto key={produto.slug} produto={produto} />
          ))}
        </div>
      </div>
    </>
  );
}
