import { NextResponse } from "next/server";
import { catalogo } from "@/services/catalogo";

/**
 * Diagnóstico: diz de onde o catálogo está vindo agora.
 * Útil para confirmar, em produção, se o Bling assumiu o lugar do mock.
 */
export async function GET() {
  const { produtos, origem } = await catalogo();
  return NextResponse.json({
    origem,
    total: produtos.length,
    porModalidade: {
      correios: produtos.filter((p) => p.logistica.modalidade === "correios").length,
      retirada: produtos.filter((p) => p.logistica.modalidade === "retirada").length,
    },
  });
}
