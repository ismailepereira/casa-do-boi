import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Truck } from "lucide-react";
import { DadosDaTrilha, DadosDoProduto } from "@/components/DadosEstruturados";
import { Vitrine } from "@/components/home/Vitrine";
import { CompraProduto } from "@/components/produto/CompraProduto";
import { GaleriaProduto } from "@/components/produto/GaleriaProduto";
import { LOJA } from "@/config/loja";
import { categoriaPorSlug } from "@/data/categorias";
import { PRODUTOS } from "@/data/produtos";
import { produtoPorSlug, produtosPorCategoria } from "@/services/catalogo";
import { pesoTaxavel } from "@/lib/frete";
import { numeroBR } from "@/lib/formato";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = await produtoPorSlug(slug);
  if (!produto) return {};
  return {
    title: produto.nome,
    description: produto.descricao,
    alternates: { canonical: `/produto/${produto.slug}` },
    openGraph: { images: [{ url: produto.imagem }] },
  };
}

const ENTREGA = {
  correios: "Enviamos pelos Correios para todo o Brasil",
  retirada: "Não enviamos pelos Correios — retirada na loja",
} as const;

export default async function PaginaProduto({ params }: Props) {
  const { slug } = await params;
  const produto = await produtoPorSlug(slug);
  if (!produto) notFound();

  const categoria = categoriaPorSlug(produto.categoria);
  const relacionados = (await produtosPorCategoria(produto.categoria))
    .filter((p) => p.slug !== produto.slug)
    .slice(0, 4);

  const imagens = [produto.imagem, ...(produto.imagens ?? [])];
  const log = produto.logistica;

  /** Ficha técnica: o que o produto declara + o que a logística já sabe. */
  const ficha = [
    { rotulo: "Marca", valor: produto.marca },
    { rotulo: "Departamento", valor: categoria?.nome ?? "—" },
    ...produto.especificacoes,
    { rotulo: "Unidade de venda", valor: produto.unidade },
    { rotulo: "Peso do produto embalado", valor: `${numeroBR(log.pesoKg)} kg` },
    {
      rotulo: "Dimensões da embalagem",
      valor: `${numeroBR(log.comprimentoCm, 0)} × ${numeroBR(log.larguraCm, 0)} × ${numeroBR(log.alturaCm, 0)} cm`,
    },
    { rotulo: "Peso considerado no frete", valor: `${numeroBR(pesoTaxavel(log))} kg` },
    { rotulo: "Código do produto", valor: produto.slug },
  ];

  return (
    <>
      <DadosDoProduto produto={produto} />
      <DadosDaTrilha
        itens={[
          { nome: "Início", caminho: "/" },
          ...(categoria
            ? [{ nome: categoria.nome, caminho: `/categoria/${categoria.slug}` }]
            : []),
          { nome: produto.nome, caminho: `/produto/${produto.slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-5">
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

      {/* Bloco principal: galeria + caixa de compra */}
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_23rem] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-verde-500">
              {produto.marca}
            </p>
            <h1 className="mt-1.5 font-corpo text-2xl font-bold normal-case leading-tight tracking-normal text-verde-950 sm:text-3xl">
              {produto.nome}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-verde-800/55">
              <span className="rounded-full bg-verde-50 px-2.5 py-1 font-semibold text-verde-700">
                Novo
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={13} aria-hidden />
                {ENTREGA[log.modalidade]}
              </span>
            </p>

            <div className="mt-5">
              <GaleriaProduto imagens={imagens} nome={produto.nome} />
            </div>
          </div>

          <div className="lg:sticky lg:top-44">
            <CompraProduto produto={produto} />
          </div>
        </div>
      </div>

      {/* Ficha técnica e descrição */}
      <div className="mx-auto max-w-7xl px-4 pb-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_23rem] lg:items-start">
          <div className="space-y-6">
            <section className="rounded-2xl border border-verde-800/8 bg-white p-6">
              <h2 className="text-xl text-verde-900">Características do produto</h2>
              <dl className="mt-4 overflow-hidden rounded-lg border border-areia-200">
                {ficha.map((linha, i) => (
                  <div
                    key={linha.rotulo}
                    className={
                      i % 2 === 0
                        ? "grid grid-cols-[minmax(9rem,14rem)_1fr] gap-4 bg-areia-50 px-4 py-2.5"
                        : "grid grid-cols-[minmax(9rem,14rem)_1fr] gap-4 px-4 py-2.5"
                    }
                  >
                    <dt className="text-sm text-verde-800/60">{linha.rotulo}</dt>
                    <dd className="text-sm font-medium text-verde-950">{linha.valor}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-2xl border border-verde-800/8 bg-white p-6">
              <h2 className="text-xl text-verde-900">Descrição</h2>
              <p className="mt-3 text-sm leading-relaxed text-verde-800/75">
                {produto.descricao}
              </p>

              {log.observacao && (
                <p className="mt-4 rounded-lg bg-areia-100 px-4 py-3 text-sm text-verde-800/80">
                  <strong className="font-semibold text-verde-950">Sobre a entrega:</strong>{" "}
                  {log.observacao}
                </p>
              )}

              <h3 className="mt-6 text-base text-verde-900">Como você recebe</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-verde-800/75">
                <li>
                  • Retirada na loja em {LOJA.endereco.cidade}/{LOJA.endereco.uf}, sem custo.
                </li>
                {log.modalidade === "correios" && (
                  <li>• Envio pelos Correios para todo o Brasil, com código de rastreio.</li>
                )}
                {log.modalidade === "retirada" && (
                  <li>
                    • Pelo peso ou tamanho, este item não é aceito pelos Correios: a venda é
                    para retirada na loja.
                  </li>
                )}
                <li>
                  • Frete grátis acima de R$ {LOJA.freteGratisAcima} em{" "}
                  {LOJA.endereco.cidade} e região.
                </li>
              </ul>
            </section>
          </div>
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
