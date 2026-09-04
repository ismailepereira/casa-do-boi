"use client";

import { useState } from "react";
import { Minus, MessageCircle, Plus, ShoppingCart } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { LOJA } from "@/config/loja";
import { parcelamento, precoBRL } from "@/lib/formato";
import { linkWhatsApp, mensagemProduto } from "@/lib/whatsapp";
import { useCarrinho } from "@/stores/carrinho";
import type { Produto } from "@/types";

export function CompraProduto({ produto }: { produto: Produto }) {
  const [quantidade, setQuantidade] = useState(1);
  const adicionar = useCarrinho((e) => e.adicionar);

  const { parcelas, valorParcela } = parcelamento(produto.preco, LOJA.parcelasMax);
  const precoPix = produto.preco * (1 - LOJA.descontoPix);

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
      <p className="mt-2 text-sm text-verde-700">
        <strong className="font-semibold">{precoBRL(precoPix)}</strong> à vista no PIX (
        {Math.round(LOJA.descontoPix * 100)}% de desconto)
      </p>
      {parcelas > 1 && (
        <p className="text-sm text-verde-800/60">
          ou {parcelas}x de {precoBRL(valorParcela)} sem juros no cartão
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
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
        <span className="text-xs text-verde-800/55">por {produto.unidade}</span>
      </div>

      <Botao
        tamanho="lg"
        largura="cheia"
        className="mt-4"
        onClick={() => adicionar(produto, quantidade)}
      >
        <ShoppingCart size={18} aria-hidden />
        Adicionar ao carrinho
      </Botao>

      <a
        href={linkWhatsApp(mensagemProduto(produto.nome))}
        target="_blank"
        rel="noopener"
        className="mt-3 flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-[#1faf53] font-semibold text-[#178a42] transition-colors hover:bg-[#1faf53] hover:text-white"
      >
        <MessageCircle size={18} aria-hidden />
        Tirar dúvida no WhatsApp
      </a>

      <p className="mt-4 text-center text-xs text-verde-800/50">
        Frete grátis acima de R$ {LOJA.freteGratisAcima} em {LOJA.endereco.cidade} e região
      </p>
    </div>
  );
}
