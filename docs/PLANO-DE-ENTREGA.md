# Plano de entrega — Casa do Boi FOS

Escopo contratado: **loja com catálogo, carrinho, cálculo de frete pelos Correios,
registro de pedido e acompanhamento de entrega.** Publicada na Vercel.

Fora deste escopo, vendido à parte: checkout com pagamento online (Mercado Pago),
integração com Mercado Livre e Amazon, ERP e entrega por transportadora.

---

## Onde estamos

| Etapa | Situação |
|---|---|
| Identidade visual e telas | ✅ pronto |
| Catálogo, categorias, busca, carrinho | ✅ pronto (dados genéricos) |
| Página de produto no formato marketplace | ✅ pronto |
| Cálculo de frete por CEP | ✅ pronto — em modo simulado até liberar a API |
| Acompanhamento de entrega | ✅ pronto |
| Dados cadastrais da empresa no rodapé | ✅ pronto |
| Publicação na Vercel | ✅ no ar, em modo demonstração |
| **Registro de pedido e aviso de venda** | ⬜ etapa 1 |
| **Stack de segurança** | ⬜ etapa 2 |
| **Páginas legais (LGPD, trocas, entrega)** | ⬜ etapa 3 |
| **Prazos de entrega e postagem** | ⬜ etapa 4 |
| **Dados reais do cliente** | ⬜ etapa 5 — depende do cliente |
| **Colocar no ar de verdade** | ⬜ etapa 6 |

---

## Etapa 1 — Registro de pedido e aviso de venda

**O problema:** hoje o carrinho vive no navegador do cliente. Se ele fecha a aba, o
pedido some. Ninguém na loja fica sabendo que houve uma venda.

**A solução desta entrega:**

1. **Checkout no site** — o cliente informa nome, CPF, telefone, e-mail e endereço
   completo, escolhe o frete calculado e confirma
2. **Pedido gerado com número** — ex.: `CB-2026-0001`, mostrado na tela de confirmação
3. **E-mail para a loja** — chega com todos os dados: itens, quantidades, valores, frete
   escolhido, endereço de entrega e dados para a nota fiscal
4. **E-mail para o cliente** — confirmação com o número do pedido e o que acontece a seguir
5. **Tela de sucesso** — com o número do pedido, o resumo e a chave PIX da loja

**Pagamento nesta fase:** o cliente paga por PIX e envia o comprovante; a loja confirma.
Quando o Mercado Pago for contratado, o pagamento entra no site e essa etapa manual sai.

**Serviço de e-mail:** Resend (plano gratuito cobre 3.000 e-mails/mês, suficiente).

---

## Etapa 2 — Stack de segurança

O que entra, e por quê:

| Item | Protege de |
|---|---|
| Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, Referrer-Policy) | Injeção de script, clickjacking, vazamento de referência |
| Rate limit nas rotas de API | Alguém martelar a cotação de frete e estourar a cota da loja |
| Validação de entrada em toda rota | Dado malformado derrubando o site ou vazando erro interno |
| Honeypot + limite de envio no checkout | Robô gerando pedido falso |
| Segredos só em variável de ambiente | Token exposto no navegador ou no repositório |
| HTTPS obrigatório | Dado do cliente trafegando aberto |
| Sem dado sensível em log | Vazamento de CPF e endereço no log da hospedagem |

Nenhum segredo entra no código. Tudo em `.env`, com espelho vazio em `.env.example`.

---

## Etapa 3 — Páginas legais

Obrigatórias para comércio eletrônico no Brasil (Decreto 7.962/2013 e LGPD):

- **Política de privacidade** — que dado é coletado, para quê, por quanto tempo, como
  pedir exclusão
- **Termos de uso**
- **Política de trocas e devoluções** — inclui o direito de arrependimento de 7 dias
- **Política de entrega** — prazos, área de cobertura, o que não é enviado
- **Razão social, CNPJ e endereço em destaque** ✅ já feito

---

## Etapa 4 — Prazos de entrega e postagem

Documento e regras no site cobrindo:

- Prazo de separação da loja (quantos dias úteis até postar)
- Prazo dos Correios por região, a partir de Anapu-PA
- Horário de corte da AC Anapu — o que define se o pacote sai no mesmo dia
- Como o prazo é apresentado ao cliente: `separação + transporte`, não só o dos Correios
- O que acontece com pedido misto (parte postada, parte para retirada)

---

## Etapa 5 — Dados reais do cliente

Detalhado em [`O-QUE-PRECISO-DO-CLIENTE.md`](./O-QUE-PRECISO-DO-CLIENTE.md).

Resumo do que trava a entrega final:

1. Resolver o CNAE e definir o catálogo real
2. Preencher a planilha de peso e medida
3. Levar a planilha aos Correios e obter as credenciais de API
4. Fotos, preços e descrições
5. Confirmar endereço, telefone e e-mail
6. Registrar o domínio

---

## Etapa 6 — Colocar no ar

Procedimento definido, executado quando as etapas anteriores fecharem:

1. Cadastrar as variáveis de ambiente de produção na Vercel
   (`MELHORENVIO_TOKEN`, `RESEND_API_KEY`, `PEDIDOS_EMAIL_LOJA`, `FRETE_CEP_ORIGEM`)
2. Apontar o domínio próprio para a Vercel (registro.br → DNS da Vercel)
3. Trocar `NEXT_PUBLIC_DEMO` para `false` — some a faixa de aviso, some a nota do rodapé
   e o site passa a ser indexável pelo Google
4. Conferir a cotação de frete real com 3 CEPs (Anapu, Belém, São Paulo)
5. Fazer um pedido de teste ponta a ponta e confirmar que o e-mail chega
6. Publicar o `sitemap.xml` e cadastrar no Google Search Console
7. Entregar ao cliente: acessos, este plano e o manual de operação

---

## Como o cliente acompanha o que o dinheiro dele faz

O site já está publicado e é atualizado a cada etapa concluída. O cliente vê o progresso
em tempo real, sem esperar a entrega final:

**https://casa-do-boi.vercel.app**

Enquanto durar a demonstração, a faixa amarela no topo deixa claro que os dados ainda são
ilustrativos — ninguém confunde com a loja valendo.

---

Desenvolvido por [ismailepereira](https://ismailepereira.github.io/)
