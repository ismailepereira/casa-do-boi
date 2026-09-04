import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardProduto } from "@/components/produto/CardProduto";
import type { Produto } from "@/types";

type Props = {
  titulo: string;
  subtitulo?: string;
  produtos: Produto[];
  verMais?: { texto: string; href: string };
  fundoClaro?: boolean;
};

export function Vitrine({ titulo, subtitulo, produtos, verMais, fundoClaro }: Props) {
  if (produtos.length === 0) return null;

  return (
    <section className={fundoClaro ? "bg-areia-100 py-14" : "py-14"}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl text-verde-900 sm:text-4xl">{titulo}</h2>
            {subtitulo && <p className="mt-1 text-sm text-verde-800/60">{subtitulo}</p>}
          </div>
          {verMais && (
            <Link
              href={verMais.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-verde-600 hover:text-verde-800"
            >
              {verMais.texto}
              <ArrowRight size={16} aria-hidden />
            </Link>
          )}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {produtos.map((produto) => (
            <CardProduto key={produto.slug} produto={produto} />
          ))}
        </div>
      </div>
    </section>
  );
}
