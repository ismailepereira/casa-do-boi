import Link from "next/link";
import { Botao } from "@/components/ui/Botao";

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="font-titulo text-7xl leading-none text-verde-200">404</p>
      <h1 className="text-3xl text-verde-900">Página não encontrada</h1>
      <p className="text-sm text-verde-800/65">
        O link que você abriu não existe mais ou o produto saiu de linha.
      </p>
      <Link href="/">
        <Botao tamanho="lg">Voltar para a loja</Botao>
      </Link>
    </div>
  );
}
