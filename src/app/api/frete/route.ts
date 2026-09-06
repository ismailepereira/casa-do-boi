import { NextResponse } from "next/server";
import { produtoPorSlug } from "@/services/catalogo";
import { cotarPedido } from "@/services/cotacao";
import { ipDaRequisicao, verificarLimite } from "@/lib/limiteTaxa";

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
  // Cotar frete chama servico externo: 20 consultas por minuto por IP bastam
  // para uso normal e impedem que alguem estoure a cota da loja.
  const limite = verificarLimite(`frete:${ipDaRequisicao(requisicao)}`, 20, 60);
  if (!limite.permitido) {
    return NextResponse.json(
      { erro: "Muitas consultas seguidas. Tente de novo em instantes." },
      { status: 429 },
    );
  }

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
    const produto = await produtoPorSlug(pedido.slug ?? "");
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
    return NextResponse.json(await cotarPedido(cep, itens));
  } catch (erro) {
    console.error("Falha ao cotar frete:", erro);
    return NextResponse.json(
      { erro: "Não conseguimos calcular o frete agora. Tente de novo em instantes." },
      { status: 502 },
    );
  }
}
