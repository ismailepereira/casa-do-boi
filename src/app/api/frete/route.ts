import { NextResponse } from "next/server";
import { produtoPorSlug } from "@/data/produtos";
import { cotarFrete } from "@/services/melhorEnvio";

/**
 * Cotação de frete. O token do Melhor Envio nunca sai daqui — quem tem o token
 * compra etiqueta na conta da loja, então ele fica só no servidor.
 *
 * POST /api/frete
 * { "cep": "68365000", "itens": [{ "slug": "...", "quantidade": 1 }] }
 */

type Corpo = {
  cep?: string;
  itens?: { slug?: string; quantidade?: number }[];
};

export async function POST(requisicao: Request) {
  let corpo: Corpo;
  try {
    corpo = (await requisicao.json()) as Corpo;
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  const cep = (corpo.cep ?? "").replace(/\D/g, "");
  if (cep.length !== 8) {
    return NextResponse.json({ erro: "Informe um CEP com 8 dígitos." }, { status: 400 });
  }

  const pedidos = corpo.itens ?? [];
  if (pedidos.length === 0) {
    return NextResponse.json({ erro: "Nenhum item para cotar." }, { status: 400 });
  }

  const itens = [];
  for (const pedido of pedidos) {
    const produto = produtoPorSlug(pedido.slug ?? "");
    if (!produto) {
      return NextResponse.json(
        { erro: `Produto não encontrado: ${pedido.slug}` },
        { status: 404 },
      );
    }
    itens.push({
      produto,
      quantidade: Math.max(1, Math.min(99, Math.trunc(pedido.quantidade ?? 1))),
    });
  }

  try {
    return NextResponse.json(await cotarFrete(cep, itens));
  } catch (erro) {
    console.error("Falha ao cotar frete:", erro);
    return NextResponse.json(
      { erro: "Não conseguimos calcular o frete agora. Tente de novo em instantes." },
      { status: 502 },
    );
  }
}
