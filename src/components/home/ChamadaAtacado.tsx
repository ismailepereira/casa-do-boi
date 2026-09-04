import { MessageCircle, Tractor } from "lucide-react";
import { linkWhatsApp } from "@/lib/whatsapp";
import { LOJA } from "@/config/loja";

const MENSAGEM = `Olá! Sou produtor e quero cotar uma lista de compra na ${LOJA.nome}.`;

export function ChamadaAtacado() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="relative overflow-hidden rounded-3xl bg-verde-800 px-6 py-10 text-white sm:px-12 sm:py-14">
        <div className="textura-campo absolute inset-0" aria-hidden />
        <div
          className="absolute -bottom-24 -right-16 size-80 rounded-full bg-verde-400/15 blur-2xl"
          aria-hidden
        />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-verde-300">
              <Tractor size={14} aria-hidden />
              Fazenda e revenda
            </p>
            <h2 className="mt-4 text-4xl leading-[0.95] sm:text-5xl">
              Comprou em quantidade?
              <br />
              <span className="text-verde-400">O preço é outro.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-verde-100/80">
              Sal mineral por pallet, arame por lote, vacina para o rebanho inteiro. Manda
              a lista no WhatsApp que a gente monta o orçamento com frete fechado e prazo
              de pagamento.
            </p>
          </div>

          <a
            href={linkWhatsApp(MENSAGEM)}
            target="_blank"
            rel="noopener"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-verde-400 px-8 text-base font-bold text-verde-950 transition-colors hover:bg-verde-300 lg:justify-self-end"
          >
            <MessageCircle size={20} aria-hidden />
            Enviar minha lista
          </a>
        </div>
      </div>
    </section>
  );
}
