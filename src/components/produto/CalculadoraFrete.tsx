"use client";

import { useState, type FormEvent } from "react";
import { Loader2, MapPin, Truck } from "lucide-react";
import { LOJA } from "@/config/loja";
import { precoBRL } from "@/lib/formato";
import type { ResultadoFrete } from "@/types";

function formatarCep(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

export function CalculadoraFrete({
  slug,
  quantidade = 1,
}: {
  slug: string;
  quantidade?: number;
}) {
  const [cep, setCep] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoFrete | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function calcular(evento: FormEvent) {
    evento.preventDefault();
    setErro(null);
    setResultado(null);

    if (cep.replace(/\D/g, "").length !== 8) {
      setErro("Digite um CEP com 8 dígitos.");
      return;
    }

    setCarregando(true);
    try {
      const r = await fetch("/api/frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep, itens: [{ slug, quantidade }] }),
      });
      const dados = await r.json();
      if (!r.ok) throw new Error(dados.erro ?? "Falha na cotação.");
      setResultado(dados as ResultadoFrete);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível calcular agora.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="border-t border-areia-200 pt-4">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-verde-950">
        <Truck size={16} className="text-verde-500" aria-hidden />
        Calcular frete e prazo
      </p>

      <form onSubmit={calcular} className="mt-2.5 flex gap-2">
        <label htmlFor={`cep-${slug}`} className="sr-only">
          Seu CEP
        </label>
        <input
          id={`cep-${slug}`}
          value={cep}
          onChange={(e) => setCep(formatarCep(e.target.value))}
          inputMode="numeric"
          placeholder="00000-000"
          className="h-11 w-36 rounded-lg border border-verde-800/20 px-3 text-sm outline-none focus:border-verde-400"
        />
        <button
          type="submit"
          disabled={carregando}
          className="flex h-11 items-center gap-2 rounded-lg bg-verde-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-verde-700 disabled:opacity-60"
        >
          {carregando && <Loader2 size={15} className="animate-spin" aria-hidden />}
          Calcular
        </button>
      </form>

      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        rel="noopener"
        className="mt-1.5 inline-block text-xs text-verde-600 underline underline-offset-2"
      >
        Não sei meu CEP
      </a>

      {erro && (
        <p role="alert" className="mt-3 text-sm text-oferta">
          {erro}
        </p>
      )}

      {resultado && (
        <div className="mt-3" aria-live="polite">
          {resultado.opcoes.length > 0 && (
            <ul className="divide-y divide-areia-200 rounded-lg border border-areia-200">
              {resultado.opcoes.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
                  <div>
                    <p className="text-sm font-semibold text-verde-950">
                      {o.transportadora} {o.servico}
                    </p>
                    <p className="text-xs text-verde-800/60">
                      Chega em até {o.prazoDias} dias úteis
                    </p>
                  </div>
                  <span className="font-titulo text-xl text-verde-800">
                    {precoBRL(o.precoBRL)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {resultado.simulado && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
              <strong>Valor simulado.</strong> A integração com a transportadora ainda não
              está ligada — este número serve só para testar a tela.
            </p>
          )}

          {resultado.foraDoCorreios.length > 0 && (
            <div className="mt-2 rounded-lg bg-verde-50 px-3 py-2.5 text-xs text-verde-800">
              <p className="font-semibold">Este item não vai pelos Correios</p>
              {resultado.foraDoCorreios.map((f) => (
                <p key={f.nome} className="mt-1 text-verde-800/75">
                  {f.motivo} — combine a entrega pelo WhatsApp.
                </p>
              ))}
            </div>
          )}

          <p className="mt-2 flex items-start gap-1.5 text-xs text-verde-800/55">
            <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden />
            Enviado de {LOJA.endereco.cidade}/{LOJA.endereco.uf}. Retirada na loja sem custo.
          </p>
        </div>
      )}
    </div>
  );
}
