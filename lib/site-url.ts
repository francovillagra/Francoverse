/**
 * URL pública del sitio. Para migrar de dominio sin tocar el código, definí
 * NEXT_PUBLIC_SITE_URL en el hosting (por ejemplo, https://tudominio.com).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://francoverse.vercel.app").replace(/\/$/, "");

/**
 * NEXT_PUBLIC_STATIC_EXPORT=1 genera un sitio 100 % estático (carpeta `out/`) para alojarlo en
 * Cloudflare Pages, Netlify u otro hosting de archivos. En ese modo no hay servidor: las cabeceras
 * salen de `public/_headers` y no se carga la analítica de Vercel.
 */
export const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
