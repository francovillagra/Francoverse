/**
 * Headers de seguridad del propio sitio. Un portfolio de seguridad aplicada tiene que pasar los
 * chequeos que ofrece: se pueden verificar con https://web-vulnerability-scanner-red.vercel.app.
 */

export interface HeaderEntry {
  key: string;
  value: string;
}

export function contentSecurityPolicy(): string {
  return [
    "default-src 'self'",
    // Next.js y next-themes insertan scripts en línea (hidratación y tema inicial); una CSP con
    // nonce exigiría renderizar todas las páginas de forma dinámica. Pendiente de mejorar.
    "script-src 'self' 'unsafe-inline'",
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
  ];
  if (production) headers.unshift({ key: "Content-Security-Policy", value: contentSecurityPolicy() });
  return headers;
}
