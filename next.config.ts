import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

const nextConfig: NextConfig = {
  // Un sitio de seguridad aplicada no debería anunciar con qué framework está hecho.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders(process.env.NODE_ENV === "production") }];
  },

  // Se quitaron `experimental.turbo` y `compiler.reactStrictMode`: Next 16 no los reconoce
  // (avisaba "Invalid next.config.ts options") y no tenían efecto.
  experimental: {
    optimizeCss: false, // Previene conflictos con Tailwind
  },
  compiler: {
    styledComponents: false, // Desactívalo si no usas esta librería
  },
  // Forzar transpilación de Tailwind (solución a errores SSR)
  transpilePackages: ["tailwindcss"],
};

export default nextConfig;
