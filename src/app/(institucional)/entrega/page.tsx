import type { Metadata } from "next";
import Link from "next/link";
import { ENTREGA } from "@/config/entrega";
import { LOJA } from "@/config/loja";
import { CORREIOS } from "@/lib/frete";

export const metadata: Metadata = {
  title: "Prazos e formas de entrega",
  description:
    "Como a Casa do Boi FOS envia os pedidos: prazos por região, o que vai pelos Correios e o que sai apenas na retirada.",
};

export default function PaginaEntrega() {
  return (
    <>
      <h1 className="text-4xl text-verde-900 sm:text-5xl">Prazos e entrega</h1>
      <p className="mt-2 text-xs text-verde-800/50">
        Última atualização: setembro de 2026
      </p>

      <p>
        Enviamos de {LOJA.endereco.cidade}/{LOJA.endereco.uf} para todo o Brasil pelos
        Correios. Você também pode comprar pelo site e retirar na loja, sem pagar frete.
      </p>

      <h2>Como o prazo é contado</h2>
      <p>
        O prazo que aparece no site é a soma de duas partes — e é isso que você recebe como
        promessa:
      </p>
      <ul>
        <li>
          <strong>Separação:</strong> até {ENTREGA.diasSeparacao} dias úteis para conferir,
          embalar e postar
        </li>
        <li>
          <strong>Transporte:</strong> o prazo dos Correios até o seu endereço
        </li>
      </ul>
      <p>{ENTREGA.observacaoPrazo}</p>
      <p>
        Pedido pago e conferido até <strong>{ENTREGA.horarioCorte}</strong> entra na malha
        do mesmo dia. Depois desse horário, sai no próximo dia útil.
      </p>

      <h2>Prazo de transporte por região</h2>
      <p>
        Estimativa em dias úteis, a partir de {LOJA.endereco.cidade}/{LOJA.endereco.uf}. O
        prazo exato do seu CEP aparece no cálculo de frete da página do produto.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-verde-800 text-white">
              <th className="px-3 py-2 text-left font-semibold">Região</th>
              <th className="px-3 py-2 text-left font-semibold">PAC</th>
              <th className="px-3 py-2 text-left font-semibold">SEDEX</th>
            </tr>
          </thead>
          <tbody>
            {ENTREGA.prazoCorreiosPorRegiao.map((linha, i) => (
              <tr key={linha.regiao} className={i % 2 === 0 ? "bg-areia-50" : ""}>
                <td className="border-b border-areia-200 px-3 py-2">{linha.regiao}</td>
                <td className="border-b border-areia-200 px-3 py-2">{linha.pac}</td>
                <td className="border-b border-areia-200 px-3 py-2">{linha.sedex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>O que não enviamos pelos Correios</h2>
      <p>
        Os Correios não aceitam encomenda acima de <strong>{CORREIOS.pesoMaximoKg} kg</strong>,
        com algum lado acima de <strong>{CORREIOS.ladoMaximoCm} cm</strong> ou com a soma das
        três medidas acima de <strong>{CORREIOS.somaMaximaCm} cm</strong>. Também não é
        possível postar item que precisa de refrigeração.
      </p>
      <p>
        Saco de ração, sal mineral, rolo de arame, adubo e vacina entram nesses casos. Esses
        produtos continuam à venda no site, mas <strong>apenas para retirada na loja</strong> —
        e isso está avisado na página de cada um, antes de você comprar.
      </p>

      <h2>Frete grátis</h2>
      <p>
        Compras acima de <strong>R$ {LOJA.freteGratisAcima}</strong> têm frete grátis em{" "}
        {LOJA.endereco.cidade} e região.
      </p>

      <h2>Retirada na loja</h2>
      <p>
        Sem custo, em {LOJA.endereco.rua}, {LOJA.endereco.bairro},{" "}
        {LOJA.endereco.cidade}/{LOJA.endereco.uf}. A loja avisa quando o pedido estiver
        separado. Leve um documento com foto e o número do pedido.
      </p>
      {LOJA.horario.map((h) => (
        <p key={h.dias} className="!mt-1">
          <strong>{h.dias}:</strong> {h.horas}
        </p>
      ))}

      <h2>Acompanhar a entrega</h2>
      <p>
        Assim que o pedido é postado, enviamos o código de rastreio por e-mail. Você
        acompanha pela nossa página de{" "}
        <Link href="/rastreio" className="font-semibold text-verde-600 underline">
          acompanhamento de entrega
        </Link>
        .
      </p>

      <h2>Endereço errado ou ausência</h2>
      <p>
        Confira o endereço antes de confirmar o pedido. Se a encomenda voltar por endereço
        incorreto ou por ausência depois das tentativas dos Correios, o reenvio tem novo
        custo de frete.
      </p>
    </>
  );
}
