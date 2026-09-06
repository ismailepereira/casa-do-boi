"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Check, Copy, ExternalLink, PackageSearch, Truck } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { LOJA } from "@/config/loja";

/**
 * Acompanhamento de entrega.
 *
 * Rastreio automático pelos Correios exige contrato ativo (a API aberta foi
 * descontinuada em 30/09/2023). Enquanto o contrato não estiver ligado, a
 * página valida o código e leva o cliente ao rastreamento oficial — sem
 * inventar status que a gente não tem.
 */

const CORREIOS_RASTREIO = "https://rastreamento.correios.com.br/app/index.php";

/** Formato dos Correios: 2 letras + 9 dígitos + 2 letras (ex.: AA123456789BR). */
function codigoValido(codigo: string): boolean {
  return /^[A-Z]{2}\d{9}[A-Z]{2}$/.test(codigo);
}

export default function PaginaRastreio() {
  const [codigo, setCodigo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  const normalizado = codigo.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 13);

  function consultar(evento: FormEvent) {
    evento.preventDefault();
    if (!codigoValido(normalizado)) {
      setErro("O código tem 13 caracteres, no formato AA123456789BR.");
      setEnviado(false);
      return;
    }
    setErro(null);
    setEnviado(true);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(normalizado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setErro("Não consegui copiar. Selecione o código e copie manualmente.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <span className="grid size-14 place-items-center rounded-2xl bg-verde-50 text-verde-600">
        <PackageSearch size={28} aria-hidden />
      </span>

      <h1 className="mt-5 text-4xl text-verde-900 sm:text-5xl">Acompanhar entrega</h1>
      <p className="mt-2 text-sm leading-relaxed text-verde-800/65">
        Assim que seu pedido é postado, a {LOJA.nome} envia o código de rastreio. Digite
        ele aqui para ver onde a encomenda está.
      </p>

      <form onSubmit={consultar} className="mt-7">
        <label
          htmlFor="codigo"
          className="text-sm font-semibold text-verde-950"
        >
          Código de rastreio
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="codigo"
            value={normalizado}
            onChange={(e) => {
              setCodigo(e.target.value);
              setEnviado(false);
              setErro(null);
            }}
            placeholder="AA123456789BR"
            autoComplete="off"
            spellCheck={false}
            aria-describedby="ajuda-codigo"
            className="h-12 flex-1 rounded-lg border border-verde-800/20 px-4 font-mono text-base tracking-wider outline-none focus:border-verde-400"
          />
          <Botao type="submit" tamanho="lg">
            Consultar
          </Botao>
        </div>
        <p id="ajuda-codigo" className="mt-1.5 text-xs text-verde-800/55">
          São 13 caracteres: duas letras, nove números e mais duas letras.
        </p>
      </form>

      {erro && (
        <p role="alert" className="mt-4 text-sm text-oferta">
          {erro}
        </p>
      )}

      {enviado && (
        <div className="mt-6 rounded-2xl border border-verde-800/10 bg-white p-6" aria-live="polite">
          <p className="flex items-center gap-2 text-sm font-semibold text-verde-950">
            <Truck size={17} className="text-verde-500" aria-hidden />
            Código {normalizado}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-verde-800/70">
            Abra o rastreamento oficial dos Correios e cole o código para ver o histórico
            completo da entrega.
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={copiar}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-verde-800 px-5 text-sm font-semibold text-verde-800 transition-colors hover:bg-verde-800 hover:text-white"
            >
              {copiado ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              {copiado ? "Código copiado" : "Copiar código"}
            </button>
            <a
              href={CORREIOS_RASTREIO}
              target="_blank"
              rel="noopener"
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-verde-400 px-5 text-sm font-bold text-verde-950 transition-colors hover:bg-verde-300"
            >
              Abrir rastreamento dos Correios
              <ExternalLink size={15} aria-hidden />
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-areia-100 p-6">
        <h2 className="text-lg text-verde-900">Não recebeu o código?</h2>
        <p className="mt-2 text-sm leading-relaxed text-verde-800/70">
          O código sai depois que a encomenda é postada, o que costuma levar até um dia
          útil após a confirmação do pagamento. Se passou disso, fale com a loja pelo
          telefone {LOJA.whatsappExibicao}.
        </p>
        <p className="mt-3 text-sm text-verde-800/70">
          Itens retirados na loja não têm código dos Correios — nesses casos a loja avisa
          direto quando o pedido estiver pronto para retirada.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-semibold text-verde-600 hover:text-verde-800"
        >
          Voltar para a loja
        </Link>
      </div>
    </div>
  );
}
