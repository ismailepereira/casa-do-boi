import { ChamadaAtacado } from "@/components/home/ChamadaAtacado";
import { FaixaConfianca } from "@/components/home/FaixaConfianca";
import { GradeCategorias } from "@/components/home/GradeCategorias";
import { Hero } from "@/components/home/Hero";
import { Vitrine } from "@/components/home/Vitrine";
import { produtosDestaque, produtosEmOferta } from "@/data/produtos";

export default function PaginaInicial() {
  return (
    <>
      <Hero />
      <FaixaConfianca />
      <GradeCategorias />
      <Vitrine
        titulo="Ofertas da semana"
        subtitulo="Preço reduzido enquanto durar o estoque."
        produtos={produtosEmOferta(4)}
        fundoClaro
      />
      <Vitrine
        titulo="Os mais pedidos"
        subtitulo="O que sai todo mês na lista dos produtores da região."
        produtos={produtosDestaque(8)}
        verMais={{ texto: "Ver todos os departamentos", href: "/categoria/maquinas-e-ferramentas" }}
      />
      <ChamadaAtacado />
    </>
  );
}
