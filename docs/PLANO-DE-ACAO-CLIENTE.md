# Loja online da Casa do Boi FOS
## Plano de ação — o que já está pronto e o que falta

**Ver funcionando agora:** https://casa-do-boi.vercel.app

> A faixa amarela no topo do site avisa que os dados ainda são de demonstração.
> Ela some no dia em que a loja entrar no ar de verdade.

---

## O que o dinheiro já construiu

Não é maquete: é a loja funcionando, publicada na internet, que o senhor pode abrir do
celular agora e navegar.

### A loja
- **Catálogo completo** com departamentos, busca e carrinho que não se perde se o cliente
  fechar o navegador
- **Página de produto no padrão dos grandes** — galeria de fotos, preço, parcelamento,
  ficha técnica completa e produtos relacionados
- **Funciona no celular**, que é de onde vem a maior parte das vendas

### O frete, que é o coração da operação
- **Cálculo automático por CEP**: o cliente digita o CEP e vê preço e prazo antes de comprar
- **Peso e medida de cada produto** já cadastrados, com o cálculo de cubagem dos Correios
- **O que os Correios não aceitam é bloqueado automaticamente** — saco de 30 kg, rolo de
  arame, adubo e vacina aparecem como "retirada na loja", com o motivo explicado. Assim
  ninguém compra achando que vai receber em casa

### A venda
- **Checkout completo**: o cliente informa os dados, escolhe o frete e confirma
- **Número de pedido** na tela, para ele guardar
- **E-mail chega na loja** com tudo pronto para faturar: itens, valores, endereço e o CPF
  para a nota fiscal
- **E-mail de confirmação para o cliente**, com a chave PIX
- **Página de acompanhamento** de entrega pelo código dos Correios

### A parte que ninguém vê, mas protege o negócio
- **O preço vem sempre do servidor.** Se alguém tentar alterar o valor no navegador para
  comprar uma motosserra por R$ 1, o sistema ignora e cobra o preço certo. Isso foi testado
- **Limite de tentativas** por visitante, para robô não gerar pedido falso em massa
- **CPF e CNPJ conferidos** com dígito verificador, para não emitir nota com documento errado
- **Site em HTTPS** com as proteções de segurança padrão do mercado
- **Nenhuma senha ou dado de cartão** passa pelo site

### O que a lei exige, e já está no ar
- Razão social, CNPJ e endereço em destaque (Decreto 7.962/2013)
- Política de privacidade conforme a LGPD
- Termos de uso
- Política de trocas e devoluções, com o direito de arrependimento de 7 dias
- Página de prazos e formas de entrega

---

## O que falta — e depende do senhor

Cada item abaixo destrava uma parte da loja. Enquanto não vier, aquela parte continua com
dado de exemplo.

### 1. Definir o catálogo real
O CNPJ está registrado como **fabricação de alimentos para animais**, com atacado e linha
pet. A loja de demonstração está com motosserra, sela e arame — coisas que não aparecem no
registro.

**Precisa decidir:** ou atualizamos o CNAE, ou refazemos o catálogo com o que a loja
realmente vende. Vender fora do CNAE dá problema na hora de emitir a nota.

### 2. Pesar e medir os produtos
Entrego uma planilha com todos os produtos. É só preencher, para cada um:
- **peso do produto embalado**, na balança
- **medidas da caixa fechada**, com fita métrica

Essa planilha tem dois destinos: alimentar o site e **ser levada aos Correios** — é ela que
define a faixa de desconto no contrato.

> Sem isso o frete não fecha. Se um produto for cadastrado com peso a menos, a loja cobra
> menos do que paga — em toda venda daquele item.

### 3. Contrato com os Correios
Desde 2023 os Correios só liberam o cálculo de frete para quem tem contrato.
Dois caminhos, o senhor escolhe:
- **Contrato direto** na agência de Anapu (Av. Getúlio Vargas, 74) — melhor se o volume for alto
- **Melhor Envio** — grátis, sem mensalidade, começa hoje mesmo

### 4. Fotos e preços
Uma foto por produto, no mínimo, com fundo claro. Foto de celular serve. Mais os preços de
venda confirmados.

### 5. Confirmar os dados da loja
Endereço com número, telefone, WhatsApp, e-mail e horário de funcionamento.

### 6. Domínio próprio
Sugestão: `casadoboifos.com.br`, cerca de R$ 40 por ano.

---

## Ordem de execução

| | Etapa | Quem faz | Destrava |
|---|---|---|---|
| 1 | Definir o catálogo real e resolver o CNAE | Cliente | Todo o resto |
| 2 | Pesar e medir os produtos | Cliente | Frete e contrato |
| 3 | Levar a planilha aos Correios | Cliente | Frete real na tela |
| 4 | Enviar fotos e preços | Cliente | Loja apresentável |
| 5 | Cadastrar catálogo e ligar o frete real | Desenvolvedor | Loja vendendo |
| 6 | Registrar domínio e publicar | Os dois | Loja no ar |
| 7 | Pedido de teste ponta a ponta | Os dois | Entrega concluída |

---

## Custos mensais da operação

Para não haver surpresa depois:

| Item | Custo |
|---|---|
| Domínio `.com.br` | ~R$ 40 por ano |
| Hospedagem do site | Grátis no começo |
| Envio dos e-mails de pedido | Grátis até 3.000 por mês |
| Melhor Envio | Sem mensalidade — paga por envio |
| **Total no início** | **praticamente zero** |

---

## O que fica para uma etapa seguinte

Estas funções não fazem parte desta entrega. Podem ser contratadas quando a loja estiver
rodando e o senhor quiser crescer:

- **Pagamento online** (PIX e cartão direto no site, sem cobrança manual)
- **Painel administrativo** para cadastrar produto e preço sem depender do desenvolvedor
- **Venda no Mercado Livre e na Amazon** com o mesmo catálogo
- **Entrega por transportadora** para o que os Correios não levam
- **Emissão automática de nota fiscal**

---

## Como acompanhar

O site é atualizado a cada etapa concluída, no mesmo endereço. O senhor não precisa esperar
o final para ver o que está sendo feito:

**https://casa-do-boi.vercel.app**

---

Desenvolvido por [ismailepereira](https://ismailepereira.github.io/)
