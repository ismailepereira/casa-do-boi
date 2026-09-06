import "server-only";

import { LOJA } from "@/config/loja";
import { PAGAMENTO } from "@/config/entrega";
import { precoBRL } from "@/lib/formato";
import type { PedidoRecebido } from "@/types";

/**
 * Envio dos e-mails do pedido, via Resend.
 *
 * Sem `RESEND_API_KEY` o pedido é registrado no log do servidor e a rota avisa
 * que o e-mail não saiu — nunca fingimos que a venda foi comunicada.
 *
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */

const API = "https://api.resend.com/emails";
const CHAVE = process.env.RESEND_API_KEY ?? "";
const PARA_LOJA = process.env.PEDIDOS_EMAIL_LOJA ?? "";
const REMETENTE = process.env.PEDIDOS_EMAIL_REMETENTE ?? "";

export function emailConfigurado(): boolean {
  return Boolean(CHAVE && PARA_LOJA && REMETENTE);
}

/** Escapa o que veio do formulário antes de entrar no HTML do e-mail. */
function esc(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tabelaItens(pedido: PedidoRecebido): string {
  const linhas = pedido.itens
    .map(
      (i) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #e5e0d1">
          ${esc(i.nome)}<br><span style="color:#6b7d70;font-size:12px">${i.quantidade} × ${precoBRL(i.precoUnitario)}</span>
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #e5e0d1;text-align:right;white-space:nowrap">
          ${precoBRL(i.precoUnitario * i.quantidade)}
        </td>
      </tr>`,
    )
    .join("");

  return `<table style="width:100%;border-collapse:collapse;font-size:14px">${linhas}</table>`;
}

function corpoBase(titulo: string, interior: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;background:#faf9f5;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
      <div style="background:#004020;padding:20px 24px">
        <p style="margin:0;color:#fff;font-size:18px;font-weight:bold">${esc(LOJA.nome)}</p>
        <p style="margin:4px 0 0;color:#a3eca0;font-size:13px">${esc(titulo)}</p>
      </div>
      <div style="padding:24px;color:#00301a">${interior}</div>
      <div style="padding:16px 24px;background:#f2efe6;color:#6b7d70;font-size:12px">
        ${esc(LOJA.razaoSocial)} — CNPJ ${esc(LOJA.cnpj)}<br>
        ${esc(LOJA.endereco.rua)}, ${esc(LOJA.endereco.bairro)}, ${esc(LOJA.endereco.cidade)}/${esc(LOJA.endereco.uf)}
      </div>
    </div>
  </div>`;
}

function emailParaLoja(pedido: PedidoRecebido): { assunto: string; html: string } {
  const c = pedido.cliente;
  const entrega =
    pedido.entrega.tipo === "correios"
      ? `${esc(pedido.entrega.servico ?? "Correios")} — ${precoBRL(pedido.entrega.valor)}`
      : "Retirada na loja";

  return {
    assunto: `Novo pedido ${pedido.numero} — ${precoBRL(pedido.total)}`,
    html: corpoBase(
      `Pedido ${pedido.numero}`,
      `<p style="margin:0 0 16px;font-size:15px"><strong>Chegou um pedido novo.</strong></p>

      <h3 style="margin:0 0 8px;font-size:14px">Itens</h3>
      ${tabelaItens(pedido)}

      <table style="width:100%;margin-top:12px;font-size:14px">
        <tr><td style="color:#6b7d70">Frete</td><td style="text-align:right">${precoBRL(pedido.entrega.valor)}</td></tr>
        <tr><td style="font-weight:bold;padding-top:6px">Total</td><td style="text-align:right;font-weight:bold;padding-top:6px">${precoBRL(pedido.total)}</td></tr>
      </table>

      <h3 style="margin:24px 0 8px;font-size:14px">Cliente</h3>
      <p style="margin:0;font-size:14px;line-height:1.7">
        ${esc(c.nome)}<br>
        Documento: ${esc(c.documento)}<br>
        Telefone: ${esc(c.telefone)}<br>
        E-mail: ${esc(c.email)}
      </p>

      <h3 style="margin:24px 0 8px;font-size:14px">Entrega</h3>
      <p style="margin:0;font-size:14px;line-height:1.7">
        ${entrega}<br>
        ${esc(c.endereco.logradouro)}, ${esc(c.endereco.numero)}${c.endereco.complemento ? ` — ${esc(c.endereco.complemento)}` : ""}<br>
        ${esc(c.endereco.bairro)} — ${esc(c.endereco.cidade)}/${esc(c.endereco.uf)}<br>
        CEP ${esc(c.endereco.cep)}
      </p>

      ${pedido.observacao ? `<h3 style="margin:24px 0 8px;font-size:14px">Observação do cliente</h3><p style="margin:0;font-size:14px">${esc(pedido.observacao)}</p>` : ""}

      <p style="margin:24px 0 0;padding:12px;background:#f2fbf1;border-radius:8px;font-size:13px;color:#00552a">
        Próximo passo: cobrar o cliente e confirmar o pagamento antes de separar.
      </p>`,
    ),
  };
}

function emailParaCliente(pedido: PedidoRecebido): { assunto: string; html: string } {
  return {
    assunto: `Recebemos seu pedido ${pedido.numero} — ${LOJA.nome}`,
    html: corpoBase(
      `Pedido ${pedido.numero} recebido`,
      `<p style="margin:0 0 16px;font-size:15px">
        Olá, ${esc(pedido.cliente.nome.split(" ")[0])}! Recebemos seu pedido e já estamos conferindo.
      </p>

      ${tabelaItens(pedido)}

      <table style="width:100%;margin-top:12px;font-size:14px">
        <tr><td style="color:#6b7d70">Frete</td><td style="text-align:right">${precoBRL(pedido.entrega.valor)}</td></tr>
        <tr><td style="font-weight:bold;padding-top:6px">Total</td><td style="text-align:right;font-weight:bold;padding-top:6px">${precoBRL(pedido.total)}</td></tr>
      </table>

      <h3 style="margin:24px 0 8px;font-size:14px">Como pagar</h3>
      <p style="margin:0;font-size:14px;line-height:1.7">
        PIX na chave <strong>${esc(PAGAMENTO.chavePix)}</strong> (${esc(PAGAMENTO.tipoChavePix)})<br>
        Favorecido: ${esc(PAGAMENTO.favorecido)}
      </p>
      <p style="margin:12px 0 0;font-size:13px;color:#6b7d70">
        Depois de pagar, responda este e-mail com o comprovante. Seu pedido fica reservado
        por ${PAGAMENTO.horasParaPagar} horas.
      </p>

      <p style="margin:24px 0 0;font-size:13px;color:#6b7d70">
        Dúvidas? Fale com a loja pelo telefone ${esc(LOJA.whatsappExibicao)}.
      </p>`,
    ),
  };
}

async function enviar(para: string, assunto: string, html: string): Promise<void> {
  const resposta = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CHAVE}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: REMETENTE, to: [para], subject: assunto, html }),
  });

  if (!resposta.ok) {
    throw new Error(`Resend respondeu ${resposta.status}: ${(await resposta.text()).slice(0, 200)}`);
  }
}

/**
 * Avisa a loja e confirma para o cliente.
 *
 * O e-mail da loja é o que não pode falhar — é a comunicação da venda. Se o do
 * cliente falhar, o pedido segue válido e a loja entra em contato.
 */
export async function enviarEmailsDoPedido(
  pedido: PedidoRecebido,
): Promise<{ enviado: boolean; motivo?: string }> {
  if (!emailConfigurado()) {
    console.warn(
      `[pedido ${pedido.numero}] e-mail não configurado — pedido registrado apenas no log`,
      JSON.stringify(pedido),
    );
    return { enviado: false, motivo: "E-mail ainda não configurado nesta instalação." };
  }

  const loja = emailParaLoja(pedido);
  await enviar(PARA_LOJA, loja.assunto, loja.html);

  try {
    const cliente = emailParaCliente(pedido);
    await enviar(pedido.cliente.email, cliente.assunto, cliente.html);
  } catch (erro) {
    console.error(`[pedido ${pedido.numero}] confirmação ao cliente falhou:`, erro);
  }

  return { enviado: true };
}
