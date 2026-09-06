import type { Metadata } from "next";
import { LOJA } from "@/config/loja";

export const metadata: Metadata = {
  title: "Trocas e devoluções",
  description:
    "Prazo de arrependimento, como devolver um produto e o que a Casa do Boi FOS não aceita de volta.",
};

export default function TrocasEDevolucoes() {
  return (
    <>
      <h1 className="text-4xl text-verde-900 sm:text-5xl">Trocas e devoluções</h1>
      <p className="mt-2 text-xs text-verde-800/50">
        Última atualização: setembro de 2026
      </p>

      <h2>Direito de arrependimento — 7 dias</h2>
      <p>
        Compra feita pela internet tem <strong>7 dias corridos</strong> para
        arrependimento, contados do recebimento, conforme o artigo 49 do Código de Defesa
        do Consumidor. Não precisa justificar.
      </p>
      <p>
        Nesse caso, <strong>a loja paga o frete de retorno</strong> e devolve o valor
        integral, incluindo o frete que você pagou na compra.
      </p>

      <h2>Produto com defeito</h2>
      <p>
        Se o produto chegar com defeito ou avaria, avise em até <strong>7 dias</strong> do
        recebimento, com fotos. A loja providencia a troca ou a devolução do valor, sem
        custo de frete para você.
      </p>
      <p>
        Para produtos com garantia de fabricante — máquinas e equipamentos, por exemplo —
        o prazo e o atendimento seguem o que o fabricante define, e a loja orienta sobre a
        assistência autorizada mais próxima.
      </p>

      <h2>O que não pode ser devolvido</h2>
      <p>Por segurança e por exigência sanitária, não aceitamos de volta:</p>
      <ul>
        <li>
          <strong>Medicamento veterinário e vacina</strong> — depois que sai da loja não há
          como garantir a conservação
        </li>
        <li>
          <strong>Ração, suplemento e sal mineral com a embalagem aberta</strong>
        </li>
        <li>
          <strong>Semente com a embalagem violada</strong>
        </li>
        <li>Produto danificado por uso indevido ou fora da recomendação do fabricante</li>
      </ul>
      <p>
        Esses itens só são aceitos de volta dentro dos 7 dias de arrependimento e{" "}
        <strong>com a embalagem lacrada e intacta</strong>.
      </p>

      <h2>Como devolver</h2>
      <ul>
        <li>
          Entre em contato pelo e-mail {LOJA.email} ou pelo telefone{" "}
          {LOJA.whatsappExibicao}, informando o número do pedido
        </li>
        <li>A loja envia as instruções e, quando for o caso, a etiqueta de devolução</li>
        <li>
          Embale o produto na embalagem original, com todos os acessórios, manuais e a nota
          fiscal
        </li>
        <li>Poste no prazo combinado e guarde o comprovante</li>
      </ul>

      <h2>Prazo do estorno</h2>
      <p>
        Assim que o produto chega e é conferido, o valor é devolvido em até{" "}
        <strong>10 dias úteis</strong>, pelo mesmo meio do pagamento. Em pagamento por
        PIX, a devolução vai para a mesma chave ou conta de origem.
      </p>

      <h2>Troca por outro produto</h2>
      <p>
        Se preferir trocar em vez de devolver, é possível dentro dos mesmos prazos. Se o
        produto novo custar mais, você paga a diferença; se custar menos, a diferença é
        devolvida.
      </p>

      <h2>Retirada na loja</h2>
      <p>
        Produto retirado na loja pode ser conferido na hora, junto com o atendente — é o
        jeito mais rápido de resolver qualquer divergência. As mesmas regras de garantia
        e defeito valem.
      </p>
    </>
  );
}
