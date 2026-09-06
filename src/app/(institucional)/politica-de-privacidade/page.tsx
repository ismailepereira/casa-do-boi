import type { Metadata } from "next";
import { LOJA } from "@/config/loja";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como a Casa do Boi FOS coleta, usa e protege os dados pessoais de quem compra na loja online.",
};

export default function PoliticaDePrivacidade() {
  return (
    <>
      <h1 className="text-4xl text-verde-900 sm:text-5xl">Política de privacidade</h1>
      <p className="mt-2 text-xs text-verde-800/50">
        Última atualização: setembro de 2026
      </p>

      <p>
        Esta política explica quais dados a <strong>{LOJA.razaoSocial}</strong>, CNPJ{" "}
        {LOJA.cnpj}, coleta em {LOJA.nome}, para que usa e quais são os seus direitos. Ela
        segue a Lei Geral de Proteção de Dados (Lei 13.709/2018).
      </p>

      <h2>Quem é o controlador dos dados</h2>
      <p>
        {LOJA.razaoSocial} — CNPJ {LOJA.cnpj}, {LOJA.endereco.rua},{" "}
        {LOJA.endereco.bairro}, {LOJA.endereco.cidade}/{LOJA.endereco.uf}, CEP{" "}
        {LOJA.endereco.cep}. Contato: {LOJA.email} ou {LOJA.whatsappExibicao}.
      </p>

      <h2>Que dados coletamos</h2>
      <p>Só pedimos o necessário para vender, faturar e entregar:</p>
      <ul>
        <li>
          <strong>Nome completo</strong> — para identificar o pedido e emitir a nota
        </li>
        <li>
          <strong>CPF ou CNPJ</strong> — exigido por lei para emitir a nota fiscal
        </li>
        <li>
          <strong>E-mail e telefone</strong> — para confirmar o pedido e avisar sobre a entrega
        </li>
        <li>
          <strong>Endereço completo</strong> — para calcular o frete e entregar
        </li>
        <li>
          <strong>Itens e valores do pedido</strong> — para separar e faturar
        </li>
      </ul>
      <p>
        Não pedimos senha, dado de cartão nem dado bancário. O pagamento é combinado
        diretamente com a loja, fora do site.
      </p>

      <h2>Para que usamos</h2>
      <ul>
        <li>Processar, separar e entregar o pedido</li>
        <li>Emitir a nota fiscal, que é obrigação legal</li>
        <li>Entrar em contato sobre esse pedido específico</li>
        <li>Cumprir obrigações fiscais e responder a autoridades quando exigido</li>
      </ul>
      <p>
        <strong>Não vendemos, alugamos nem cedemos seus dados</strong> para terceiros com
        finalidade comercial. Não usamos seus dados para publicidade sem que você peça.
      </p>

      <h2>Com quem compartilhamos</h2>
      <ul>
        <li>
          <strong>Correios</strong> — nome e endereço, para postar e entregar a encomenda
        </li>
        <li>
          <strong>Serviço de e-mail</strong> — para enviar a confirmação do pedido
        </li>
        <li>
          <strong>Hospedagem do site</strong> — que processa os dados apenas para o site funcionar
        </li>
        <li>
          <strong>Contabilidade e órgãos fiscais</strong> — quando a legislação exigir
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        O site usa apenas armazenamento local do navegador para lembrar o que você colocou
        no carrinho. Esse dado fica no seu aparelho, não é enviado para nós e some quando
        você limpa os dados do navegador. Não usamos cookies de publicidade nem de
        rastreamento de terceiros.
      </p>

      <h2>Por quanto tempo guardamos</h2>
      <p>
        Dados de pedido e nota fiscal ficam guardados pelo prazo exigido pela legislação
        fiscal, de <strong>5 anos</strong>. Depois disso são descartados ou anonimizados.
      </p>

      <h2>Seus direitos</h2>
      <p>A LGPD garante que você pode, a qualquer momento:</p>
      <ul>
        <li>Saber quais dados seus temos</li>
        <li>Corrigir dado incompleto ou desatualizado</li>
        <li>Pedir a exclusão dos dados que não somos obrigados a guardar</li>
        <li>Revogar consentimento</li>
        <li>Pedir a portabilidade dos dados</li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, escreva para <strong>{LOJA.email}</strong>{" "}
        ou ligue para {LOJA.whatsappExibicao}. Respondemos em até 15 dias.
      </p>

      <h2>Segurança</h2>
      <p>
        O site trafega em HTTPS, os dados do pedido são validados no servidor e as chaves
        de integração ficam em variáveis de ambiente, nunca no código publicado. Nenhum
        sistema é infalível — se acontecer um incidente com risco relevante, avisamos os
        titulares e a ANPD, como manda a lei.
      </p>

      <h2>Mudanças nesta política</h2>
      <p>
        Se algo mudar, a data no topo é atualizada. Alterações relevantes são comunicadas
        na página inicial.
      </p>
    </>
  );
}
