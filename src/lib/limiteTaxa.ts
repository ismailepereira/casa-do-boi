/**
 * Limitador de requisições por IP, em memória.
 *
 * Impede que alguém martele a cotação de frete (estourando a cota da loja no
 * Melhor Envio) ou dispare pedidos falsos em massa.
 *
 * Em memória basta para o volume desta loja. Como a Vercel pode ter mais de uma
 * instância, o limite é por instância — é uma contenção, não uma trava
 * absoluta. Se o volume crescer, isto vira Redis sem mudar quem chama.
 */

type Janela = { contagem: number; expiraEm: number };

const janelas = new Map<string, Janela>();

/** Remove janelas vencidas para o mapa não crescer sem limite. */
function limpar(agora: number): void {
  if (janelas.size < 500) return;
  for (const [chave, janela] of janelas) {
    if (janela.expiraEm <= agora) janelas.delete(chave);
  }
}

export type Resultado = { permitido: boolean; tentarEmSegundos: number };

export function verificarLimite(
  chave: string,
  maximo: number,
  janelaSegundos: number,
): Resultado {
  const agora = Date.now();
  limpar(agora);

  const atual = janelas.get(chave);
  if (!atual || atual.expiraEm <= agora) {
    janelas.set(chave, { contagem: 1, expiraEm: agora + janelaSegundos * 1000 });
    return { permitido: true, tentarEmSegundos: 0 };
  }

  atual.contagem += 1;
  if (atual.contagem > maximo) {
    return {
      permitido: false,
      tentarEmSegundos: Math.ceil((atual.expiraEm - agora) / 1000),
    };
  }
  return { permitido: true, tentarEmSegundos: 0 };
}

/** IP do visitante conforme os cabeçalhos da Vercel. */
export function ipDaRequisicao(requisicao: Request): string {
  const encaminhado = requisicao.headers.get("x-forwarded-for");
  if (encaminhado) return encaminhado.split(",")[0].trim();
  return requisicao.headers.get("x-real-ip") ?? "desconhecido";
}
