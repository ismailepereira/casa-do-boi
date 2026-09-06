import "server-only";

import { cotarCorreios } from "@/services/melhorEnvio";
import type { GrupoFrete, ItemCarrinho, ResultadoFrete } from "@/types";

/**
 * Cotação do pedido.
 *
 * A loja envia **somente pelos Correios**. O que não cabe nos limites deles
 * (30 kg, lado ≤ 100 cm, soma ≤ 200 cm) ou não pode ser postado sai apenas na
 * retirada — e a resposta diz o motivo, em vez de mostrar um preço que não
 * existe. Entrega por transportadora é etapa contratada à parte.
 */

export async function cotarPedido(
  cepDestinoBruto: string,
  itens: ItemCarrinho[],
): Promise<ResultadoFrete> {
  const cepDestino = cepDestinoBruto.replace(/\D/g, "");

  const postaveis = itens.filter((i) => i.produto.logistica.modalidade === "correios");
  const soRetirada = itens.filter((i) => i.produto.logistica.modalidade === "retirada");

  const grupos: GrupoFrete[] = [];

  if (postaveis.length > 0) {
    const { opcoes } = await cotarCorreios(cepDestino, postaveis);
    grupos.push({
      chave: "correios",
      titulo: "Envio pelos Correios",
      itens: postaveis.map((i) => i.produto.nome),
      opcoes,
      aviso:
        opcoes.length === 0
          ? "Os Correios não retornaram opção de envio para este CEP. Fale com a loja."
          : undefined,
    });
  }

  if (soRetirada.length > 0) {
    grupos.push({
      chave: "retirada",
      titulo: "Retirada na loja",
      itens: soRetirada.map((i) => i.produto.nome),
      opcoes: [],
      aviso:
        soRetirada.length === 1
          ? (soRetirada[0].produto.logistica.observacao ??
            "Este item não é enviado pelos Correios e sai apenas na loja.")
          : "Estes itens não são enviados pelos Correios e saem apenas na loja.",
    });
  }

  return {
    grupos,
    simulado: grupos.some((g) => g.opcoes.some((o) => o.simulado)),
  };
}
