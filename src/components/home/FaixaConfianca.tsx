import { Headset, Landmark, Truck, Warehouse } from "lucide-react";
import { LOJA } from "@/config/loja";

const ITENS = [
  {
    icone: Truck,
    titulo: "Entrega na porteira",
    texto: `Frete grátis acima de R$ ${LOJA.freteGratisAcima} em ${LOJA.endereco.cidade} e região.`,
  },
  {
    icone: Landmark,
    titulo: "PIX com desconto",
    texto: `${Math.round(LOJA.descontoPix * 100)}% à vista ou cartão em ${LOJA.parcelasMax}x sem juros.`,
  },
  {
    icone: Warehouse,
    titulo: "Retirada na loja",
    texto: "Compre online e leve no mesmo dia, sem fila e sem esperar entrega.",
  },
  {
    icone: Headset,
    titulo: "Atendimento de quem entende",
    texto: "Dúvida de dosagem, bitola ou modelo? Fale direto no WhatsApp.",
  },
];

export function FaixaConfianca() {
  return (
    <section className="border-y border-verde-800/8 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {ITENS.map(({ icone: Icone, titulo, texto }) => (
          <div key={titulo} className="flex gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-verde-50 text-verde-600">
              <Icone size={21} aria-hidden />
            </span>
            <div>
              <h3 className="text-base leading-tight text-verde-900">{titulo}</h3>
              <p className="mt-1 text-xs leading-relaxed text-verde-800/60">{texto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
