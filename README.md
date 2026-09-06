# Casa do Boi FOS — E-commerce

> ## ⚠️ Versão demonstrativa
>
> Este repositório contém uma **demonstração técnica**, sem validade comercial.
> Produtos, preços, prazos, formas de pagamento e dados de contato são **ilustrativos**,
> não constituem oferta e não vinculam a Casa do Boi FOS. Nenhuma compra feita no site
> gera pedido. A publicação é **temporária** e pode ser retirada do ar a qualquer momento.
>
> Para desligar o modo demonstração (faixa de aviso, nota do rodapé e `noindex`):
> defina `NEXT_PUBLIC_DEMO=false` no ambiente.

Loja online da agropecuária **Casa do Boi FOS**: máquinas e ferramentas STIHL, suplemento
mineral e ração, linha veterinária, cerca e insumos, vestuário e selaria.

Todas as telas funcionam com um catálogo genérico em `src/data/`, que será substituído
pelos produtos reais do cliente. A camada `src/services/catalogo.ts` isola a origem dos
dados: trocar por banco ou ERP no futuro não encosta em nenhuma página.

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | Next.js 15 (App Router) | Página de produto estática/ISR — SEO é o canal principal de uma loja |
| Linguagem | TypeScript (strict) | Catálogo tipado do dado até o componente |
| Estilo | Tailwind CSS v4 | Tokens da marca em `@theme`, direto do `globals.css` |
| Estado | Zustand + persist | Carrinho sobrevive ao refresh via `localStorage` |
| Ícones | lucide-react | Traço fino, combina com a identidade |
| Imagens | `next/image` | WebP/AVIF e lazy automáticos — decisivo no 4G do interior |

## Como rodar

```bash
npm install
cp .env.example .env.local   # ajuste o WhatsApp da loja
npm run dev
```

Abre em <http://localhost:3210>.

Outros comandos:

```bash
npm run build       # build de produção
npm run typecheck   # checagem de tipos sem emitir
```

## Estrutura

```
src/
├── app/                  Rotas (App Router)
│   ├── page.tsx          Home
│   ├── categoria/[slug]  Listagem por departamento
│   ├── produto/[slug]    Página de produto
│   ├── carrinho/         Resumo e fechamento do pedido
│   └── busca/            Resultado da busca
├── components/
│   ├── layout/           Cabeçalho e rodapé
│   ├── home/             Seções da home
│   ├── produto/          Card e bloco de compra
│   ├── carrinho/         Drawer lateral
│   └── ui/               Primitivos (Botão)
├── config/loja.ts        Telefone, endereço, horário, regras de frete e desconto
├── data/                 Catálogo mockado (vira consulta ao banco na fase 2)
├── lib/                  Formatação de preço, link de WhatsApp, utilitário de classes
├── stores/carrinho.ts    Estado do carrinho
└── types/                Tipos de domínio
public/
├── logo.png              Logo da marca
└── produtos/             Fotos (6 STIHL reais + placeholder)
```

## Entrega

O plano em etapas está em [`docs/PLANO-DE-ENTREGA.md`](./docs/PLANO-DE-ENTREGA.md).

Tudo que depende do cliente — catálogo real, pesagem, contrato dos Correios, domínio —
está em [`docs/O-QUE-PRECISO-DO-CLIENTE.md`](./docs/O-QUE-PRECISO-DO-CLIENTE.md).

A planilha de peso e dimensões para levar aos Correios é a
[`docs/correios-produtos-medidas.xlsx`](./docs/correios-produtos-medidas.xlsx).

## Entrega dos pedidos

A loja envia **somente pelos Correios**. Produto que passa de 30 kg, de 100 cm em algum
lado ou que exige refrigeração fica disponível **apenas para retirada na loja**, com o
motivo explicado na página do produto.

Entrega por transportadora, pagamento online (Mercado Pago) e integração com marketplaces
são etapas contratadas à parte — não fazem parte desta entrega.

## Segurança

Nada de segredo em código. Variáveis ficam em `.env.local` (ignorado pelo git) com o
espelho sem valores em `.env.example`.

---

Desenvolvido por [ismailepereira](https://ismailepereira.github.io/)
