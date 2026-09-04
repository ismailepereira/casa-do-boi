import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { CardProduto } from "@/components/produto/CardProduto";
import { CATEGORIAS } from "@/data/categorias";
import { buscarProdutos } from "@/services/catalogo";

export const metadata: Metadata = { title: "Busca" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function PaginaBusca({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const resultados = await buscarProdutos(q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl text-verde-900 sm:text-4xl">
        {q ? (
          <>
            Resultados para{" "}
            <span className="font-corpo normal-case text-verde-600">“{q}”</span>
          </>
        ) : (
          "Busca"
        )}
      </h1>
      <p className="mt-1 text-sm text-verde-800/60">
        {resultados.length} {resultados.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      {resultados.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {resultados.map((produto) => (
            <CardProduto key={produto.slug} produto={produto} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <SearchX size={48} className="text-verde-200" aria-hidden />
          <p className="max-w-sm text-sm text-verde-800/65">
            Não achamos nada com esse termo. Tente outra palavra ou escolha um
            departamento abaixo.
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {CATEGORIAS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categoria/${c.slug}`}
                  className="rounded-full border border-verde-800/15 px-4 py-2 text-xs font-medium text-verde-800 transition-colors hover:border-verde-400 hover:bg-verde-50"
                >
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
