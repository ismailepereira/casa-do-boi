/**
 * Validações do checkout.
 *
 * Rodam no navegador para avisar cedo e **de novo no servidor**, porque
 * validação de cliente é conveniência, não segurança — qualquer um pode
 * chamar a rota direto.
 */

export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/** CPF com dígitos verificadores conferidos. */
export function cpfValido(entrada: string): boolean {
  const cpf = apenasDigitos(entrada);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  for (const [tamanho, posicao] of [
    [9, 10],
    [10, 11],
  ] as const) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(cpf[i]) * (posicao - i);
    const resto = (soma * 10) % 11 % 10;
    if (resto !== Number(cpf[tamanho])) return false;
  }
  return true;
}

/** CNPJ com dígitos verificadores conferidos. */
export function cnpjValido(entrada: string): boolean {
  const cnpj = apenasDigitos(entrada);
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  const calcular = (tamanho: number) => {
    let soma = 0;
    let peso = tamanho - 7;
    for (let i = 0; i < tamanho; i++) {
      soma += Number(cnpj[i]) * peso;
      peso = peso - 1 < 2 ? 9 : peso - 1;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  return calcular(12) === Number(cnpj[12]) && calcular(13) === Number(cnpj[13]);
}

/** Aceita CPF ou CNPJ — a loja vende para produtor pessoa física e para fazenda. */
export function documentoValido(entrada: string): boolean {
  const d = apenasDigitos(entrada);
  if (d.length === 11) return cpfValido(d);
  if (d.length === 14) return cnpjValido(d);
  return false;
}

export function cepValido(entrada: string): boolean {
  return apenasDigitos(entrada).length === 8;
}

export function emailValido(entrada: string): boolean {
  const e = entrada.trim();
  return e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}

/** Fixo (10) ou celular (11 dígitos). */
export function telefoneValido(entrada: string): boolean {
  const t = apenasDigitos(entrada);
  return t.length === 10 || t.length === 11;
}

export function nomeValido(entrada: string): boolean {
  const n = entrada.trim();
  return n.length >= 5 && n.length <= 120 && n.includes(" ");
}

// ── Máscaras de digitação ────────────────────────────────────────────

export function mascararCep(valor: string): string {
  const d = apenasDigitos(valor).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

export function mascararDocumento(valor: string): string {
  const d = apenasDigitos(valor).slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export function mascararTelefone(valor: string): string {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

/** Corta e limpa texto que veio de formulário antes de virar e-mail. */
export function limparTexto(valor: unknown, maximo: number): string {
  return String(valor ?? "")
    // Tira caracteres de controle, que quebram cabecalho e corpo de e-mail.
    .replace(/\p{Cc}/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maximo);
}
