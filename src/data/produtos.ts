import type { Produto } from "@/types";

/**
 * Catálogo da fase visual.
 *
 * ATENÇÃO: preços, códigos e especificações abaixo são PROVISÓRIOS, usados só
 * para dar volume às telas. O cliente precisa validar tudo antes de ir ao ar.
 * Na fase 2 este arquivo é substituído pela consulta ao banco — os componentes
 * consomem o tipo `Produto`, então nenhuma tela muda.
 *
 * Fotos: os 6 itens STIHL têm foto real; o restante usa o placeholder.
 */

const SEM_FOTO = "/produtos/placeholder.svg";

export const PRODUTOS: Produto[] = [
  // ── Máquinas e Ferramentas ─────────────────────────────────────────
  {
    slug: "motosserra-stihl-ms-172",
    nome: "Motosserra STIHL MS 172 Light 16 polegadas",
    marca: "STIHL",
    categoria: "maquinas-e-ferramentas",
    preco: 2199.0,
    precoDe: 2549.0,
    imagem: "/produtos/motosserra-ms-172.png",
    descricao:
      "Motosserra leve e equilibrada para poda, corte de lenha e serviços gerais na propriedade. Partida facilitada e tensionamento de corrente sem ferramenta.",
    especificacoes: [
      { rotulo: "Cilindrada", valor: "31,8 cm³" },
      { rotulo: "Potência", valor: "1,3 kW" },
      { rotulo: "Sabre", valor: "16 polegadas" },
      { rotulo: "Peso", valor: "4,1 kg" },
      { rotulo: "Combustível", valor: "Mistura 2 tempos 1:50" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 6.5,
      comprimentoCm: 46,
      larguraCm: 30,
      alturaCm: 27,
      modalidade: "correios",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "rocadeira-stihl-fs-120",
    nome: "Roçadeira Lateral STIHL FS 120",
    marca: "STIHL",
    categoria: "maquinas-e-ferramentas",
    preco: 3890.0,
    imagem: "/produtos/rocadeira-fs-120.webp",
    descricao:
      "Roçadeira profissional para pasto alto e capineira. Guidão duplo, cinto de apoio e faca de 3 pontas — feita para o serviço pesado do dia inteiro.",
    especificacoes: [
      { rotulo: "Cilindrada", valor: "30,8 cm³" },
      { rotulo: "Potência", valor: "1,3 kW" },
      { rotulo: "Peso", valor: "6,3 kg" },
      { rotulo: "Acessório", valor: "Faca 3 pontas + carretel" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 9.5,
      comprimentoCm: 180,
      larguraCm: 30,
      alturaCm: 25,
      modalidade: "retirada",
      observacao:
        "Caixa de 180 cm: excede o lado máximo de 100 cm dos Correios. Somente retirada na loja.",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "lavadora-alta-pressao-stihl-re-90",
    nome: "Lavadora de Alta Pressão STIHL RE 90",
    marca: "STIHL",
    categoria: "maquinas-e-ferramentas",
    preco: 1199.0,
    precoDe: 1399.0,
    imagem: "/produtos/lavadora-re-90.webp",
    descricao:
      "Compacta e com rodas para levar até o curral. Ideal para lavar trator, implemento, baia e piso de ordenha.",
    especificacoes: [
      { rotulo: "Pressão", valor: "100 bar" },
      { rotulo: "Vazão", valor: "440 L/h" },
      { rotulo: "Mangueira", valor: "6 metros" },
      { rotulo: "Tensão", valor: "127 V" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 11.5,
      comprimentoCm: 40,
      larguraCm: 35,
      alturaCm: 85,
      modalidade: "correios",
      observacao:
        "Lado de 85 cm: paga taxa de grande formato (acima de 70 cm).",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "soprador-bateria-stihl-bga-60",
    nome: "Soprador a Bateria STIHL BGA 60",
    marca: "STIHL",
    categoria: "maquinas-e-ferramentas",
    preco: 1690.0,
    imagem: "/produtos/soprador-bga-60.png",
    descricao:
      "Sopra folha, poeira e resíduo sem barulho de motor e sem combustível. Bateria e carregador vendidos à parte.",
    especificacoes: [
      { rotulo: "Alimentação", valor: "Bateria 36 V" },
      { rotulo: "Vazão de ar", valor: "560 m³/h" },
      { rotulo: "Peso", valor: "2,4 kg sem bateria" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 3.5,
      comprimentoCm: 55,
      larguraCm: 28,
      alturaCm: 30,
      modalidade: "correios",
    },
    emEstoque: true,
  },
  {
    slug: "oleo-2-tempos-stihl-8017h-500ml",
    nome: "Óleo 2 Tempos STIHL Castrol 8017H 500 ml",
    marca: "STIHL",
    categoria: "maquinas-e-ferramentas",
    preco: 79.9,
    imagem: "/produtos/oleo-2t-8017h.png",
    descricao:
      "Lubrificante desenvolvido pela Castrol para as ferramentas motorizadas STIHL. Rende 25 litros de mistura na proporção 1:50.",
    especificacoes: [
      { rotulo: "Volume", valor: "500 ml" },
      { rotulo: "Proporção", valor: "1:50" },
      { rotulo: "Rendimento", valor: "25 litros de mistura" },
    ],
    unidade: "frasco",
    logistica: {
      pesoKg: 0.6,
      comprimentoCm: 20,
      larguraCm: 10,
      alturaCm: 8,
      modalidade: "correios",
      observacao:
        "Líquido: exigir embalagem com absorvente e lacre.",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "frasco-misturador-stihl-1l",
    nome: "Frasco Misturador STIHL 1 Litro",
    marca: "STIHL",
    categoria: "maquinas-e-ferramentas",
    preco: 59.9,
    imagem: "/produtos/frasco-misturador.webp",
    descricao:
      "Frasco graduado com bico dosador para preparar a mistura de gasolina e óleo na proporção certa, sem desperdício.",
    especificacoes: [
      { rotulo: "Capacidade", valor: "1 litro" },
      { rotulo: "Graduação", valor: "1:50 e 1:25" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 0.25,
      comprimentoCm: 28,
      larguraCm: 12,
      alturaCm: 10,
      modalidade: "correios",
    },
    emEstoque: true,
  },
  {
    slug: "corrente-motosserra-16-polegadas",
    nome: "Corrente para Motosserra 16 polegadas — 55 elos",
    marca: "STIHL",
    categoria: "maquinas-e-ferramentas",
    preco: 189.9,
    imagem: SEM_FOTO,
    descricao:
      "Corrente sobressalente para sabre de 16 polegadas. Tenha sempre uma reserva na propriedade.",
    especificacoes: [
      { rotulo: "Passo", valor: "3/8 polegada" },
      { rotulo: "Elos", valor: "55" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 0.75,
      comprimentoCm: 20,
      larguraCm: 15,
      alturaCm: 5,
      modalidade: "correios",
    },
    emEstoque: true,
  },
  {
    slug: "pulverizador-costal-20l",
    nome: "Pulverizador Costal Manual 20 Litros",
    marca: "Guarany",
    categoria: "maquinas-e-ferramentas",
    preco: 329.9,
    precoDe: 389.9,
    imagem: SEM_FOTO,
    descricao:
      "Pulverizador costal com alça acolchoada e bico regulável para herbicida, inseticida e foliar.",
    especificacoes: [
      { rotulo: "Capacidade", valor: "20 litros" },
      { rotulo: "Bicos", valor: "Leque e cone" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 5.0,
      comprimentoCm: 60,
      larguraCm: 45,
      alturaCm: 25,
      modalidade: "correios",
      observacao:
        "Peso cubado (11,3 kg) manda no frete, não o peso real.",
    },
    emEstoque: true,
  },

  // ── Suplemento e Ração ─────────────────────────────────────────────
  {
    slug: "sal-mineral-boi-fos-70-30kg",
    nome: "Sal Mineral Boi FOS 70 — Saco 30 kg",
    marca: "Boi FOS",
    categoria: "suplemento-e-racao",
    preco: 149.9,
    precoDe: 169.9,
    imagem: SEM_FOTO,
    descricao:
      "Suplemento mineral com 70 g de fósforo por quilo, para bovinos de corte em pastagem. Mistura completa com cálcio, zinco, cobre e selênio.",
    especificacoes: [
      { rotulo: "Fósforo", valor: "70 g/kg" },
      { rotulo: "Cálcio", valor: "130 a 160 g/kg" },
      { rotulo: "Consumo", valor: "80 a 100 g/animal/dia" },
      { rotulo: "Embalagem", valor: "Saco de 30 kg" },
    ],
    unidade: "saco 30 kg",
    logistica: {
      pesoKg: 30.5,
      comprimentoCm: 60,
      larguraCm: 40,
      alturaCm: 18,
      modalidade: "retirada",
      observacao:
        "Saco de 30 kg estoura o limite de 30 kg dos Correios. Somente retirada na loja.",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "sal-mineral-boi-fos-90-30kg",
    nome: "Sal Mineral Boi FOS 90 Reprodução — Saco 30 kg",
    marca: "Boi FOS",
    categoria: "suplemento-e-racao",
    preco: 189.9,
    imagem: SEM_FOTO,
    descricao:
      "Formulação reforçada em fósforo e microminerais para matrizes em reprodução e touros em estação de monta.",
    especificacoes: [
      { rotulo: "Fósforo", valor: "90 g/kg" },
      { rotulo: "Indicação", valor: "Matrizes e reprodutores" },
      { rotulo: "Embalagem", valor: "Saco de 30 kg" },
    ],
    unidade: "saco 30 kg",
    logistica: {
      pesoKg: 30.5,
      comprimentoCm: 60,
      larguraCm: 40,
      alturaCm: 18,
      modalidade: "retirada",
      observacao:
        "Saco de 30 kg estoura o limite de 30 kg dos Correios. Somente retirada na loja.",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "nucleo-proteico-seca-25kg",
    nome: "Núcleo Proteico Energético Seca — Saco 25 kg",
    marca: "Boi FOS",
    categoria: "suplemento-e-racao",
    preco: 174.9,
    imagem: SEM_FOTO,
    descricao:
      "Suplemento proteico-energético para manter o ganho de peso durante a seca, quando o pasto perde valor nutritivo.",
    especificacoes: [
      { rotulo: "Proteína bruta", valor: "40%" },
      { rotulo: "Consumo", valor: "0,3% do peso vivo" },
      { rotulo: "Embalagem", valor: "Saco de 25 kg" },
    ],
    unidade: "saco 25 kg",
    logistica: {
      pesoKg: 25.5,
      comprimentoCm: 60,
      larguraCm: 40,
      alturaCm: 15,
      modalidade: "retirada",
      observacao:
        "Saco pesado: o frete pelos Correios inviabiliza o preço. Somente retirada na loja.",
    },
    emEstoque: true,
  },
  {
    slug: "racao-bezerro-inicial-40kg",
    nome: "Ração Bezerro Inicial 18% — Saco 40 kg",
    marca: "Nutriboi",
    categoria: "suplemento-e-racao",
    preco: 132.0,
    imagem: SEM_FOTO,
    descricao:
      "Ração peletizada para bezerro em aleitamento e desmama, com alta palatabilidade.",
    especificacoes: [
      { rotulo: "Proteína bruta", valor: "18%" },
      { rotulo: "Forma", valor: "Peletizada" },
      { rotulo: "Embalagem", valor: "Saco de 40 kg" },
    ],
    unidade: "saco 40 kg",
    logistica: {
      pesoKg: 40.5,
      comprimentoCm: 70,
      larguraCm: 45,
      alturaCm: 20,
      modalidade: "retirada",
      observacao:
        "40 kg: acima do limite dos Correios. Somente retirada na loja.",
    },
    emEstoque: true,
  },
  {
    slug: "sal-branco-25kg",
    nome: "Sal Branco Grosso Pecuário — Saco 25 kg",
    marca: "Cimsal",
    categoria: "suplemento-e-racao",
    preco: 42.9,
    imagem: SEM_FOTO,
    descricao:
      "Cloreto de sódio para mistura com núcleo mineral ou fornecimento direto no cocho.",
    especificacoes: [
      { rotulo: "Pureza", valor: "Mínimo 98% NaCl" },
      { rotulo: "Embalagem", valor: "Saco de 25 kg" },
    ],
    unidade: "saco 25 kg",
    logistica: {
      pesoKg: 25.5,
      comprimentoCm: 55,
      larguraCm: 38,
      alturaCm: 15,
      modalidade: "retirada",
      observacao:
        "Saco pesado: o frete pelos Correios inviabiliza o preço. Somente retirada na loja.",
    },
    emEstoque: true,
  },
  {
    slug: "cocho-plastico-500l",
    nome: "Cocho Plástico para Sal 500 Litros",
    marca: "Fortlev",
    categoria: "suplemento-e-racao",
    preco: 1290.0,
    imagem: SEM_FOTO,
    descricao:
      "Cocho coberto em polietileno com proteção UV, para sal mineral a céu aberto.",
    especificacoes: [
      { rotulo: "Capacidade", valor: "500 litros" },
      { rotulo: "Material", valor: "Polietileno com proteção UV" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 45.0,
      comprimentoCm: 200,
      larguraCm: 120,
      alturaCm: 90,
      modalidade: "retirada",
      observacao:
        "Volume grande demais para os Correios. Somente retirada na loja.",
    },
    emEstoque: true,
    somenteOrcamento: true,
  },

  // ── Veterinário ────────────────────────────────────────────────────
  {
    slug: "vermifugo-injetavel-ivermectina-500ml",
    nome: "Vermífugo Injetável Ivermectina 1% — 500 ml",
    marca: "Ourofino",
    categoria: "veterinario",
    preco: 219.9,
    precoDe: 249.9,
    imagem: SEM_FOTO,
    descricao:
      "Endectocida de amplo espectro contra verminose, berne, carrapato e sarna em bovinos.",
    especificacoes: [
      { rotulo: "Princípio ativo", valor: "Ivermectina 1%" },
      { rotulo: "Dose", valor: "1 ml para cada 50 kg" },
      { rotulo: "Volume", valor: "500 ml" },
      { rotulo: "Carência", valor: "Consultar bula" },
    ],
    unidade: "frasco",
    logistica: {
      pesoKg: 0.7,
      comprimentoCm: 22,
      larguraCm: 10,
      alturaCm: 10,
      modalidade: "correios",
      observacao:
        "Medicamento veterinário: confirmar aceitação e declarar conteúdo.",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "carrapaticida-pour-on-1l",
    nome: "Carrapaticida Pour-On — 1 Litro",
    marca: "MSD",
    categoria: "veterinario",
    preco: 289.9,
    imagem: SEM_FOTO,
    descricao:
      "Aplicação no dorso, sem necessidade de banho ou contenção prolongada. Ação contra carrapato e mosca-do-chifre.",
    especificacoes: [
      { rotulo: "Aplicação", valor: "Pour-on (dorsal)" },
      { rotulo: "Volume", valor: "1 litro" },
    ],
    unidade: "frasco",
    logistica: {
      pesoKg: 1.25,
      comprimentoCm: 26,
      larguraCm: 12,
      alturaCm: 12,
      modalidade: "correios",
      observacao:
        "Medicamento veterinário: confirmar aceitação e declarar conteúdo.",
    },
    emEstoque: true,
  },
  {
    slug: "vacina-aftosa-50-doses",
    nome: "Vacina Contra Febre Aftosa — 50 doses",
    marca: "Biogénesis",
    categoria: "veterinario",
    preco: 279.9,
    imagem: SEM_FOTO,
    descricao:
      "Vacina oleosa para bovinos e bubalinos, dentro do calendário oficial. Transporte refrigerado — retirada na loja.",
    especificacoes: [
      { rotulo: "Doses", valor: "50" },
      { rotulo: "Conservação", valor: "2 °C a 8 °C" },
      { rotulo: "Entrega", valor: "Somente retirada na loja" },
    ],
    unidade: "frasco",
    logistica: {
      pesoKg: 1.5,
      comprimentoCm: 25,
      larguraCm: 20,
      alturaCm: 20,
      modalidade: "retirada",
      observacao:
        "Cadeia fria de 2 °C a 8 °C: não pode ser postada.",
    },
    emEstoque: true,
    somenteOrcamento: true,
  },
  {
    slug: "seringa-veterinaria-50ml",
    nome: "Seringa Veterinária Automática 50 ml",
    marca: "Ideal",
    categoria: "veterinario",
    preco: 289.0,
    imagem: SEM_FOTO,
    descricao:
      "Seringa de dosagem regulável em metal e vidro, para vacinação e vermifugação de lote.",
    especificacoes: [
      { rotulo: "Capacidade", valor: "50 ml" },
      { rotulo: "Dosagem", valor: "Regulável" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 0.55,
      comprimentoCm: 32,
      larguraCm: 12,
      alturaCm: 8,
      modalidade: "correios",
    },
    emEstoque: true,
  },
  {
    slug: "vitamina-ade-injetavel-500ml",
    nome: "Vitamina ADE Injetável — 500 ml",
    marca: "Vallée",
    categoria: "veterinario",
    preco: 159.9,
    imagem: SEM_FOTO,
    descricao:
      "Suporte vitamínico para animais em recuperação, pós-parto e período de estresse nutricional.",
    especificacoes: [
      { rotulo: "Vitaminas", valor: "A, D3 e E" },
      { rotulo: "Volume", valor: "500 ml" },
    ],
    unidade: "frasco",
    logistica: {
      pesoKg: 0.7,
      comprimentoCm: 22,
      larguraCm: 10,
      alturaCm: 10,
      modalidade: "correios",
      observacao:
        "Medicamento veterinário: confirmar aceitação e declarar conteúdo.",
    },
    emEstoque: false,
  },

  // ── Cerca e Insumos ────────────────────────────────────────────────
  {
    slug: "arame-liso-galvanizado-1000m",
    nome: "Arame Liso Galvanizado 2,7 mm — Rolo 1.000 m",
    marca: "Gerdau",
    categoria: "cerca-e-insumos",
    preco: 649.9,
    precoDe: 719.9,
    imagem: SEM_FOTO,
    descricao:
      "Arame liso de alta resistência para cerca convencional e elétrica. Galvanizado, aguenta sol e chuva sem enferrujar.",
    especificacoes: [
      { rotulo: "Bitola", valor: "2,7 mm" },
      { rotulo: "Comprimento", valor: "1.000 metros" },
      { rotulo: "Acabamento", valor: "Galvanizado" },
    ],
    unidade: "rolo",
    logistica: {
      pesoKg: 45.0,
      comprimentoCm: 45,
      larguraCm: 45,
      alturaCm: 20,
      modalidade: "retirada",
      observacao:
        "Rolo de 45 kg: acima do limite dos Correios. Somente retirada na loja.",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "arame-farpado-500m",
    nome: "Arame Farpado 500 m",
    marca: "Morlan",
    categoria: "cerca-e-insumos",
    preco: 529.9,
    imagem: SEM_FOTO,
    descricao: "Arame farpado galvanizado para divisa e contenção de gado.",
    especificacoes: [
      { rotulo: "Comprimento", valor: "500 metros" },
      { rotulo: "Acabamento", valor: "Galvanizado" },
    ],
    unidade: "rolo",
    logistica: {
      pesoKg: 32.0,
      comprimentoCm: 40,
      larguraCm: 40,
      alturaCm: 20,
      modalidade: "retirada",
      observacao:
        "Rolo de 32 kg: acima do limite dos Correios. Somente retirada na loja.",
    },
    emEstoque: true,
  },
  {
    slug: "eletrificador-cerca-100km",
    nome: "Eletrificador de Cerca Rural 100 km",
    marca: "Zebu",
    categoria: "cerca-e-insumos",
    preco: 1149.0,
    imagem: SEM_FOTO,
    descricao:
      "Eletrificador para cerca de até 100 km de fio, com bateria interna e aviso de falha.",
    especificacoes: [
      { rotulo: "Alcance", valor: "100 km de fio" },
      { rotulo: "Alimentação", valor: "Bivolt + bateria" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 2.6,
      comprimentoCm: 30,
      larguraCm: 25,
      alturaCm: 15,
      modalidade: "correios",
    },
    emEstoque: true,
  },
  {
    slug: "semente-brachiaria-brizantha-10kg",
    nome: "Semente Brachiaria Brizantha Marandu — 10 kg",
    marca: "Wolf Seeds",
    categoria: "cerca-e-insumos",
    preco: 389.9,
    imagem: SEM_FOTO,
    descricao:
      "Semente incrustada de alto valor cultural para formação e reforma de pastagem.",
    especificacoes: [
      { rotulo: "Cultivar", valor: "Marandu" },
      { rotulo: "Embalagem", valor: "10 kg" },
    ],
    unidade: "saco 10 kg",
    logistica: {
      pesoKg: 10.3,
      comprimentoCm: 45,
      larguraCm: 30,
      alturaCm: 12,
      modalidade: "correios",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "adubo-npk-20-05-20-50kg",
    nome: "Adubo NPK 20-05-20 — Saco 50 kg",
    marca: "Mosaic",
    categoria: "cerca-e-insumos",
    preco: 209.9,
    imagem: SEM_FOTO,
    descricao: "Formulação para adubação de cobertura em pastagem já formada.",
    especificacoes: [
      { rotulo: "Formulação", valor: "20-05-20" },
      { rotulo: "Embalagem", valor: "Saco de 50 kg" },
    ],
    unidade: "saco 50 kg",
    logistica: {
      pesoKg: 50.5,
      comprimentoCm: 70,
      larguraCm: 45,
      alturaCm: 22,
      modalidade: "retirada",
      observacao:
        "50 kg: acima do limite dos Correios. Somente retirada na loja.",
    },
    emEstoque: true,
    somenteOrcamento: true,
  },

  // ── Vestuário e Selaria ────────────────────────────────────────────
  {
    slug: "bota-couro-vaqueiro",
    nome: "Bota de Couro Vaqueiro Cano Longo",
    marca: "Vimar",
    categoria: "vestuario-e-selaria",
    preco: 419.9,
    precoDe: 489.9,
    imagem: SEM_FOTO,
    descricao: "Couro legítimo, solado costurado e forro respirável. Do 37 ao 44.",
    especificacoes: [
      { rotulo: "Material", valor: "Couro legítimo" },
      { rotulo: "Numeração", valor: "37 ao 44" },
    ],
    unidade: "par",
    logistica: {
      pesoKg: 1.6,
      comprimentoCm: 35,
      larguraCm: 25,
      alturaCm: 15,
      modalidade: "correios",
    },
    emEstoque: true,
    destaque: true,
  },
  {
    slug: "chapeu-palha-country",
    nome: "Chapéu de Palha Country Aba 10 cm",
    marca: "Pralana",
    categoria: "vestuario-e-selaria",
    preco: 189.9,
    imagem: SEM_FOTO,
    descricao:
      "Palha trançada com carneira em couro e aba firme, para o serviço no sol.",
    especificacoes: [
      { rotulo: "Aba", valor: "10 cm" },
      { rotulo: "Numeração", valor: "54 ao 60" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 0.45,
      comprimentoCm: 40,
      larguraCm: 40,
      alturaCm: 20,
      modalidade: "correios",
      observacao:
        "Leve e volumoso: o frete sai pelo peso cubado (5,3 kg).",
    },
    emEstoque: true,
  },
  {
    slug: "sela-australiana-couro",
    nome: "Sela Australiana em Couro",
    marca: "Selaria Campeira",
    categoria: "vestuario-e-selaria",
    preco: 2890.0,
    imagem: SEM_FOTO,
    descricao:
      "Sela australiana em couro curtido, com bandas reforçadas e assento anatômico.",
    especificacoes: [
      { rotulo: "Material", valor: "Couro curtido" },
      { rotulo: "Assento", valor: "17 polegadas" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 12.0,
      comprimentoCm: 65,
      larguraCm: 50,
      alturaCm: 40,
      modalidade: "retirada",
      observacao:
        "A cubagem de 21,7 kg torna o frete pelos Correios inviável. Somente retirada na loja.",
    },
    emEstoque: true,
    somenteOrcamento: true,
  },
  {
    slug: "cabresto-nylon-com-cabo",
    nome: "Cabresto de Nylon com Cabo 3 m",
    marca: "Boots Horse",
    categoria: "vestuario-e-selaria",
    preco: 89.9,
    imagem: SEM_FOTO,
    descricao: "Cabresto reforçado com argolas em latão e cabo de 3 metros.",
    especificacoes: [
      { rotulo: "Cabo", valor: "3 metros" },
      { rotulo: "Material", valor: "Nylon com argolas de latão" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 0.4,
      comprimentoCm: 25,
      larguraCm: 20,
      alturaCm: 10,
      modalidade: "correios",
    },
    emEstoque: true,
  },
  {
    slug: "camisa-uv-campo-manga-longa",
    nome: "Camisa de Campo Manga Longa UV 50+",
    marca: "Country Work",
    categoria: "vestuario-e-selaria",
    preco: 129.9,
    imagem: SEM_FOTO,
    descricao:
      "Tecido leve com proteção solar UV 50+ e secagem rápida. Do P ao GG.",
    especificacoes: [
      { rotulo: "Proteção", valor: "UV 50+" },
      { rotulo: "Tamanhos", valor: "P ao GG" },
    ],
    unidade: "unidade",
    logistica: {
      pesoKg: 0.35,
      comprimentoCm: 30,
      larguraCm: 25,
      alturaCm: 5,
      modalidade: "correios",
    },
    emEstoque: true,
  },
];

export function produtoPorSlug(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug);
}

export function produtosPorCategoria(slug: string): Produto[] {
  return PRODUTOS.filter((p) => p.categoria === slug);
}

export function produtosDestaque(limite = 8): Produto[] {
  return PRODUTOS.filter((p) => p.destaque).slice(0, limite);
}

export function produtosEmOferta(limite = 8): Produto[] {
  return PRODUTOS.filter((p) => p.precoDe).slice(0, limite);
}

/** Busca simples por nome, marca e categoria — na fase 2 vira busca no banco. */
export function buscarProdutos(termo: string): Produto[] {
  const t = termo.trim().toLowerCase();
  if (!t) return [];
  return PRODUTOS.filter((p) =>
    [p.nome, p.marca, p.categoria, p.descricao].join(" ").toLowerCase().includes(t),
  );
}
