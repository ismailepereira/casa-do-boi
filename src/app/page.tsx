import { ChamadaAtacado } from "@/components/home/ChamadaAtacado";
import { FaixaConfianca } from "@/components/home/FaixaConfianca";
import { GradeCategorias } from "@/components/home/GradeCategorias";
import { Hero } from "@/components/home/Hero";
import { Vitrine } from "@/components/home/Vitrine";
import { produtosDestaque, produtosEmOferta } from "@/services/catalogo";

export default async function PaginaInicial() {
  const [ofertas, destaques] = await Promise.all([
    produtosEmOferta(4),
    produtosDestaque(8),
  ]);

  return (
    <>
      <Hero />
      <FaixaConfianca />
      <GradeCategorias />
      <Vitrine
        titulo="Ofertas da semana"
        subtitulo="Preço reduzido enquanto durar o estoque."
        produtos={ofertas}
        fundoClaro
      />
      <Vitrine
        titulo="Os mais pedidos"
        subtitulo="O que sai todo mês na lista dos produtores da região."
        produtos={destaques}
        verMais={{ texto: "Ver todos os departamentos", href: "/categoria/maquinas-e-ferramentas" }}
      />
      <ChamadaAtacado />
    </>
  );
}
