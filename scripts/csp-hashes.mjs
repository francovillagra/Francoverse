// Post-build del sitio estático (out/): endurece la CSP sin 'unsafe-inline' para scripts.
//
// Next.js inserta scripts en línea en cada página (datos de hidratación, tema inicial). Como el sitio no
// tiene servidor, no se puede usar un nonce por request; en cambio se calcula el hash SHA-256 de cada script
// en línea de cada página ya generada y se escribe una CSP por ruta en out/_headers. El navegador ejecuta
// solo esos scripts exactos; un script inyectado (XSS) tiene otro hash y se bloquea.
//
// Si algo no cierra (atributos on*, javascript:, reglas de más) el build falla: el sitio anterior sigue publicado.
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
const rules = [];

for (const file of htmlFiles(OUT).sort()) {
  const html = readFileSync(file, "utf8");

  // Lo que una CSP sin 'unsafe-inline' rompería y que un hash no puede cubrir.
  if (/\son[a-z]+\s*=\s*["']/i.test(html)) fail(`${file}: tiene atributos on* en línea (onclick, etc.).`);
  if (/(href|src|action)\s*=\s*["']\s*javascript:/i.test(html)) fail(`${file}: tiene URLs javascript:.`);

  const hashes = new Set();
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1];
    if (/\bsrc\s*=/i.test(attrs)) continue; // externo: lo cubre 'self'
    const type = (/\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1] ?? "").toLowerCase();
    if (!JS_TYPES.has(type)) continue; // JSON-LD y similares son datos, no se ejecutan
    hashes.add(`sha256-${createHash("sha256").update(m[2], "utf8").digest("base64")}`);
  }
  rules.push({ route: routeOf(file), csp: contentSecurityPolicy([...hashes]), scripts: hashes.size });
}

if (rules.length === 0) fail("no se encontró ninguna página HTML en out/.");

// La página 404 es la que Cloudflare sirve para cualquier URL inexistente. Su CSP (con los hashes de sus
// scripts) pasa a ser la CSP de todo el sitio en el bloque /*, así lo que no tiene regla propia también queda
// protegido. Cada página con scripts distintos reemplaza esa CSP por la suya: `! Content-Security-Policy` la
// quita y la línea siguiente pone la nueva (si no, Cloudflare mandaría las dos cabeceras y valdrían ambas a la
// vez). Se probó con el runtime local de Workers (wrangler dev).
const notFound = rules.find((r) => r.route === "/404");
const baseCsp = notFound ? notFound.csp : null;
// Se descarta lo generado por una corrida anterior (si el script se ejecuta dos veces, no se duplican reglas).
let base = readFileSync(HEADERS, "utf8").split("\n# CSP por página")[0].trimEnd();
if (!/^\s+Content-Security-Policy\s*:/im.test(base)) fail("public/_headers no tiene la CSP genérica en el bloque /*.");
if (baseCsp) base = base.replace(/^(\s+Content-Security-Policy\s*:).*$/im, (_, k) => `${k} ${baseCsp}`);

const perRoute = rules
  .filter((r) => r.csp !== baseCsp)
  .map((r) => `${r.route}\n  ! Content-Security-Policy\n  Content-Security-Policy: ${r.csp}`)
  .join("\n");
const output = `${base}\n\n# CSP por página con hashes de scripts en línea (generado por scripts/csp-hashes.mjs en cada build)\n${perRoute}\n`;

const ruleCount = output.split("\n").filter((l) => l.length > 0 && !/^\s/.test(l) && !l.startsWith("#")).length;
if (ruleCount > MAX_RULES) fail(`hay ${ruleCount} reglas en _headers; el máximo de Cloudflare es ${MAX_RULES}.`);
const longest = Math.max(...output.split("\n").map((l) => l.length));
if (longest > MAX_LINE) fail(`una línea de _headers mide ${longest} caracteres; el máximo de Cloudflare es ${MAX_LINE}.`);

writeFileSync(HEADERS, output);
console.log(`csp-hashes: CSP con hashes escrita para ${rules.length} páginas (${ruleCount} reglas, línea más larga ${longest}).`);
for (const r of rules) console.log(`  ${r.route.padEnd(20)} ${r.scripts} scripts en línea`);
