"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { LOJA } from "@/config/loja";
import { precoBRL } from "@/lib/formato";
import { totalCarrinho, useCarrinho } from "@/stores/carrinho";

export default function PaginaCarrinho() {
  const { itens, remover, alterarQuantidade, limpar } = useCarrinho();
  const total = totalCarrinho(itens);
  const totalPix = total * (1 - LOJA.descontoPix);
  const frete = total >= LOJA.freteGratisAcima ? 0 : null;

  if (itens.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingCart size={52} className="text-verde-200" aria-hidden />
        <h1 className="text-3xl text-verde-900">Carrinho vazio</h1>
        <p className="text-sm text-verde-800/65">
          Você ainda não escolheu nada. Comece pelos departamentos e monte a lista do mês.
        </p>
        <Link href="/">
          <Botao tamanho="lg">Ver produtos</Botao>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl text-verde-900 sm:text-5xl">Seu pedido</h1>
      <p className="mt-1 text-sm text-verde-800/60">
        Confira os itens e escolha como quer fechar a compra.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
        <ul className="space-y-3">
          {itens.map(({ produto, quantidade }) => (
            <li
              key={produto.slug}
              className="flex gap-4 rounded-2xl border border-verde-800/8 bg-white p-4"
            >
              <Link
                href={`/produto/${produto.slug}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-areia-50 sm:size-28"
              >
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-verde-500">
                  {produto.marca}
                </p>
                <Link
                  href={`/produto/${produto.slug}`}
                  className="text-sm font-semibold leading-snug text-verde-950 hover:text-verde-600 sm:text-base"
                >
                  {produto.nome}
                </Link>
                <p className="mt-0.5 text-xs text-verde-800/55">
                  {precoBRL(produto.preco)} / {produto.unidade}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div className="flex items-center rounded-lg border border-verde-800/15">
                    <button
                      type="button"
                      onClick={() => alterarQuantidade(produto.slug, quantidade - 1)}
                      aria-label={`Diminuir quantidade de ${produto.nome}`}
                      className="grid size-9 place-items-center text-verde-800 hover:bg-verde-50"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold">
                      {quantidade}
                    </span>
                    <button
                      type="button"
                      onClick={() => alterarQuantidade(produto.slug, quantidade + 1)}
                      aria-label={`Aumentar quantidade de ${produto.nome}`}
                      className="grid size-9 place-items-center text-verde-800 hover:bg-verde-50"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-titulo text-2xl text-verde-800">
                      {precoBRL(produto.preco * quantidade)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remover(produto.slug)}
                      aria-label={`Remover ${produto.nome} do carrinho`}
                      className="rounded-md p-1.5 text-verde-800/40 hover:bg-oferta-claro hover:text-oferta"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={limpar}
              className="text-xs font-medium text-verde-800/50 underline underline-offset-2 hover:text-oferta"
            >
              Esvaziar carrinho
            </button>
          </li>
        </ul>

        <aside className="rounded-2xl border border-verde-800/10 bg-white p-6 lg:sticky lg:top-44">
          <h2 className="text-xl text-verde-900">Resumo</h2>

          <dl className="mt-4 space-y-2.5 border-b border-areia-200 pb-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-verde-800/65">Subtotal</dt>
              <dd className="font-medium">{precoBRL(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-verde-800/65">Frete</dt>
              <dd className={frete === 0 ? "font-semibold text-verde-600" : "text-verde-800/65"}>
                {frete === 0 ? "Grátis" : "Calculado no fechamento"}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-semibold text-verde-900">Total</span>
            <span className="font-titulo text-4xl leading-none text-verde-800">
              {precoBRL(total)}
            </span>
          </div>
          <p className="mt-1 text-right text-sm text-verde-700">
            {precoBRL(totalPix)} no PIX
          </p>

          <Link href="/checkout" className="mt-6 block">
            <Botao tamanho="lg" largura="cheia">
              Finalizar pedido
            </Botao>
          </Link>
          <p className="mt-2 text-center text-[0.7rem] leading-relaxed text-verde-800/50">
            Na próxima tela você informa a entrega e confirma o pedido.
          </p>

          <Link
            href="/"
            className="mt-4 block text-center text-xs font-medium text-verde-800/55 hover:text-verde-700"
          >
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}
