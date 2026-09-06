import { LOJA } from "@/config/loja";

/** Link do WhatsApp com uma mensagem já escrita. */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Mensagem de interesse em um produto específico. */
export function mensagemProduto(nome: string): string {
  return `Olá! Tenho interesse no produto "${nome}" da ${LOJA.nome}. Pode me passar mais informações?`;
}
