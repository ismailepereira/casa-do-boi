import type { Metadata } from "next";
import Link from "next/link";
import { PAGAMENTO } from "@/config/entrega";
import { LOJA } from "@/config/loja";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "Condições de uso da loja online da Casa do Boi FOS: pedidos, preços, pagamento e responsabilidades.",
};

export default function TermosDeUso() {
  return (
    <>
      <h1 className="text-4xl text-verde-900 sm:text-5xl">Termos de uso</h1>
      <p className="mt-2 text-xs text-verde-800/50">
        Última atualização: setembro de 2026
      </p>

      <p>
        Ao usar esta loja você concorda com as condições abaixo. Quem vende é a{" "}
        <strong>{LOJA.razaoSocial}</strong>, CNPJ {LOJA.cnpj}, com endereço em{" "}
        {LOJA.endereco.rua}, {LOJA.endereco.bairro}, {LOJA.endereco.cidade}/
        {LOJA.endereco.uf}.
      </p>

      <h2>Como o pedido é fechado</h2>
      <ul>
        <li>Você monta o carrinho e informa seus dados e o endereço de entrega</li>
        <li>O site calcula o frete e mostra o total</li>
        <li>
          Ao enviar, você recebe um <strong>número de pedido</strong> — que é uma solicitação
          de compra, ainda não uma venda concluída
        </li>
        <li>
          A loja confere a disponibilidade e envia a cobrança. A venda se conclui com a
          confirmação do pagamento
        </li>
      </ul>
      <p>
        Se algum item estiver sem estoque, a loja avisa e você decide se quer trocar,
        aguardar ou cancelar sem custo.
      </p>

      <h2>Pagamento</h2>
      <p>
        Nesta etapa o pagamento é combinado diretamente com a loja, por{" "}
        {PAGAMENTO.formas.join(", ").toLowerCase()}. O pedido fica reservado por{" "}
        {PAGAMENTO.horasParaPagar} horas.
      </p>
      <p>
        <strong>O site não coleta dado de cartão nem de conta bancária.</strong> Nunca
        informe senha ou número de cartão por e-mail ou telefone.
      </p>

      <h2>Preços e disponibilidade</h2>
      <p>
        Os preços valem para o site e podem mudar sem aviso. Erro evidente de digitação —
        preço muito abaixo do praticado, por exemplo — não obriga a loja a vender por
        aquele valor; nesse caso o pedido é cancelado e o valor pago é devolvido
        integralmente.
      </p>
      <p>
        Fotos são ilustrativas. Embalagem e rótulo podem variar conforme o lote do
        fabricante.
      </p>

      <h2>Produtos de uso veterinário e agrícola</h2>
      <p>
        Medicamento veterinário, vacina, semente e defensivo devem ser usados conforme a
        bula e a orientação de profissional habilitado. A loja fornece o produto original,
        mas <strong>não substitui a orientação de médico veterinário ou agrônomo</strong> e
        não responde por uso fora da recomendação do fabricante.
      </p>

      <h2>Entrega</h2>
      <p>
        As regras de prazo, cobertura e o que não é enviado estão na página de{" "}
        <Link href="/entrega" className="font-semibold text-verde-600 underline">
          prazos e entrega
        </Link>
        . Trocas e devoluções, na página de{" "}
        <Link href="/trocas-e-devolucoes" className="font-semibold text-verde-600 underline">
          trocas e devoluções
        </Link>
        .
      </p>

      <h2>Uso do site</h2>
      <p>Ao usar a loja, você se compromete a:</p>
      <ul>
        <li>Informar dados verdadeiros e completos</li>
        <li>Não tentar burlar, sobrecarregar ou invadir o site</li>
        <li>Não usar o conteúdo do site — textos, fotos e marca — sem autorização</li>
      </ul>

      <h2>Dados pessoais</h2>
      <p>
        O tratamento dos seus dados está descrito na{" "}
        <Link
          href="/politica-de-privacidade"
          className="font-semibold text-verde-600 underline"
        >
          política de privacidade
        </Link>
        .
      </p>

      <h2>Foro e contato</h2>
      <p>
        Estes termos seguem a legislação brasileira, em especial o Código de Defesa do
        Consumidor e o Decreto 7.962/2013. Fica eleito o foro da comarca de{" "}
        {LOJA.endereco.cidade}/{LOJA.endereco.uf}, sem prejuízo do direito do consumidor de
        acionar o foro do seu domicílio.
      </p>
      <p>
        Dúvidas: {LOJA.email} ou {LOJA.whatsappExibicao}.
      </p>
    </>
  );
}
