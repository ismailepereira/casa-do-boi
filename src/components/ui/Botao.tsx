import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const estilos = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-500 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variante: {
        primario:
          "bg-verde-400 text-verde-950 shadow-sm hover:bg-verde-300 active:translate-y-px",
        escuro: "bg-verde-800 text-white hover:bg-verde-700 active:translate-y-px",
        contorno:
          "border-2 border-verde-800 bg-transparent text-verde-800 hover:bg-verde-800 hover:text-white",
        claro: "bg-white text-verde-800 shadow-sm hover:bg-verde-50",
        whatsapp: "bg-[#1faf53] text-white hover:bg-[#189544] active:translate-y-px",
        fantasma: "bg-transparent text-verde-800 hover:bg-verde-100",
      },
      tamanho: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-13 px-7 text-base",
      },
      largura: {
        auto: "",
        cheia: "w-full",
      },
    },
    defaultVariants: { variante: "primario", tamanho: "md", largura: "auto" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof estilos>;

export function Botao({ className, variante, tamanho, largura, ...props }: Props) {
  return (
    <button className={cn(estilos({ variante, tamanho, largura }), className)} {...props} />
  );
}

export { estilos as estilosBotao };
