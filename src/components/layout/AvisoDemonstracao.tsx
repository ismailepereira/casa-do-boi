import { TriangleAlert } from "lucide-react";
import { LOJA } from "@/config/loja";

/**
 * Faixa de aviso da versão demonstrativa.
 *
 * Para tirar do ar: `NEXT_PUBLIC_DEMO=false` no ambiente (ver `LOJA.demonstracao`).
 * Nenhum outro arquivo precisa ser tocado — o componente some junto com o
 * `noindex` do `layout.tsx` e a nota do rodapé.
 */
export function AvisoDemonstracao() {
  if (!LOJA.demonstracao) return null;

  return (
    <div className="bg-amber-400 text-amber-950">
      <p className="mx-auto flex max-w-7xl items-start gap-2 px-4 py-2 text-xs leading-snug sm:items-center">
        <TriangleAlert size={15} className="mt-0.5 shrink-0 sm:mt-0" aria-hidden />
        <span>
          <strong className="font-bold">Site demonstrativo, sem validade comercial.</strong>{" "}
          Produtos, preços, condições e dados de contato são ilustrativos e não
          representam ofertas da {LOJA.nome}. Esta versão é temporária e pode ser
          retirada do ar a qualquer momento.
        </span>
      </p>
    </div>
  );
}
