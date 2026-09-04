import Image from "next/image";
import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { LOJA } from "@/config/loja";
import { CATEGORIAS } from "@/data/categorias";

export function Rodape() {
  return (
    <footer className="mt-20 bg-verde-950 text-verde-100">
      <div className="textura-campo">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo.png"
              alt={LOJA.nome}
              width={2172}
              height={724}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-verde-100/70">
              {LOJA.descricao}
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={LOJA.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram da loja"
                className="grid size-10 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-verde-400 hover:text-verde-950"
              >
                <Instagram size={18} />
              </a>
              <a
                href={LOJA.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Facebook da loja"
                className="grid size-10 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-verde-400 hover:text-verde-950"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <nav aria-label="Departamentos no rodapé">
            <h3 className="text-lg text-white">Departamentos</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIAS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="text-verde-100/70 transition-colors hover:text-verde-300"
                  >
                    {c.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-lg text-white">Atendimento</h3>
            <ul className="mt-4 space-y-3 text-sm text-verde-100/70">
              <li className="flex gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-verde-400" aria-hidden />
                <a
                  href={`https://wa.me/${LOJA.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-verde-300"
                >
                  {LOJA.whatsappExibicao}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-verde-400" aria-hidden />
                <a href={`mailto:${LOJA.email}`} className="hover:text-verde-300">
                  {LOJA.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-verde-400" aria-hidden />
                <div className="space-y-1">
                  {LOJA.horario.map((h) => (
                    <p key={h.dias}>
                      <span className="text-verde-100">{h.dias}:</span> {h.horas}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-white">Onde estamos</h3>
            <p className="mt-4 flex gap-2.5 text-sm text-verde-100/70">
              <MapPin size={16} className="mt-0.5 shrink-0 text-verde-400" aria-hidden />
              <span>
                {LOJA.endereco.rua}
                <br />
                {LOJA.endereco.bairro} — {LOJA.endereco.cidade}/{LOJA.endereco.uf}
                <br />
                CEP {LOJA.endereco.cep}
              </span>
            </p>
            <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-verde-300">
                Formas de pagamento
              </p>
              <p className="mt-2 text-sm text-verde-100/70">
                PIX com {Math.round(LOJA.descontoPix * 100)}% de desconto, cartão em até{" "}
                {LOJA.parcelasMax}x sem juros, boleto e pedido no WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-verde-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {LOJA.nome}. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://ismailepereira.github.io/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-verde-300 hover:text-verde-200"
            >
              ismailepereira
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
