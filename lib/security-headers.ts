/**
 * Headers de seguridad del propio sitio. Un portfolio de seguridad aplicada tiene que pasar los
 * chequeos que ofrece: se pueden verificar con https://web-vulnerability-scanner-red.vercel.app.
 */

export interface HeaderEntry {
  key: string;
  value: string;
}

/**
 * Sin `scriptHashes` se permite `'unsafe-inline'` (Vercel y desarrollo). En el sitio estático el
 * post-build (scripts/csp-hashes.mjs) pasa el hash SHA-256 de cada script en línea de cada página:
 * solo corren esos scripts exactos y cualquier otro script inyectado queda bloqueado.
 */
export function contentSecurityPolicy(scriptHashes?: readonly string[]): string {
  const scriptSrc = scriptHashes
    ? ["'self'", ...scriptHashes.map((h) => `'${h}'`)].join(" ")
    : "'self' 'unsafe-inline'";
  return [
    "default-src 'self'",
    // Next.js y next-themes insertan scripts en línea (hidratación y tema inicial). Con nonce habría
    // que renderizar todas las páginas de forma dinámica; en un sitio estático se usan hashes.
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    // Vercel Web Analytics envía las métricas al mismo origen (/_vercel/insights).
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

/**
 * En desarrollo no se aplica la CSP: React Refresh necesita `eval`, que una CSP estricta bloquea.
 */
export function securityHeaders(production: boolean): HeaderEntry[] {
  const headers: HeaderEntry[] = [
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
    // Aíslan el sitio de otras ventanas y de incrustaciones de otros orígenes (no usa popups ni se incrusta en ningún lado).
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  ];
  if (production) headers.unshift({ key: "Content-Security-Policy", value: contentSecurityPolicy() });
  return headers;
}
