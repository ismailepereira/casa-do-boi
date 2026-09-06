# O que preciso da Casa do Boi FOS para colocar a loja no ar

Este documento lista **tudo** que depende do cliente. Enquanto um item estiver
pendente, a parte correspondente do site fica em modo demonstração, com aviso na tela.

Nada aqui é opcional: cada item destrava uma função específica da loja.

---

## 1. Catálogo real — o mais importante

Hoje o site tem **29 produtos genéricos** que eu inventei para as telas terem conteúdo.
Preço, descrição e ficha técnica são todos provisórios.

### 1.1 O que a loja vende de verdade

O CNPJ 52.433.274/0001-78 está registrado com:

- **CNAE principal:** fabricação de alimentos para animais
- **Secundários:** atacado de alimentos para animais · atacado de cereais e farinhas com
  fracionamento · varejo de animais vivos e artigos para pets

O catálogo que montei tem motosserra, sela, arame e vacina — **nada disso aparece no
registro**. Precisamos resolver isso antes de vender:

- [ ] A loja vende esses itens? Se sim, o CNAE precisa ser atualizado (vender fora do
      CNAE gera problema na emissão da nota fiscal)
- [ ] Se não vende, me diga o que vende de verdade para eu refazer o catálogo

### 1.2 Lista de produtos

Para cada produto que vai entrar no site:

| Informação | Por que precisa |
|---|---|
| Nome comercial | Vira o título da página e o que o cliente busca |
| Marca / fabricante | Filtro e credibilidade |
| Preço de venda | Sem isso não há loja |
| Preço "de" (se houver promoção) | Mostra o selo de desconto |
| Unidade de venda | saco 30 kg, litro, par, unidade… |
| Descrição (2 a 4 linhas) | O que é, para que serve, quando usar |
| Ficha técnica | Composição, dosagem, cilindrada, numeração — o que fizer sentido |
| Tem em estoque? | Define se aparece como disponível ou sob encomenda |

### 1.3 Fotos

- [ ] Uma foto por produto, no mínimo. Fundo branco, produto centralizado
- [ ] Quanto mais fotos por produto, melhor — a página já tem galeria pronta
- Hoje só 6 itens STIHL têm foto real; o resto usa um desenho de caixa como placeholder
- Foto de celular serve, desde que com boa luz e fundo limpo

---

## 2. Peso e medida de cada produto — destrava o frete

**Esta é a parte que os Correios exigem e que só o cliente pode fornecer.**

Preparei a planilha `docs/correios-produtos-medidas.xlsx` com todos os produtos. As
células **amarelas** são as que precisam ser preenchidas:

- [ ] **Peso bruto em kg** — do produto **embalado, pronto para postar**, na balança
- [ ] **Comprimento, largura e altura em cm** — da **caixa fechada**, com fita métrica

As colunas cinzas se calculam sozinhas: soma das dimensões, peso cubado, peso taxável e
se o item cabe ou não nos Correios.

> ⚠️ **Peso a menos = prejuízo em toda venda.** Se o produto for cadastrado com 5 kg e
> pesar 7 kg, a loja cobra o frete de 5 e paga o de 7. Em toda venda daquele item.
> Os valores que estão lá hoje são estimativas minhas e **não servem para operar**.

### O que fazer com a planilha

1. Pesar e medir cada item, preencher as células amarelas
2. Levar a planilha aos Correios na abertura do contrato — é o **perfil de postagem**,
   que define a faixa de desconto da loja
3. Me devolver a planilha preenchida para eu cadastrar no site

---

## 3. Contrato com os Correios — destrava o cálculo de frete

Desde 30/09/2023 os Correios **não têm mais API aberta**. Só quem tem contrato ativo
consulta preço e prazo. Sem isso, o site não calcula frete de verdade.

Dois caminhos, o cliente escolhe um:

### Caminho A — Contrato direto com os Correios (recomendado se o volume for alto)

- [ ] Abrir contrato na agência (**AC Anapu, Av. Getúlio Vargas, 74, Centro**)
- [ ] Levar a planilha de perfil de postagem do item 2
- [ ] Obter **código administrativo**, **cartão de postagem** e as credenciais de API
- [ ] Me passar as credenciais

### Caminho B — Melhor Envio (mais rápido de começar)

- [ ] Criar conta em melhorenvio.com.br (grátis, sem mensalidade, aceita CPF ou CNPJ)
- [ ] Gerar o **token de integração** no painel
- [ ] Me passar o token

Sem contrato próprio, já sai com desconto sobre a tabela cheia. Paga por envio.

**Em qualquer um dos dois:** não existe coleta na porta em Anapu. A loja imprime a
etiqueta e leva na agência. Confirmar o **horário de corte da malha** na AC Anapu — é ele
que define se o pacote sai no mesmo dia.

---

## 4. Dados cadastrais e contato

Puxei o que dava do CNPJ, mas preciso de confirmação:

- [ ] **Endereço completo** — a Receita traz "PARÁ, S/N, Bairro Imperatriz". É Rua ou
      Avenida? Tem número ou ponto de referência?
- [ ] **CEP exato da loja** — hoje está 68365-000, que é o CEP geral de Anapu. O frete é
      calculado a partir dele
- [ ] **Telefone e WhatsApp** — a Receita traz (91) 9205-9121. É esse? O WhatsApp tem o
      9 na frente: (91) 99205-9121?
- [ ] **E-mail comercial** — para onde vão os pedidos e para o cliente responder
- [ ] **Horário de funcionamento** — está genérico no site
- [ ] **Instagram e Facebook** — os links do rodapé estão vazios

---

## 5. Regras de venda — decisões do dono

- [ ] **Frete grátis a partir de qual valor?** Está em R$ 500
- [ ] **Desconto no PIX?** Está em 5%
- [ ] **Parcelamento** — em quantas vezes sem juros? Está em 10x
- [ ] **Prazo de separação** — quantos dias úteis entre o pedido e a postagem?
- [ ] **Política de trocas e devoluções** — prazo, quem paga o frete de retorno,
      o que não é aceito de volta (produto aberto, medicamento, semente)

---

## 6. Domínio e e-mail

- [ ] **Domínio próprio** — sugestão: `casadoboifos.com.br` (~R$ 40/ano, registro.br).
      Hoje o site está em um endereço temporário da Vercel
- [ ] **E-mail no domínio** — `contato@casadoboifos.com.br` passa mais confiança que
      Gmail para receber pedido

---

## 7. Itens que os Correios não aceitam

Dos 29 produtos do catálogo de demonstração, **12 não podem ser postados**: passam de
30 kg, de 100 cm em algum lado, ou exigem refrigeração.

Esses ficam no site **para retirada na loja**, com o motivo explicado na página. A venda
com entrega por transportadora é uma etapa contratada à parte.

- [ ] O cliente concorda que esses itens fiquem só para retirada?
- [ ] Ou prefere tirá-los do site por enquanto?

---

## Resumo — a ordem que destrava mais rápido

| Ordem | O que | Destrava |
|---|---|---|
| 1 | Resolver o CNAE e definir o catálogo real | Tudo o resto |
| 2 | Preencher a planilha de peso e medida | Frete e contrato |
| 3 | Levar a planilha aos Correios / abrir Melhor Envio | Frete real na tela |
| 4 | Fotos e preços | Loja apresentável |
| 5 | Confirmar endereço, telefone e e-mail | Pedido chegando na loja |
| 6 | Registrar o domínio | Loja no ar com nome próprio |

---

Desenvolvido por [ismailepereira](https://ismailepereira.github.io/)
