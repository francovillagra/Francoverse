/**
 * URL pública del sitio. Para migrar de dominio sin tocar el código, definí
 * NEXT_PUBLIC_SITE_URL en el hosting (por ejemplo, https://tudominio.com).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://francoverse.fvillagra-dev.workers.dev").replace(/\/$/, "");

/**
 * true cuando el build genera un sitio 100 % estático (carpeta `out/`) para alojarlo en Cloudflare, Netlify u
 * otro hosting de archivos. Lo decide next.config.ts (NEXT_PUBLIC_STATIC_EXPORT=1, o WORKERS_CI=1 en Cloudflare).
 * En ese modo no hay servidor: las cabeceras salen de `public/_headers` y no se carga la analítica de Vercel.
 */
export const STATIC_EXPORT = process.env.STATIC_EXPORT === "1";
