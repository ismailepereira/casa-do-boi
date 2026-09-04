"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { LOJA } from "@/config/loja";
import { CATEGORIAS } from "@/data/categorias";
import { cn } from "@/lib/cn";
import { quantidadeTotal, useCarrinho } from "@/stores/carrinho";

export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [termo, setTermo] = useState("");
  const router = useRouter();

  const itens = useCarrinho((e) => e.itens);
  const abrirCarrinho = useCarrinho((e) => e.abrir);
  const pecas = quantidadeTotal(itens);

  function buscar(evento: FormEvent) {
    evento.preventDefault();
    const t = termo.trim();
    if (t) router.push(`/busca?q=${encodeURIComponent(t)}`);
  }

  return (
    <header className="sticky top-0 z-40">
      {/* Faixa de avisos */}
      <div className="bg-verde-950 text-verde-100">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-xs">
          <p className="flex items-center gap-1.5">
            <Truck size={14} className="text-verde-400" aria-hidden />
            <span className="hidden sm:inline">Frete grátis acima de </span>
            <strong className="text-white">R$ {LOJA.freteGratisAcima},00</strong>
            <span className="hidden md:inline"> na região</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 md:flex">
              <MapPin size={14} className="text-verde-400" aria-hidden />
              {LOJA.endereco.cidade} — {LOJA.endereco.uf}
            </span>
            <a
              href={`tel:${LOJA.telefone.replace(/\D/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Phone size={14} className="text-verde-400" aria-hidden />
              {LOJA.whatsappExibicao}
            </a>
          </div>
        </div>
      </div>

      {/* Linha principal */}
      <div className="border-b border-verde-800/10 bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4">
          <button
            type="button"
            onClick={() => setMenuAberto(true)}
            className="-ml-1 rounded-md p-2 text-verde-800 lg:hidden"
            aria-label="Abrir menu de categorias"
          >
            <Menu size={24} />
          </button>

          <Link href="/" className="shrink-0" aria-label={`${LOJA.nome} — página inicial`}>
            <Image
              src="/logo.png"
              alt={LOJA.nome}
              width={2172}
              height={724}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          <form
            onSubmit={buscar}
            role="search"
            className="ml-auto hidden max-w-xl flex-1 md:block"
          >
            <div className="flex h-11 items-center rounded-full border-2 border-verde-100 bg-areia-50 pl-4 transition-colors focus-within:border-verde-400">
              <input
                type="search"
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="Buscar motosserra, sal mineral, arame…"
                aria-label="Buscar produtos"
                className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-verde-800/45"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="mr-1 grid size-9 place-items-center rounded-full bg-verde-800 text-white transition-colors hover:bg-verde-700"
              >
                <Search size={17} />
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={abrirCarrinho}
            className="relative ml-auto flex items-center gap-2 rounded-lg px-2 py-2 text-verde-800 transition-colors hover:bg-verde-50 md:ml-0 md:px-3"
            aria-label={`Abrir carrinho com ${pecas} ${pecas === 1 ? "item" : "itens"}`}
          >
            <span className="relative">
              <ShoppingCart size={23} />
              {pecas > 0 && (
                <span className="absolute -right-2 -top-1.5 grid min-w-4.5 place-items-center rounded-full bg-oferta px-1 text-[0.65rem] font-bold text-white">
                  {pecas}
                </span>
              )}
            </span>
            <span className="hidden text-sm font-semibold lg:inline">Carrinho</span>
          </button>
        </div>

        {/* Busca no mobile */}
        <form onSubmit={buscar} role="search" className="px-4 pb-3 md:hidden">
          <div className="flex h-10 items-center rounded-full border-2 border-verde-100 bg-areia-50 pl-4 focus-within:border-verde-400">
            <input
              type="search"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="O que você procura?"
              aria-label="Buscar produtos"
              className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-verde-800/45"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="mr-1 grid size-8 place-items-center rounded-full bg-verde-800 text-white"
            >
              <Search size={15} />
            </button>
          </div>
        </form>
      </div>

      {/* Barra de categorias (desktop) */}
      <nav
        aria-label="Categorias"
        className="hidden bg-verde-800 text-white shadow-sm lg:block"
      >
        <div className="mx-auto flex max-w-7xl items-stretch gap-1 px-4">
          <span className="flex items-center gap-2 border-r border-white/15 py-3 pr-5 text-sm font-bold uppercase tracking-wide">
            <Menu size={16} aria-hidden />
            Departamentos
            <ChevronDown size={14} aria-hidden />
          </span>
          {CATEGORIAS.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-verde-700"
            >
              {c.nome}
            </Link>
          ))}
        </div>
      </nav>

      {/* Menu lateral (mobile) */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          menuAberto ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuAberto}
      >
        <div
          onClick={() => setMenuAberto(false)}
          className={cn(
            "absolute inset-0 bg-verde-950/50 transition-opacity",
            menuAberto ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-white transition-transform duration-300",
            menuAberto ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-verde-100 px-4 py-4">
            <span className="font-titulo text-xl font-bold uppercase text-verde-800">
              Departamentos
            </span>
            <button
              type="button"
              onClick={() => setMenuAberto(false)}
              aria-label="Fechar menu"
              className="rounded-md p-1 text-verde-800"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-2">
            {CATEGORIAS.map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                onClick={() => setMenuAberto(false)}
                className="block border-b border-areia-100 px-4 py-3.5 text-sm font-medium text-verde-900"
              >
                {c.nome}
              </Link>
            ))}
          </nav>
          <a
            href={`https://wa.me/${LOJA.whatsapp}`}
            target="_blank"
            rel="noopener"
            className="m-4 rounded-lg bg-[#1faf53] px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
