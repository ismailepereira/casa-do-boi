"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Store,
} from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { CalculadoraFrete } from "@/components/produto/CalculadoraFrete";
import { LOJA } from "@/config/loja";
import { parcelamento, precoBRL } from "@/lib/formato";
import { linkWhatsApp, mensagemProduto } from "@/lib/whatsapp";
import { useCarrinho } from "@/stores/carrinho";
import type { Produto } from "@/types";

/** Caixa de compra da página de produto, no formato de marketplace. */
export function CompraProduto({ produto }: { produto: Produto }) {
  const [quantidade, setQuantidade] = useState(1);
  const adicionar = useCarrinho((e) => e.adicionar);

  const { parcelas, valorParcela } = parcelamento(produto.preco, LOJA.parcelasMax);
  const precoPix = produto.preco * (1 - LOJA.descontoPix);

  const garantias = [
    {
      icone: ShieldCheck,
      titulo: "Garantia do fabricante",
      texto: "Produto original, com nota fiscal e assistência autorizada.",
    },
    {
      icone: RotateCcw,
      titulo: "Devolução em 7 dias",
      texto: "Direito de arrependimento garantido pelo Código de Defesa do Consumidor.",
    },
    {
      icone: Store,
      titulo: "Retirada na loja",
      texto: `Sem custo, em ${LOJA.endereco.cidade}/${LOJA.endereco.uf}.`,
    },
  ];

  if (produto.somenteOrcamento) {
    return (
      <div className="rounded-2xl border border-verde-800/10 bg-white p-6">
        <p className="font-titulo text-2xl text-verde-800">Venda sob orçamento</p>
        <p className="mt-2 text-sm leading-relaxed text-verde-800/65">
          Este item é volumoso ou exige transporte especial. Fale com a loja para fechar
          preço, frete e prazo de entrega.
        </p>
        <a
          href={linkWhatsApp(mensagemProduto(produto.nome))}
          target="_blank"
          rel="noopener"
          className="mt-5 flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1faf53] font-semibold text-white transition-colors hover:bg-[#189544]"
        >
          <MessageCircle size={18} aria-hidden />
          Pedir orçamento no WhatsApp
        </a>

        <ul className="mt-6 space-y-3 border-t border-areia-200 pt-4">
          {garantias.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="flex gap-2.5">
              <Icone size={17} className="mt-0.5 shrink-0 text-verde-500" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-verde-950">{titulo}</p>
                <p className="text-xs leading-relaxed text-verde-800/60">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-verde-800/10 bg-white p-6">
      {produto.precoDe && (
        <p className="text-sm text-verde-800/45 line-through">{precoBRL(produto.precoDe)}</p>
      )}
      <p className="font-titulo text-5xl leading-none text-verde-800">
        {precoBRL(produto.preco)}
      </p>
      {parcelas > 1 && (
        <p className="mt-2 text-sm text-verde-800/70">
          em até <strong className="font-semibold text-verde-950">{parcelas}x</strong> de{" "}
          {precoBRL(valorParcela)} sem juros
        </p>
      )}
      <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-verde-50 px-3 py-2 text-sm text-verde-700">
        <BadgeCheck size={16} className="shrink-0" aria-hidden />
        <span>
          <strong className="font-semibold">{precoBRL(precoPix)}</strong> à vista no PIX —
          economize {precoBRL(produto.preco - precoPix)}
        </span>
      </p>

      <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-verde-950">
        <PackageCheck size={16} className="text-verde-500" aria-hidden />
        {produto.emEstoque ? "Estoque disponível" : "Sob encomenda — consulte o prazo"}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-12 items-center rounded-lg border border-verde-800/15">
          <button
            type="button"
            onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
            aria-label="Diminuir quantidade"
            className="grid size-11 place-items-center text-verde-800 hover:bg-verde-50"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-semibold" aria-live="polite">
            {quantidade}
          </span>
          <button
            type="button"
            onClick={() => setQuantidade((q) => q + 1)}
            aria-label="Aumentar quantidade"
            className="grid size-11 place-items-center text-verde-800 hover:bg-verde-50"
          >
            <Plus size={16} />
          </button>
        </div>
        <span className="text-xs text-verde-800/55">
          {produto.unidade}
          {quantidade > 1 ? "s" : ""} — total {precoBRL(produto.preco * quantidade)}
        </span>
      </div>

      <Link href="/carrinho" className="mt-4 block">
        <Botao
          tamanho="lg"
          largura="cheia"
          onClick={() => adicionar(produto, quantidade)}
        >
          Comprar agora
        </Botao>
      </Link>

      <button
        type="button"
        onClick={() => adicionar(produto, quantidade)}
        className="mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-lg border-2 border-verde-800 font-semibold text-verde-800 transition-colors hover:bg-verde-800 hover:text-white"
      >
        <ShoppingCart size={18} aria-hidden />
        Adicionar ao carrinho
      </button>

      <div className="mt-5">
        <CalculadoraFrete slug={produto.slug} quantidade={quantidade} />
      </div>

      <ul className="mt-5 space-y-3 border-t border-areia-200 pt-4">
        {garantias.map(({ icone: Icone, titulo, texto }) => (
          <li key={titulo} className="flex gap-2.5">
            <Icone size={17} className="mt-0.5 shrink-0 text-verde-500" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-verde-950">{titulo}</p>
              <p className="text-xs leading-relaxed text-verde-800/60">{texto}</p>
            </div>
          </li>
        ))}
      </ul>

      <a
        href={linkWhatsApp(mensagemProduto(produto.nome))}
        target="_blank"
        rel="noopener"
        className="mt-4 flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold text-[#178a42] transition-colors hover:bg-[#1faf53]/10"
      >
        <MessageCircle size={16} aria-hidden />
        Tirar dúvida no WhatsApp
      </a>
    </div>
  );
}
