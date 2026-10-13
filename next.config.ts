import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

// El sitio se exporta como archivos estáticos (`out/`, sin servidor) cuando:
// - se define NEXT_PUBLIC_STATIC_EXPORT=1 (Netlify, Cloudflare Pages, pruebas locales), o
// - el build corre en Cloudflare Workers Builds, que define WORKERS_CI=1 (no hace falta configurar nada en el panel).
// En cualquier otro caso (Vercel) el sitio se construye igual que antes.
const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" || process.env.WORKERS_CI === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, images: { unoptimized: true } } : {}),

  // Next reemplaza `process.env.STATIC_EXPORT` por su valor durante el build, tanto en el servidor como en el
  // navegador: así el código de la app (lib/site-url.ts) ve exactamente lo que se decidió acá.
  env: { STATIC_EXPORT: staticExport ? "1" : "0" },

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
