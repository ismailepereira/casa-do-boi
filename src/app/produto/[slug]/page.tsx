import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { CompraProduto } from "@/components/produto/CompraProduto";
import { Vitrine } from "@/components/home/Vitrine";
import { categoriaPorSlug } from "@/data/categorias";
import { PRODUTOS, produtoPorSlug, produtosPorCategoria } from "@/data/produtos";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = produtoPorSlug(slug);
  if (!produto) return {};
  return {
    title: produto.nome,
    description: produto.descricao,
    openGraph: { images: [{ url: produto.imagem }] },
  };
}

export default async function PaginaProduto({ params }: Props) {
  const { slug } = await params;
  const produto = produtoPorSlug(slug);
  if (!produto) notFound();

  const categoria = categoriaPorSlug(produto.categoria);
  const relacionados = produtosPorCategoria(produto.categoria)
    .filter((p) => p.slug !== produto.slug)
    .slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav
          aria-label="Você está aqui"
          className="flex flex-wrap items-center gap-1 text-xs text-verde-800/50"
        >
          <Link href="/" className="hover:text-verde-600">
            Início
          </Link>
          <ChevronRight size={13} aria-hidden />
          {categoria && (
            <>
              <Link href={`/categoria/${categoria.slug}`} className="hover:text-verde-600">
                {categoria.nome}
              </Link>
              <ChevronRight size={13} aria-hidden />
            </>
          )}
          <span className="text-verde-800">{produto.nome}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-verde-800/8 bg-white">
            <Image
              src={produto.imagem}
              alt={produto.nome}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain p-10"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-verde-800/8 bg-white p-6">
            <h2 className="text-xl text-verde-900">Descrição</h2>
            <p className="mt-3 text-sm leading-relaxed text-verde-800/75">
              {produto.descricao}
            </p>

            <h2 className="mt-7 text-xl text-verde-900">Especificações</h2>
            <dl className="mt-3 divide-y divide-areia-200 border-t border-areia-200 text-sm">
              {produto.especificacoes.map((e) => (
                <div key={e.rotulo} className="flex justify-between gap-6 py-2.5">
                  <dt className="text-verde-800/60">{e.rotulo}</dt>
                  <dd className="text-right font-medium text-verde-950">{e.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-verde-500">
            {produto.marca}
          </p>
          <h1 className="mt-2 font-corpo text-2xl font-bold normal-case leading-tight tracking-normal text-verde-950 sm:text-3xl">
            {produto.nome}
          </h1>

          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-verde-50 px-3 py-1 text-xs font-semibold text-verde-700">
            <PackageCheck size={14} aria-hidden />
            {produto.emEstoque ? "Disponível em estoque" : "Sob encomenda — consulte prazo"}
          </p>

          <div className="mt-6">
            <CompraProduto produto={produto} />
          </div>

          <ul className="mt-5 space-y-3 text-sm text-verde-800/70">
            <li className="flex gap-2.5">
              <Truck size={17} className="mt-0.5 shrink-0 text-verde-500" aria-hidden />
              Entrega na região ou retirada na loja no mesmo dia.
            </li>
            <li className="flex gap-2.5">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-verde-500"
                aria-hidden
              />
              Produto original, com nota fiscal e garantia do fabricante.
            </li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <Vitrine
          titulo="Quem levou este, levou também"
          produtos={relacionados}
          fundoClaro
        />
      )}
    </>
  );
}
