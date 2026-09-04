import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { LOJA } from "@/config/loja";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-verde-900 text-white">
      <div className="textura-campo absolute inset-0" aria-hidden />
      <div
        className="absolute -right-40 -top-40 size-[36rem] rounded-full bg-verde-700/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-verde-400/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-verde-300">
            <ShieldCheck size={14} aria-hidden />
            Revenda autorizada STIHL
          </p>

          <h1 className="mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Tudo para o seu campo,
            <br />
            <span className="text-verde-400">do curral à roça</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-verde-100/80">
            Máquina, suplemento, remédio, cerca e vestuário na mesma compra. Você fecha
            aqui e retira na loja ou recebe na porteira.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/categoria/maquinas-e-ferramentas"
              className="inline-flex h-13 items-center gap-2 rounded-lg bg-verde-400 px-7 font-bold text-verde-950 transition-colors hover:bg-verde-300"
            >
              Ver linha STIHL
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              href="/categoria/suplemento-e-racao"
              className="inline-flex h-13 items-center rounded-lg border-2 border-white/25 px-7 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              Suplemento e ração
            </Link>
          </div>

          <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-white/12 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wide text-verde-100/55">
                Frete grátis
              </dt>
              <dd className="font-titulo text-2xl text-verde-300">
                R$ {LOJA.freteGratisAcima}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-verde-100/55">
                PIX com desconto
              </dt>
              <dd className="font-titulo text-2xl text-verde-300">
                {Math.round(LOJA.descontoPix * 100)}%
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-verde-100/55">
                Cartão em até
              </dt>
              <dd className="font-titulo text-2xl text-verde-300">{LOJA.parcelasMax}x</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="overflow-hidden rounded-[1.75rem] bg-white p-8 shadow-2xl ring-1 ring-white/20">
            <Image
              src="/produtos/motosserra-ms-172.png"
              alt="Motosserra STIHL MS 172 Light"
              width={640}
              height={640}
              priority
              className="mx-auto w-full"
            />
          </div>

          <div className="absolute -bottom-5 -left-4 rounded-2xl bg-verde-950 p-4 shadow-2xl ring-1 ring-white/10 sm:-left-8">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-oferta">
              Oferta da semana
            </p>
            <p className="mt-1 text-sm font-semibold leading-tight text-white">
              Motosserra MS 172 Light
            </p>
            <p className="font-titulo text-3xl leading-none text-verde-400">R$ 2.199,00</p>
            <p className="text-xs text-verde-100/60">à vista no PIX</p>
          </div>
        </div>
      </div>
    </section>
  );
}
