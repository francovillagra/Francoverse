// Post-build del sitio estático (out/): endurece la CSP sin 'unsafe-inline' para scripts.
//
// Next.js inserta scripts en línea en cada página (datos de hidratación, tema inicial). Como el sitio no
// tiene servidor, no se puede usar un nonce por request; en cambio se calcula el hash SHA-256 de cada script
// en línea de todas las páginas ya generadas y se escribe UNA sola CSP en out/_headers, en el bloque /*. El
// navegador ejecuta solo esos scripts exactos; un script inyectado (XSS) tiene otro hash y se bloquea.
//
// Por qué una sola política para todo el sitio y no una por ruta: Cloudflare combina las reglas de _headers que
// coinciden con una URL, y si más de una pone Content-Security-Policy el navegador recibe varias cabeceras y
// las aplica todas a la vez (cada script tiene que cumplirlas a la vez). La primera versión de este script
// escribía una regla por página con `! Content-Security-Policy` para quitar la genérica: funcionaba en
// `wrangler dev`, pero en producción la home recibió las dos políticas y la genérica bloqueó el script propio
// de la página (error de hidratación de React). Con una única regla no hay nada que combinar, así que el
// resultado es el mismo con cualquier regla de combinación.
// Costo: cada página admite también los scripts en línea de las demás, que son del propio sitio. Un script
// inyectado sigue sin coincidir con ninguno de esos hashes.
//
// Si algo no cierra (atributos on*, javascript:, más de una CSP en _headers, reglas de más) el build falla:
// el sitio anterior sigue publicado.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { contentSecurityPolicy } from "../lib/security-headers.ts";

const OUT = "out";
const HEADERS = join(OUT, "_headers");
const MAX_RULES = 100; // límite de Cloudflare
const MAX_LINE = 2000; // límite de Cloudflare por línea

if (!existsSync(HEADERS)) {
  console.log("csp-hashes: no hay out/_headers (build que no es de exportación estática); no se hace nada.");
  process.exit(0);
}

const fail = (msg) => {
  console.error(`csp-hashes: ${msg}`);
  process.exit(1);
};

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === "_next" ? [] : htmlFiles(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

const routeOf = (file) => {
  const rel = relative(OUT, file).split(sep).join("/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}`;
};

const JS_TYPES = new Set(["", "text/javascript", "application/javascript", "module"]);
const allHashes = new Set();
const pages = [];

for (const file of htmlFiles(OUT).sort()) {
  const html = readFileSync(file, "utf8");

  // Lo que una CSP sin 'unsafe-inline' rompería y que un hash no puede cubrir.
  if (/\son[a-z]+\s*=\s*["']/i.test(html)) fail(`${file}: tiene atributos on* en línea (onclick, etc.).`);
  if (/(href|src|action)\s*=\s*["']\s*javascript:/i.test(html)) fail(`${file}: tiene URLs javascript:.`);

  let scripts = 0;
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1];
    if (/\bsrc\s*=/i.test(attrs)) continue; // externo: lo cubre 'self'
    const type = (/\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1] ?? "").toLowerCase();
    if (!JS_TYPES.has(type)) continue; // JSON-LD y similares son datos, no se ejecutan
    allHashes.add(`sha256-${createHash("sha256").update(m[2], "utf8").digest("base64")}`);
    scripts += 1;
  }
  pages.push({ route: routeOf(file), scripts });
}

if (pages.length === 0) fail("no se encontró ninguna página HTML en out/.");

const csp = contentSecurityPolicy([...allHashes].sort());

// Se descarta lo generado por la versión anterior de este script (reglas por página con `!`), por si quedó
// en un out/ viejo, y se reemplaza la CSP del bloque /* por la que tiene los hashes.
const base = readFileSync(HEADERS, "utf8").split("\n# CSP por página")[0].trimEnd();
const cspLine = /^(\s+Content-Security-Policy\s*:).*$/im;
if (!cspLine.test(base)) fail("public/_headers no tiene la CSP genérica en el bloque /*.");
const output = `${base.replace(cspLine, (_, k) => `${k} ${csp}`)}\n`;

// Una sola CSP en todo el archivo y ninguna regla que la quite: es lo que evita que Cloudflare mande dos.
const cspCount = (output.match(/^\s+Content-Security-Policy\s*:/gim) ?? []).length;
if (cspCount !== 1) fail(`_headers define Content-Security-Policy ${cspCount} veces; tiene que ser exactamente una.`);
if (/^\s*!\s*Content-Security-Policy/im.test(output)) fail("_headers quita la CSP con `!`; no debe haber reglas que la combinen.");

const ruleCount = output.split("\n").filter((l) => l.length > 0 && !/^\s/.test(l) && !l.startsWith("#")).length;
if (ruleCount > MAX_RULES) fail(`hay ${ruleCount} reglas en _headers; el máximo de Cloudflare es ${MAX_RULES}.`);
const longest = Math.max(...output.split("\n").map((l) => l.length));
if (longest > MAX_LINE) fail(`una línea de _headers mide ${longest} caracteres; el máximo de Cloudflare es ${MAX_LINE}.`);

writeFileSync(HEADERS, output);
console.log(`csp-hashes: una sola CSP con ${allHashes.size} hashes para ${pages.length} páginas (línea más larga ${longest}).`);
for (const p of pages) console.log(`  ${p.route.padEnd(20)} ${p.scripts} scripts en línea`);
