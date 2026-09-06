"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Copy, Loader2, Lock, ShoppingCart, Truck } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { PAGAMENTO } from "@/config/entrega";
import { LOJA } from "@/config/loja";
import { precoBRL } from "@/lib/formato";
import {
  cepValido,
  documentoValido,
  emailValido,
  mascararCep,
  mascararDocumento,
  mascararTelefone,
  nomeValido,
  telefoneValido,
} from "@/lib/validacao";
import { totalCarrinho, useCarrinho } from "@/stores/carrinho";
import type { OpcaoFrete, ResultadoFrete } from "@/types";

type Confirmacao = {
  numero: string;
  total: number;
  entrega: { tipo: string; servico?: string; valor: number; prazoDias: number };
  avisoEnvio?: string;
};

const CAMPO =
  "h-11 w-full rounded-lg border border-verde-800/20 px-3 text-sm outline-none focus:border-verde-400";
const ROTULO = "text-xs font-semibold text-verde-950";

export default function PaginaCheckout() {
  const { itens, limpar } = useCarrinho();
  const subtotal = totalCarrinho(itens);

  const [form, setForm] = useState({
    nome: "",
    documento: "",
    email: "",
    telefone: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    observacao: "",
    armadilha: "",
  });

  const [cotacao, setCotacao] = useState<ResultadoFrete | null>(null);
  const [freteEscolhido, setFreteEscolhido] = useState<OpcaoFrete | null>(null);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [confirmacao, setConfirmacao] = useState<Confirmacao | null>(null);
  const [copiado, setCopiado] = useState(false);

  function mudar(campo: keyof typeof form, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  // Busca endereço e cotação assim que o CEP fica completo.
  useEffect(() => {
    const cep = form.cep.replace(/\D/g, "");
    if (!cepValido(cep) || itens.length === 0) return;

    let cancelado = false;
    setBuscandoCep(true);

    (async () => {
      try {
        const r = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        if (r.ok && !cancelado) {
          const d = await r.json();
          setForm((f) => ({
            ...f,
            logradouro: d.street || f.logradouro,
            bairro: d.neighborhood || f.bairro,
            cidade: d.city || f.cidade,
            uf: d.state || f.uf,
          }));
        }
      } catch {
        // CEP sem cadastro completo: o cliente preenche na mão.
      }

      try {
        const r = await fetch("/api/frete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cep,
            itens: itens.map((i) => ({ slug: i.produto.slug, quantidade: i.quantidade })),
          }),
        });
        const dados = (await r.json()) as ResultadoFrete;
        if (r.ok && !cancelado) {
          setCotacao(dados);
          const primeira = dados.grupos.find((g) => g.chave === "correios")?.opcoes[0];
          setFreteEscolhido(primeira ?? null);
        }
      } catch {
        if (!cancelado) setCotacao(null);
      } finally {
        if (!cancelado) setBuscandoCep(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [form.cep, itens]);

  const total = subtotal + (freteEscolhido?.precoBRL ?? 0);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    setErro(null);

    if (!nomeValido(form.nome)) return setErro("Informe seu nome completo.");
    if (!documentoValido(form.documento)) return setErro("CPF ou CNPJ inválido.");
    if (!emailValido(form.email)) return setErro("E-mail inválido.");
    if (!telefoneValido(form.telefone)) return setErro("Telefone inválido.");
    if (!cepValido(form.cep)) return setErro("CEP inválido.");
    if (!form.logradouro.trim() || !form.numero.trim() || !form.bairro.trim() || !form.cidade.trim()) {
      return setErro("Preencha o endereço completo.");
    }

    setEnviando(true);
    try {
      const r = await fetch("/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: {
            nome: form.nome,
            documento: form.documento,
            email: form.email,
            telefone: form.telefone,
            endereco: {
              cep: form.cep,
              logradouro: form.logradouro,
              numero: form.numero,
              complemento: form.complemento,
              bairro: form.bairro,
              cidade: form.cidade,
              uf: form.uf,
            },
          },
          itens: itens.map((i) => ({ slug: i.produto.slug, quantidade: i.quantidade })),
          entregaEscolhida: freteEscolhido ? { id: freteEscolhido.id } : undefined,
          observacao: form.observacao,
          armadilha: form.armadilha,
        }),
      });

      const dados = await r.json();
      if (!r.ok) throw new Error(dados.erro ?? "Não foi possível enviar o pedido.");

      setConfirmacao(dados as Confirmacao);
      limpar();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível enviar o pedido.");
    } finally {
      setEnviando(false);
    }
  }

  async function copiarPix() {
    try {
      await navigator.clipboard.writeText(PAGAMENTO.chavePix);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* o cliente copia manualmente */
    }
  }

  // ── Pedido confirmado ──────────────────────────────────────────────
  if (confirmacao) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <span className="grid size-14 place-items-center rounded-2xl bg-verde-50 text-verde-600">
          <CheckCircle2 size={30} aria-hidden />
        </span>
        <h1 className="mt-5 text-4xl text-verde-900 sm:text-5xl">Pedido recebido</h1>
        <p className="mt-2 text-sm text-verde-800/70">
          Guarde o número do seu pedido. A loja já foi avisada e vai confirmar a
          disponibilidade.
        </p>

        <p className="mt-6 rounded-2xl border-2 border-verde-400 bg-white px-6 py-5 text-center">
          <span className="text-xs uppercase tracking-wider text-verde-800/60">
            Número do pedido
          </span>
          <br />
          <span className="font-titulo text-4xl text-verde-800">{confirmacao.numero}</span>
        </p>

        {confirmacao.avisoEnvio && (
          <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-xs text-amber-900">
            <strong>Atenção:</strong> {confirmacao.avisoEnvio} Anote o número acima e
            entre em contato com a loja pelo telefone {LOJA.whatsappExibicao}.
          </p>
        )}

        <div className="mt-6 rounded-2xl border border-verde-800/10 bg-white p-6">
          <h2 className="text-xl text-verde-900">Como pagar</h2>
          <p className="mt-3 text-sm text-verde-800/70">
            PIX de <strong className="text-verde-950">{precoBRL(confirmacao.total)}</strong>{" "}
            para a chave abaixo, em nome de {PAGAMENTO.favorecido}.
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-areia-100 px-4 py-3">
            <code className="flex-1 text-sm font-semibold text-verde-950">
              {PAGAMENTO.chavePix}
            </code>
            <button
              type="button"
              onClick={copiarPix}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-verde-700 hover:bg-white"
            >
              <Copy size={14} aria-hidden />
              {copiado ? "Copiado" : "Copiar"}
            </button>
          </div>
          <p className="mt-3 text-xs text-verde-800/60">
            Depois de pagar, responda o e-mail de confirmação com o comprovante. Seu pedido
            fica reservado por {PAGAMENTO.horasParaPagar} horas.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/">
            <Botao tamanho="lg">Voltar para a loja</Botao>
          </Link>
          <Link href="/rastreio">
            <Botao variante="contorno" tamanho="lg">
              Acompanhar entrega
            </Botao>
          </Link>
        </div>
      </div>
    );
  }

  // ── Carrinho vazio ─────────────────────────────────────────────────
  if (itens.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingCart size={48} className="text-verde-200" aria-hidden />
        <h1 className="text-3xl text-verde-900">Carrinho vazio</h1>
        <p className="text-sm text-verde-800/65">
          Escolha os produtos antes de finalizar o pedido.
        </p>
        <Link href="/">
          <Botao tamanho="lg">Ver produtos</Botao>
        </Link>
      </div>
    );
  }

  const opcoesCorreios = cotacao?.grupos.find((g) => g.chave === "correios")?.opcoes ?? [];
  const grupoRetirada = cotacao?.grupos.find((g) => g.chave === "retirada");

  // ── Formulário ─────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl text-verde-900 sm:text-5xl">Finalizar pedido</h1>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-verde-800/60">
        <Lock size={14} aria-hidden />
        Seus dados são usados só para emitir a nota e entregar o pedido.
      </p>

      <form onSubmit={enviar} className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-2xl border border-verde-800/10 bg-white p-6">
            <h2 className="text-xl text-verde-900">Seus dados</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nome" className={ROTULO}>Nome completo</label>
                <input id="nome" value={form.nome} onChange={(e) => mudar("nome", e.target.value)}
                  autoComplete="name" className={`mt-1 ${CAMPO}`} required />
              </div>
              <div>
                <label htmlFor="documento" className={ROTULO}>CPF ou CNPJ</label>
                <input id="documento" value={form.documento} inputMode="numeric"
                  onChange={(e) => mudar("documento", mascararDocumento(e.target.value))}
                  className={`mt-1 ${CAMPO}`} required />
                <p className="mt-1 text-[0.7rem] text-verde-800/50">Para emitir a nota fiscal.</p>
              </div>
              <div>
                <label htmlFor="telefone" className={ROTULO}>Telefone</label>
                <input id="telefone" value={form.telefone} inputMode="numeric"
                  onChange={(e) => mudar("telefone", mascararTelefone(e.target.value))}
                  autoComplete="tel" className={`mt-1 ${CAMPO}`} required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className={ROTULO}>E-mail</label>
                <input id="email" type="email" value={form.email}
                  onChange={(e) => mudar("email", e.target.value)}
                  autoComplete="email" className={`mt-1 ${CAMPO}`} required />
                <p className="mt-1 text-[0.7rem] text-verde-800/50">
                  A confirmação do pedido chega aqui.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-verde-800/10 bg-white p-6">
            <h2 className="text-xl text-verde-900">Endereço de entrega</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="cep" className={ROTULO}>CEP</label>
                <div className="relative">
                  <input id="cep" value={form.cep} inputMode="numeric"
                    onChange={(e) => mudar("cep", mascararCep(e.target.value))}
                    autoComplete="postal-code" className={`mt-1 ${CAMPO}`} required />
                  {buscandoCep && (
                    <Loader2 size={16} aria-hidden
                      className="absolute right-3 top-4 animate-spin text-verde-500" />
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="logradouro" className={ROTULO}>Rua / Avenida</label>
                <input id="logradouro" value={form.logradouro}
                  onChange={(e) => mudar("logradouro", e.target.value)}
                  autoComplete="address-line1" className={`mt-1 ${CAMPO}`} required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="numero" className={ROTULO}>Número</label>
                <input id="numero" value={form.numero}
                  onChange={(e) => mudar("numero", e.target.value)}
                  className={`mt-1 ${CAMPO}`} required />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="complemento" className={ROTULO}>
                  Complemento ou referência
                </label>
                <input id="complemento" value={form.complemento}
                  onChange={(e) => mudar("complemento", e.target.value)}
                  className={`mt-1 ${CAMPO}`} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bairro" className={ROTULO}>Bairro</label>
                <input id="bairro" value={form.bairro}
                  onChange={(e) => mudar("bairro", e.target.value)}
                  className={`mt-1 ${CAMPO}`} required />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="cidade" className={ROTULO}>Cidade</label>
                <input id="cidade" value={form.cidade}
                  onChange={(e) => mudar("cidade", e.target.value)}
                  className={`mt-1 ${CAMPO}`} required />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="uf" className={ROTULO}>UF</label>
                <input id="uf" value={form.uf} maxLength={2}
                  onChange={(e) => mudar("uf", e.target.value.toUpperCase())}
                  className={`mt-1 ${CAMPO}`} required />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-verde-800/10 bg-white p-6">
            <h2 className="flex items-center gap-2 text-xl text-verde-900">
              <Truck size={19} className="text-verde-500" aria-hidden />
              Forma de entrega
            </h2>

            {!cotacao && (
              <p className="mt-3 text-sm text-verde-800/60">
                Informe o CEP acima para ver as opções de envio.
              </p>
            )}

            {opcoesCorreios.length > 0 && (
              <ul className="mt-4 space-y-2">
                {opcoesCorreios.map((o) => (
                  <li key={o.id}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-verde-800/15 px-4 py-3 has-checked:border-verde-400 has-checked:bg-verde-50">
                      <input type="radio" name="frete" value={o.id}
                        checked={freteEscolhido?.id === o.id}
                        onChange={() => setFreteEscolhido(o)}
                        className="size-4 accent-[#00552a]" />
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-verde-950">
                          {o.transportadora} {o.servico}
                        </span>
                        <span className="block text-xs text-verde-800/60">
                          Chega em até {o.prazoDias} dias úteis
                        </span>
                      </span>
                      <span className="font-titulo text-lg text-verde-800">
                        {precoBRL(o.precoBRL)}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {grupoRetirada && (
              <p className="mt-3 rounded-lg bg-verde-50 px-4 py-3 text-xs leading-relaxed text-verde-800">
                <strong>Retirada na loja:</strong> {grupoRetirada.itens.join(", ")} —{" "}
                {grupoRetirada.aviso}
              </p>
            )}

            {cotacao?.simulado && (
              <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-xs text-amber-900">
                <strong>Valor simulado.</strong> A integração com os Correios ainda não foi
                liberada — este número serve só para testar a tela.
              </p>
            )}

            <div className="mt-5">
              <label htmlFor="observacao" className={ROTULO}>
                Observação para a loja (opcional)
              </label>
              <textarea id="observacao" value={form.observacao} rows={3} maxLength={500}
                onChange={(e) => mudar("observacao", e.target.value)}
                placeholder="Ponto de referência, horário para receber, dúvida sobre o produto…"
                className="mt-1 w-full rounded-lg border border-verde-800/20 px-3 py-2 text-sm outline-none focus:border-verde-400" />
            </div>

            {/* Armadilha para robô: invisível e fora da ordem de tabulação. */}
            <div aria-hidden className="hidden">
              <label htmlFor="armadilha">Não preencha</label>
              <input id="armadilha" tabIndex={-1} autoComplete="off"
                value={form.armadilha} onChange={(e) => mudar("armadilha", e.target.value)} />
            </div>
          </section>
        </div>

        <aside className="rounded-2xl border border-verde-800/10 bg-white p-6 lg:sticky lg:top-44">
          <h2 className="text-xl text-verde-900">Resumo</h2>

          <ul className="mt-4 space-y-2 border-b border-areia-200 pb-4 text-sm">
            {itens.map(({ produto, quantidade }) => (
              <li key={produto.slug} className="flex justify-between gap-3">
                <span className="text-verde-800/70">
                  {quantidade}× {produto.nome}
                </span>
                <span className="shrink-0 font-medium">
                  {precoBRL(produto.preco * quantidade)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-verde-800/65">Subtotal</dt>
              <dd className="font-medium">{precoBRL(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-verde-800/65">Frete</dt>
              <dd className="font-medium">
                {freteEscolhido ? precoBRL(freteEscolhido.precoBRL) : "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between border-t border-areia-200 pt-4">
            <span className="font-semibold text-verde-900">Total</span>
            <span className="font-titulo text-3xl leading-none text-verde-800">
              {precoBRL(total)}
            </span>
          </div>

          {erro && (
            <p role="alert" className="mt-4 rounded-lg bg-oferta-claro px-3 py-2 text-sm text-oferta">
              {erro}
            </p>
          )}

          <Botao type="submit" tamanho="lg" largura="cheia" className="mt-5" disabled={enviando}>
            {enviando && <Loader2 size={17} className="animate-spin" aria-hidden />}
            {enviando ? "Enviando…" : "Enviar pedido"}
          </Botao>

          <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-verde-800/55">
            O pagamento é combinado depois: a loja confirma a disponibilidade e envia a
            cobrança por PIX.
          </p>

          <Link href="/carrinho"
            className="mt-4 block text-center text-xs font-medium text-verde-800/55 hover:text-verde-700">
            Voltar ao carrinho
          </Link>
        </aside>
      </form>
    </div>
  );
}
