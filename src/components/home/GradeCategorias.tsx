import Link from "next/link";
import { ArrowUpRight, Fence, Shirt, Syringe, Wheat, Wrench } from "lucide-react";
import { CATEGORIAS } from "@/data/categorias";

/** Mapa nome → componente, para o dado ficar serializável em `categorias.ts`. */
const ICONES = { Wrench, Wheat, Syringe, Fence, Shirt } as const;

export function GradeCategorias() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl text-verde-900 sm:text-4xl">Departamentos</h2>
          <p className="mt-1 text-sm text-verde-800/60">
            Cinco frentes que cobrem a propriedade inteira.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIAS.map((categoria, indice) => {
          const Icone = ICONES[categoria.icone as keyof typeof ICONES] ?? Wrench;
          const grande = indice === 0;

          return (
            <Link
              key={categoria.slug}
              href={`/categoria/${categoria.slug}`}
              className={
                grande
                  ? "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-verde-800 p-6 text-white transition-transform hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1 lg:row-span-2"
                  : "group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-verde-800/8 bg-white p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
              }
            >
              {grande && <div className="textura-campo absolute inset-0" aria-hidden />}

              <div className={grande ? "relative" : "contents"}>
                <span
                  className={
                    grande
                      ? "grid size-14 place-items-center rounded-xl bg-verde-400 text-verde-950"
                      : "grid size-12 shrink-0 place-items-center rounded-xl bg-verde-50 text-verde-600 transition-colors group-hover:bg-verde-400 group-hover:text-verde-950"
                  }
                >
                  <Icone size={grande ? 28 : 24} aria-hidden />
                </span>

                <div className={grande ? "mt-5" : "min-w-0"}>
                  <h3
                    className={
                      grande
                        ? "text-3xl leading-tight"
                        : "text-lg leading-tight text-verde-900"
                    }
                  >
                    {categoria.nome}
                  </h3>
                  <p
                    className={
                      grande
                        ? "mt-3 max-w-sm text-sm leading-relaxed text-verde-100/75"
                        : "mt-1.5 line-clamp-2 text-xs leading-relaxed text-verde-800/60"
                    }
                  >
                    {categoria.descricao}
                  </p>
                  {grande && (
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-verde-300">
                      Ver produtos
                      <ArrowUpRight size={16} aria-hidden />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
