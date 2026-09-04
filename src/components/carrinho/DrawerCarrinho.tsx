"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { LOJA } from "@/config/loja";
import { cn } from "@/lib/cn";
import { precoBRL } from "@/lib/formato";
import { linkWhatsApp, mensagemPedido } from "@/lib/whatsapp";
import { totalCarrinho, useCarrinho } from "@/stores/carrinho";

export function DrawerCarrinho() {
  const { itens, aberto, fechar, remover, alterarQuantidade } = useCarrinho();
  const total = totalCarrinho(itens);
  const falta = LOJA.freteGratisAcima - total;

  // Trava a rolagem do fundo enquanto o painel está aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <div
      className={cn("fixed inset-0 z-50", aberto ? "" : "pointer-events-none")}
      aria-hidden={!aberto}
    >
      <div
        onClick={fechar}
        className={cn(
          "absolute inset-0 bg-verde-950/50 transition-opacity duration-200",
          aberto ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        aria-label="Carrinho de compras"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-areia-50 shadow-2xl transition-transform duration-300",
          aberto ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-verde-800/10 bg-white px-5 py-4">
          <h2 className="flex items-center gap-2 text-xl text-verde-900">
            <ShoppingCart size={20} aria-hidden />
            Seu carrinho
          </h2>
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar carrinho"
            className="rounded-md p-1 text-verde-800 hover:bg-verde-50"
          >
            <X size={22} />
          </button>
        </header>

        {itens.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <ShoppingCart size={44} className="text-verde-200" aria-hidden />
            <p className="text-sm text-verde-800/70">
              Seu carrinho está vazio. Escolha um departamento e comece pela lista do mês.
            </p>
            <Botao variante="contorno" tamanho="sm" onClick={fechar}>
              Continuar comprando
            </Botao>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {falta > 0 && (
                <p className="mb-4 rounded-lg bg-verde-100 px-3 py-2.5 text-xs text-verde-800">
                  Faltam <strong>{precoBRL(falta)}</strong> para o frete grátis na região.
                </p>
              )}

              <ul className="space-y-3">
                {itens.map(({ produto, quantidade }) => (
                  <li
                    key={produto.slug}
                    className="flex gap-3 rounded-xl border border-verde-800/8 bg-white p-3"
                  >
                    <Link
                      href={`/produto/${produto.slug}`}
                      onClick={fechar}
                      className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-areia-50"
                    >
                      <Image
                        src={produto.imagem}
                        alt={produto.nome}
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="line-clamp-2 text-sm font-semibold leading-snug text-verde-950">
                        {produto.nome}
                      </p>
                      <p className="mt-0.5 text-xs text-verde-800/55">
                        {precoBRL(produto.preco)} / {produto.unidade}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border border-verde-800/15">
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(produto.slug, quantidade - 1)}
                            aria-label={`Diminuir quantidade de ${produto.nome}`}
                            className="grid size-8 place-items-center text-verde-800 hover:bg-verde-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {quantidade}
                          </span>
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(produto.slug, quantidade + 1)}
                            aria-label={`Aumentar quantidade de ${produto.nome}`}
                            className="grid size-8 place-items-center text-verde-800 hover:bg-verde-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-titulo text-lg text-verde-800">
                            {precoBRL(produto.preco * quantidade)}
                          </span>
                          <button
                            type="button"
                            onClick={() => remover(produto.slug)}
                            aria-label={`Remover ${produto.nome} do carrinho`}
                            className="rounded-md p-1 text-verde-800/40 hover:bg-oferta-claro hover:text-oferta"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-verde-800/10 bg-white px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-verde-800/70">Total</span>
                <span className="font-titulo text-3xl text-verde-800">
                  {precoBRL(total)}
                </span>
              </div>
              <p className="mt-1 text-right text-xs text-verde-700">
                {precoBRL(total * (1 - LOJA.descontoPix))} no PIX
              </p>

              <Link href="/carrinho" onClick={fechar} className="mt-4 block">
                <Botao largura="cheia" tamanho="lg">
                  Finalizar pedido
                </Botao>
              </Link>
              <a
                href={linkWhatsApp(mensagemPedido(itens, total))}
                target="_blank"
                rel="noopener"
                className="mt-2 flex h-11 w-full items-center justify-center rounded-lg border-2 border-[#1faf53] text-sm font-semibold text-[#178a42] transition-colors hover:bg-[#1faf53] hover:text-white"
              >
                Fechar pelo WhatsApp
              </a>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
