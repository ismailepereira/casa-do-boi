import { LOJA } from "@/config/loja";
import { precoBRL } from "@/lib/formato";
import type { ItemCarrinho } from "@/types";

/** Link do WhatsApp com uma mensagem já escrita. */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Pedido do carrinho formatado como mensagem de WhatsApp. */
export function mensagemPedido(itens: ItemCarrinho[], total: number): string {
  const linhas = itens.map(
    ({ produto, quantidade }) =>
      `• ${quantidade}x ${produto.nome} — ${precoBRL(produto.preco * quantidade)}`,
  );

  return [
    `Olá! Quero fechar este pedido na ${LOJA.nome}:`,
    "",
    ...linhas,
    "",
    `Total: ${precoBRL(total)}`,
    "",
    "Pode confirmar disponibilidade e frete?",
  ].join("\n");
}

/** Mensagem de interesse em um produto específico. */
export function mensagemProduto(nome: string): string {
  return `Olá! Tenho interesse no produto "${nome}" da ${LOJA.nome}. Pode me passar mais informações?`;
}
