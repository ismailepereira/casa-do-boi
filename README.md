# Casa do Boi FOS — E-commerce

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
