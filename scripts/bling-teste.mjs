#!/usr/bin/env node
/**
 * Testa a conexão com o Bling e mostra o que vem de lá.
 *
 *   node scripts/bling-teste.mjs
 *
 * Lê as credenciais do .env.local. Serve para conferir, antes de mexer no site,
 * se o refresh_token está válido e se os produtos têm peso e dimensões — sem
 * isso o frete não é calculado e o item cai em "orçamento".
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const API = "https://api.bling.com.br/Api/v3";

function carregarEnv() {
  try {
    const texto = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const linha of texto.split("\n")) {
      const limpa = linha.trim();
      if (!limpa || limpa.startsWith("#")) continue;
      const i = limpa.indexOf("=");
      if (i === -1) continue;
      const chave = limpa.slice(0, i).trim();
      if (!process.env[chave]) process.env[chave] = limpa.slice(i + 1).trim();
    }
  } catch {
    console.error("Não encontrei o .env.local. Copie do .env.example.");
    process.exit(1);
  }
}

async function obterToken() {
  const { BLING_CLIENT_ID, BLING_CLIENT_SECRET, BLING_REFRESH_TOKEN } = process.env;

  if (!BLING_CLIENT_ID || !BLING_CLIENT_SECRET || !BLING_REFRESH_TOKEN) {
    console.error("\nFaltam credenciais no .env.local:");
    console.error("  BLING_CLIENT_ID, BLING_CLIENT_SECRET e BLING_REFRESH_TOKEN");
    console.error("\nPegue no Bling: Central de Extensões > Área do Integrador > seu app.");
    process.exit(1);
  }

  const basica = Buffer.from(`${BLING_CLIENT_ID}:${BLING_CLIENT_SECRET}`).toString("base64");
  const r = await fetch(`${API}/oauth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basica}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: BLING_REFRESH_TOKEN,
    }),
  });

  if (!r.ok) {
    console.error(`\n✗ O Bling recusou o refresh_token (HTTP ${r.status}).`);
    console.error((await r.text()).slice(0, 400));
    console.error("\nO refresh_token vale 30 dias. Se expirou, refaça a autorização.");
    process.exit(1);
  }

  const dados = await r.json();
  console.log(`✓ Autenticado. Token expira em ${Math.round(dados.expires_in / 60)} min.`);
  if (dados.refresh_token && dados.refresh_token !== BLING_REFRESH_TOKEN) {
    console.log("\n⚠ O Bling devolveu um refresh_token NOVO. Atualize no .env.local:");
    console.log(`  BLING_REFRESH_TOKEN=${dados.refresh_token}`);
  }
  return dados.access_token;
}

async function listarProdutos(token) {
  const r = await fetch(`${API}/produtos?pagina=1&limite=100&criterio=2`, {
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  });
  if (!r.ok) {
    console.error(`\n✗ Falha ao listar produtos (HTTP ${r.status}).`);
    console.error((await r.text()).slice(0, 400));
    console.error("\nConfira se o app tem o escopo de Produtos autorizado.");
    process.exit(1);
  }
  return (await r.json()).data ?? [];
}

carregarEnv();
const token = await obterToken();
const produtos = await listarProdutos(token);

console.log(`\n✓ ${produtos.length} produto(s) na primeira página.\n`);

const semMedida = [];
const categorias = new Set();

for (const p of produtos.slice(0, 15)) {
  const d = p.dimensoes ?? {};
  const peso = p.pesoBruto ?? p.pesoLiquido ?? 0;
  const completo = peso > 0 && d.largura > 0 && d.altura > 0 && d.profundidade > 0;
  if (!completo) semMedida.push(p.nome);
  if (p.categoria?.descricao) categorias.add(p.categoria.descricao);

  const medidas = completo
    ? `${peso} kg · ${d.profundidade}x${d.largura}x${d.altura} cm`
    : "SEM PESO/DIMENSÃO";
  const preco = p.preco != null ? `R$ ${Number(p.preco).toFixed(2)}` : "sem preço";
  console.log(`  ${completo ? "✓" : "✗"} ${p.nome}`);
  console.log(`     ${preco} · ${medidas} · categoria: ${p.categoria?.descricao ?? "—"}`);
}

console.log("\n─────────────────────────────────────────────");
console.log("Categorias encontradas no Bling:");
for (const c of categorias) console.log(`  • ${c}`);
console.log("\nUse esses nomes no DE_PARA_CATEGORIA de src/services/catalogo.ts.");

if (semMedida.length > 0) {
  console.log(`\n⚠ ${semMedida.length} produto(s) sem peso ou dimensão cadastrados.`);
  console.log("  Sem isso o frete não é calculado e o item cai em orçamento:");
  for (const n of semMedida.slice(0, 10)) console.log(`  • ${n}`);
}
