import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Moldura comum das páginas de texto: privacidade, termos, trocas e entrega. */
export default function LayoutInstitucional({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav
        aria-label="Você está aqui"
        className="flex items-center gap-1 text-xs text-verde-800/50"
      >
        <Link href="/" className="hover:text-verde-600">
          Início
        </Link>
        <ChevronRight size={13} aria-hidden />
        <span className="text-verde-800">Informações</span>
      </nav>

      <article
        className="mt-6 rounded-2xl border border-verde-800/8 bg-white p-6 sm:p-10
          [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-verde-900
          [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:text-verde-900
          [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-verde-800/80
          [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-verde-800/80
          [&_strong]:font-semibold [&_strong]:text-verde-950
          [&_ul]:mt-3 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:[list-style:disc]"
      >
        {children}
      </article>
    </div>
  );
}
