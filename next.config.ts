import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fase 2: liberar aqui o domínio do CDN/storage das fotos de produto.
    remotePatterns: [],
  },
};

export default nextConfig;
