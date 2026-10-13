import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

// NEXT_PUBLIC_STATIC_EXPORT=1 genera `out/` (sitio estático, sin servidor) para Cloudflare Pages u otro
// hosting de archivos. Sin la variable, el sitio se construye igual que antes (Vercel).
const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, images: { unoptimized: true } } : {}),

  // Un sitio de seguridad aplicada no debería anunciar con qué framework está hecho.
  poweredByHeader: false,

  // Con `output: "export"` no hay servidor: las cabeceras salen de public/_headers (mismo contenido).
  ...(staticExport
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders(process.env.NODE_ENV === "production") }];
        },
      }),

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
