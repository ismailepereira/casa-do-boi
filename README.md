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

O projeto está em **fase 1 (visual)**: todas as telas funcionam com catálogo mockado em
`src/data/`. A fase 2 troca a origem dos dados por banco e liga o checkout — nenhuma tela
precisa ser reescrita, porque tudo consome os tipos de `src/types/`.

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

## Catálogo pelo Bling (ERP)

O site lê o catálogo do Bling quando há credenciais; sem elas, usa o catálogo local
de demonstração em `src/data/produtos.ts`. Nenhuma página sabe qual dos dois está
valendo — quem decide é `src/services/catalogo.ts`.

Com o Bling ligado, o mesmo cadastro abastece o site, o Mercado Livre e os demais
marketplaces, emite a nota fiscal e gera a etiqueta.

**Como obter as credenciais**

1. No Bling: *Central de Extensões > Área do Integrador > Criar aplicativo*
2. Marque os escopos de **Produtos** e **Pedidos de venda**
3. Copie o `Client ID` e o `Client Secret` da aba "Informações do app"
4. Autorize o app para gerar o `refresh_token` (vale **30 dias** — renove antes de expirar)
5. Preencha no `.env.local`:

```
BLING_CLIENT_ID=
BLING_CLIENT_SECRET=
BLING_REFRESH_TOKEN=
```

**Conferir a conexão antes de mexer no site**

```bash
npm run bling:teste
```

Mostra se o token está válido, lista os produtos, aponta quais estão **sem peso ou
dimensão** (esses caem em orçamento, porque não dá para cotar frete) e imprime os nomes
das categorias — que devem ser cadastrados no `DE_PARA_CATEGORIA` de
`src/services/catalogo.ts`.

**Diagnóstico em produção**

`GET /api/catalogo` responde de onde veio o catálogo (`bling` ou `local`), quantos
produtos e como estão divididos por modalidade de envio.

Se o Bling ficar fora do ar, o site cai automaticamente no catálogo local em vez de
quebrar.

## Pendências antes de ir ao ar

- [ ] Confirmar telefone, endereço, horário e CNPJ em `src/config/loja.ts`
- [ ] Validar **todos** os preços e especificações de `src/data/produtos.ts` (hoje provisórios)
- [ ] Substituir o placeholder pelas fotos reais dos demais produtos
- [ ] Fase 2: banco (Prisma + Postgres), painel admin, checkout Mercado Pago
- [ ] Fase 2: cálculo de frete por CEP

## Segurança

Nada de segredo em código. Variáveis ficam em `.env.local` (ignorado pelo git) com o
espelho sem valores em `.env.example`.

---

Desenvolvido por [ismailepereira](https://ismailepereira.github.io/)
