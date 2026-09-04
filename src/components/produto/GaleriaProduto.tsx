"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Galeria no formato de marketplace: miniaturas na lateral, imagem grande ao
 * lado. A miniatura troca a imagem ao passar o mouse, como no Mercado Livre.
 */
export function GaleriaProduto({
  imagens,
  nome,
}: {
  imagens: string[];
  nome: string;
}) {
  const [ativa, setAtiva] = useState(0);
  const unica = imagens.length <= 1;

  return (
    <div className={cn("flex gap-3", unica ? "" : "sm:gap-4")}>
      {!unica && (
        <ul className="flex shrink-0 flex-col gap-2" aria-label="Miniaturas do produto">
          {imagens.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onMouseEnter={() => setAtiva(i)}
                onFocus={() => setAtiva(i)}
                onClick={() => setAtiva(i)}
                aria-label={`Ver imagem ${i + 1} de ${imagens.length}`}
                aria-current={i === ativa}
                className={cn(
                  "relative block size-14 overflow-hidden rounded-lg border-2 bg-white transition-colors sm:size-16",
                  i === ativa
                    ? "border-verde-500"
                    : "border-areia-200 hover:border-verde-300",
                )}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl border border-verde-800/8 bg-white">
        <Image
          src={imagens[ativa]}
          alt={nome}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-contain p-8 sm:p-12"
        />
      </div>
    </div>
  );
}
