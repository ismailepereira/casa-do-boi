import { LOJA } from "@/config/loja";
import { ENTREGA } from "@/config/entrega";
import type { Produto } from "@/types";

/**
 * Dados estruturados (schema.org) em JSON-LD.
 *
 * É o que faz o Google mostrar preço, disponibilidade e prazo direto no
 * resultado de busca, em vez de só o título e um trecho de texto. Para loja,
 * isso muda a taxa de clique.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://casa-do-boi.vercel.app";

function Bloco({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      // Conteúdo próprio, montado a partir do catálogo — não vem do visitante.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

/** Identidade da loja: aparece no painel de conhecimento do Google. */
export function DadosDaLoja() {
  return (
    <Bloco
      dados={{
        "@context": "https://schema.org",
        "@type": "Store",
        "@id": `${BASE}/#loja`,
        name: LOJA.nome,
        legalName: LOJA.razaoSocial,
        taxID: LOJA.cnpj,
        description: LOJA.descricao,
        url: BASE,
        logo: `${BASE}/logo.png`,
        image: `${BASE}/opengraph-image.png`,
        telephone: LOJA.telefone,
        email: LOJA.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: LOJA.endereco.rua,
          addressLocality: LOJA.endereco.cidade,
          addressRegion: LOJA.endereco.uf,
          postalCode: LOJA.endereco.cep,
          addressCountry: "BR",
        },
        openingHours: ["Mo-Fr 07:30-18:00", "Sa 07:30-12:00"],
        currenciesAccepted: "BRL",
        paymentAccepted: "PIX, Cartão de crédito, Dinheiro",
      }}
    />
  );
}

/** Produto com preço e disponibilidade. */
export function DadosDoProduto({ produto }: { produto: Produto }) {
  const url = `${BASE}/produto/${produto.slug}`;

  return (
    <Bloco
      dados={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: produto.nome,
        description: produto.descricao,
        image: [`${BASE}${produto.imagem}`],
        sku: produto.slug,
        brand: { "@type": "Brand", name: produto.marca },
        weight: {
          "@type": "QuantitativeValue",
          value: produto.logistica.pesoKg,
          unitCode: "KGM",
        },
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "BRL",
          price: produto.preco,
          availability: produto.emEstoque
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${BASE}/#loja` },
          shippingDetails:
            produto.logistica.modalidade === "correios"
              ? {
                  "@type": "OfferShippingDetails",
                  shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "BR",
                  },
                  deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                      "@type": "QuantitativeValue",
                      minValue: 1,
                      maxValue: ENTREGA.diasSeparacao,
                      unitCode: "DAY",
                    },
                  },
                }
              : undefined,
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "BR",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 7,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
        },
      }}
    />
  );
}

/** Caminho de navegação, que o Google mostra no lugar da URL crua. */
export function DadosDaTrilha({
  itens,
}: {
  itens: { nome: string; caminho: string }[];
}) {
  return (
    <Bloco
      dados={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: itens.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.nome,
          item: `${BASE}${item.caminho}`,
        })),
      }}
    />
  );
}
