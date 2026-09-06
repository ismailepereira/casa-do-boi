import type { NextConfig } from "next";

/**
 * Cabeçalhos de segurança.
 *
 * A loja recebe nome, CPF, telefone e endereço do cliente. Estes cabeçalhos
 * fecham as portas mais comuns: injeção de script, clickjacking, downgrade de
 * HTTPS e vazamento da página de origem para terceiros.
 */
const cabecalhosSeguranca = [
  {
    // Sem `unsafe-eval`. O `unsafe-inline` em script é exigido pelo Next para
    // hidratar a página; o restante fica restrito à própria origem.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      // Cotação de CEP e frete saem do servidor; do navegador, só a própria API.
      "connect-src 'self' https://brasilapi.com.br",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Fase futura: liberar aqui o domínio do CDN das fotos de produto.
    remotePatterns: [],
  },

  async headers() {
    return [
      { source: "/:path*", headers: cabecalhosSeguranca },
      {
        // Rota de pedido nunca pode ser cacheada por proxy: leva dado pessoal.
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
};

export default nextConfig;
