"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { LOJA } from "@/config/loja";
import { descontoPercentual, parcelamento, precoBRL } from "@/lib/formato";
import { linkWhatsApp, mensagemProduto } from "@/lib/whatsapp";
import { useCarrinho } from "@/stores/carrinho";
import type { Produto } from "@/types";

export function CardProduto({ produto }: { produto: Produto }) {
  const adicionar = useCarrinho((e) => e.adicionar);
  const { parcelas, valorParcela } = parcelamento(produto.preco, LOJA.parcelasMax);
  const precoPix = produto.preco * (1 - LOJA.descontoPix);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-verde-800/8 bg-white shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
      <Link
        href={`/produto/${produto.slug}`}
        className="relative block aspect-square overflow-hidden bg-areia-50"
      >
        <Image
          src={produto.imagem}
          alt={produto.nome}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
        />
        {produto.precoDe && (
          <span className="absolute left-3 top-3 rounded-md bg-oferta px-2 py-1 text-xs font-bold text-white">
            -{descontoPercentual(produto.precoDe, produto.preco)}%
          </span>
        )}
        {!produto.emEstoque && (
          <span className="absolute inset-x-0 bottom-0 bg-verde-950/80 py-1.5 text-center text-xs font-semibold uppercase tracking-wide text-white">
            Sob encomenda
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.68rem] font-bold uppercase tracking-wider text-verde-500">
          {produto.marca}
        </p>
        <h3 className="mt-1 line-clamp-2 font-corpo text-sm font-semibold normal-case leading-snug tracking-normal text-verde-950">
          <Link href={`/produto/${produto.slug}`} className="hover:text-verde-600">
            {produto.nome}
          </Link>
        </h3>

        <div className="mt-3 flex-1">
          {produto.somenteOrcamento ? (
            <p className="text-sm font-semibold text-verde-700">
              Consulte condições e frete
            </p>
          ) : (
            <>
              {produto.precoDe && (
                <p className="text-xs text-verde-800/45 line-through">
                  {precoBRL(produto.precoDe)}
                </p>
              )}
              <p className="font-titulo text-2xl leading-none text-verde-800">
                {precoBRL(produto.preco)}
                <span className="ml-1 font-corpo text-xs font-medium normal-case text-verde-800/60">
                  / {produto.unidade}
                </span>
              </p>
              <p className="mt-1 text-xs text-verde-700">
                <strong className="font-semibold">{precoBRL(precoPix)}</strong> no PIX
              </p>
              {parcelas > 1 && (
                <p className="text-xs text-verde-800/55">
                  ou {parcelas}x de {precoBRL(valorParcela)} sem juros
                </p>
              )}
            </>
          )}
        </div>

        {produto.somenteOrcamento ? (
          <a
            href={linkWhatsApp(mensagemProduto(produto.nome))}
            target="_blank"
            rel="noopener"
            className="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1faf53] text-sm font-semibold text-white transition-colors hover:bg-[#189544]"
          >
            <MessageCircle size={16} aria-hidden />
            Pedir orçamento
          </a>
        ) : (
          <button
            type="button"
            onClick={() => adicionar(produto)}
            className="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg bg-verde-400 text-sm font-bold text-verde-950 transition-colors hover:bg-verde-300"
          >
            <ShoppingCart size={16} aria-hidden />
            Adicionar
          </button>
        )}
      </div>
    </article>
  );
}
