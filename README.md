# Francoverse — Portfolio

Portfolio personal de Franco Villagra, desarrollador orientado a ciberseguridad.

Proyectos que combinan desarrollo (TypeScript/Next.js · Python/FastAPI) con seguridad aplicada: autenticación, escaneo de vulnerabilidades, reconocimiento automatizado y monitoreo de logs de seguridad. El código se comparte a pedido, bajo NDA. También ofrece revisiones de seguridad para aplicaciones web (sección Servicio).

🔗 **[francoverse.fvillagra-dev.workers.dev](https://francoverse.fvillagra-dev.workers.dev)**

---

## Secciones

Una sola página, con una barra superior que incluye el botón del modo nocturno:

- **Portada** — Nombre, perfil y un hallazgo de ejemplo (con datos ficticios) que pasa de «Antes» a «Después» de corregirlo
- **Servicio** — Revisión de seguridad express para aplicaciones Next.js/Supabase/Vercel: alcance por escrito, revisión, informe, llamada de devolución y verificación opcional. Los botones abren un correo con una plantilla
- **Proyectos** — Una fila por proyecto, con su stack, las comprobaciones verificadas, el estado de la demo y el pedido de acceso al código. La misma lista está en `/proyectos`
- **Contacto** — Email, CV en PDF y redes

Las direcciones del portfolio anterior siguen funcionando: `/section/about` (Sobre mí), `/section/projects` y `/section/cv`.

### Modo día y noche

El sitio tiene dos paletas, día y noche. La primera vez que se entra sigue el modo del sistema; el botón «Modo nocturno» de la barra cambia el modo y guarda la elección en ese navegador (`localStorage`, con `next-themes`).

- Las paletas son variables CSS (`--papel`, `--tinta`, `--accion`, …) en `app/globals.css`, que elige la clase `t-day` o `t-night` de `<html>`; `tailwind.config.js` las expone como colores.
- `next-themes` pone esa clase antes de que el navegador pinte (con un script en línea cuyo hash entra en la CSP, como el resto), así que no hay destello. Sin JavaScript manda el modo del sistema.
- El contraste se midió sobre lo que dibuja el navegador, en las dos paletas y en escritorio y móvil: texto de 4,5:1 o más (3:1 en el texto grande) y gráficos de 3:1 o más.
- Tipografía: Archivo, con eje de ancho, cargada con `next/font`.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 16** | Framework fullstack con App Router |
| **React 19** | UI con hooks y componentes funcionales |
| **TypeScript** | Tipado estático en todo el proyecto |
| **Tailwind CSS** | Base de estilos y colores; el diseño está en `app/globals.css` |
| **next-themes** | Modo día y noche: sigue al sistema y recuerda la elección |
| **Cloudflare Workers** | Hosting del sitio como archivos estáticos (gratis, también para uso comercial) |
| **Vercel Web Analytics** | Conteo de visitas, solo en el despliegue de Vercel (hay que habilitarlo en el proyecto) |

---

## Proyectos incluidos

| Proyecto | Stack | Demo | Código |
|---|---|---|---|
| **Web Vulnerability Scanner** | Next.js · TypeScript · Axios · Tailwind CSS · Zod · Vitest · Vercel | [En línea](https://web-vulnerability-scanner-red.vercel.app) | A pedido, bajo NDA |
| **Recon Scope** | Next.js · TypeScript · FastAPI · Python · PostgreSQL · Supabase · Railway · Recharts · Tailwind CSS | En pausa | A pedido, bajo NDA |
| **Log-Sentinel** | Python · FastAPI · Next.js · TypeScript · Redis · Supabase · WebSocket · JWT | En pausa | A pedido, bajo NDA |
| **Authentication & Authorization API** | Next.js · TypeScript · Prisma · PostgreSQL · JWT · Redis · Zod | Sin demo (API sin interfaz) | A pedido, bajo NDA |

### Estado de las demos

Cada proyecto declara en `data/projects.ts` el campo `demo`:

- `"live"` — responde hoy: la fila muestra el botón **Ver demo** con `liveUrl`.
- `"paused"` — existe, pero su backend está detenido (por ejemplo, base de datos en el plan gratuito de Supabase, que se pausa tras una semana sin uso): la fila muestra «Demo en pausa» y no enlaza nada.
- `"none"` — no hay demo que mostrar.

Así el portfolio no promete nada que no responda. Para reactivar una demo, alcanza con restaurar el backend y cambiar `demo` a `"live"`.

El código no se enlaza: cada fila tiene el enlace **Pedir acceso al código**, que abre un correo con el asunto y una plantilla ya escritos (`codeAccessMailto` en `lib/contact.ts`). La lista `proofs` de cada proyecto solo incluye lo que hoy se puede demostrar (pruebas, CI, controles verificados); `summary` es el texto breve en lenguaje simple que se muestra en la fila.

---

## Seguridad del sitio

Los headers se definen en `lib/security-headers.ts` y se aplican a todas las rutas desde `next.config.ts`. En el modo estático (ver más abajo) salen de `public/_headers`, que tiene que decir lo mismo:

- `Content-Security-Policy` (solo en producción; en desarrollo React Refresh necesita `eval`)
- `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Referrer-Policy` y `Permissions-Policy`
- Se oculta el header `X-Powered-By`

Scripts: en la versión estática (Cloudflare), sin `'unsafe-inline'`. Next.js y `next-themes` insertan scripts en línea (hidratación y tema inicial); en cada build, `scripts/csp-hashes.mjs` calcula el hash SHA-256 de cada uno y escribe **una sola** CSP en `out/_headers` con esos hashes, así que un script inyectado queda bloqueado. Es una única política para todo el sitio a propósito: con una regla por página, Cloudflare mandó dos CSP en la home y el navegador las aplicó a la vez, bloqueando un script propio.

Limitación conocida: los estilos siguen con `'unsafe-inline'` (Next y Tailwind los insertan), y en Vercel, que renderiza con servidor, los scripts en línea también. Endurecerlo con nonces exigiría renderizar las páginas de forma dinámica; queda como mejora pendiente.

---

## Correr localmente

**Prerequisitos:** Node.js 20.9+ y yarn (el repositorio incluye Yarn 4 en `.yarn/releases`)

```bash
# Clonar el repositorio
git clone https://github.com/francovillagra/Francoverse.git
cd Francoverse

# Instalar dependencias
yarn install

# Modo desarrollo
yarn dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu browser.

```bash
# Build de producción
yarn build
yarn start
```

---

## Publicar como sitio estático (Cloudflare, Netlify)

El sitio no usa funciones de servidor, así que se puede generar como archivos estáticos y alojarlo gratis, también para uso comercial (el plan Hobby de Vercel es solo para uso no comercial).

```bash
NEXT_PUBLIC_STATIC_EXPORT=1 yarn build   # genera la carpeta out/
```

- El build exporta el sitio a `out/` cuando se define `NEXT_PUBLIC_STATIC_EXPORT=1` o cuando corre en Cloudflare Workers Builds, que define `WORKERS_CI=1` (no hace falta cargar nada en el panel). En cualquier otro caso se construye igual que antes (Vercel).
- Variable opcional del hosting: `NEXT_PUBLIC_SITE_URL=https://<dirección-final-del-sitio>` (se usa en el sitemap, `robots.txt` y los metadatos; si no se define, apunta a `https://francoverse.fvillagra-dev.workers.dev`).
- Las cabeceras de seguridad salen de `public/_headers`; Cloudflare y Netlify lo leen solos.
- En este modo no se carga Vercel Web Analytics ni se muestra su aviso.
- **Cloudflare (Workers con archivos estáticos).** `wrangler.jsonc` indica que se publica la carpeta `out/`. En el panel: Workers & Pages → Create application → Import a repository → elegir el repositorio. Comando de build `yarn build`, comando de deploy `npx wrangler deploy` y, en Settings → Build → Branch control, la rama de producción. Sin `wrangler.jsonc`, Cloudflare intenta configurar el proyecto con OpenNext y el deploy falla.
- **Cloudflare Pages o Netlify.** Preset «Next.js (Static HTML Export)» (comando `npx next build`, carpeta de salida `out`) y la variable `NEXT_PUBLIC_STATIC_EXPORT=1`.
- **Vercel (portfolio anterior).** El proyecto `francoverse` de Vercel quedó solo como redirección permanente de `francoverse.vercel.app` al sitio de Cloudflare (`vercel.json`), para que los links viejos sigan funcionando. Solo redirige ese dominio: las vistas previas y los demás dominios del proyecto no se tocan.

---

## Estructura del proyecto

```
Francoverse/
├── app/
│   ├── layout.tsx                # Layout global: fuente, modo día/noche, barra superior y pie; metadata SEO/OG y Web Analytics
│   ├── page.tsx                  # Página principal (Portada, Servicio, Proyectos, Contacto)
│   ├── globals.css               # Paletas de día y noche (variables CSS) y estilos del sitio
│   ├── proyectos/
│   │   └── page.tsx              # La lista de proyectos en su propia página
│   └── section/[section]/        # Direcciones del portfolio anterior: about, projects, cv
├── components/
│   ├── providers/                # ThemeProvider (next-themes, clases t-day y t-night)
│   └── site/                     # SiteHeader, ThemeToggle, Hero, FindingPanel, ServiceSection, ProjectsSection, ContactSection, SiteFooter, Marks
├── data/
│   └── projects.ts               # Proyectos: resumen, stack, estado de la demo (demo) y comprobaciones (proofs)
├── lib/
│   ├── contact.ts                # Email de contacto, URL del escáner y mailto de la revisión, del informe de muestra y del acceso al código
│   ├── security-headers.ts       # Headers de seguridad y CSP
│   └── site-url.ts               # URL del sitio y modo estático
├── public/
│   └── projects/                 # Imágenes de la versión anterior (el diseño actual no las usa)
└── types/                        # Tipos TypeScript globales
```

---

## Decisiones de arquitectura

**Una sola fuente de verdad por concepto:**
- Stack, resumen, comprobaciones y estado de la demo de cada proyecto → `data/projects.ts` (`technologies[]`, `summary`, `proofs[]`, `demo`)
- Datos de contacto → `lib/contact.ts` (usados por el Contacto, los botones de Servicio y el pedido de acceso al código)
- Colores → variables CSS de `app/globals.css` (una paleta de día y otra de noche); `tailwind.config.js` las expone como colores

**Proyectos data-driven:** la lista de la portada y la de `/proyectos` salen del mismo array. Agregar un proyecto con su `summary`, `technologies[]`, `proofs[]` y `demo` lo suma a las dos sin tocar ningún componente.

**Las marcas nunca van solas:** el tilde («comprobado»), la cruz («abierto») y el círculo punteado («no disponible») siempre acompañan un texto; el color no es el único aviso.

---

## Autor

**Franco Villagra** — Desarrollador orientado a Ciberseguridad

- Portfolio: [francoverse.fvillagra-dev.workers.dev](https://francoverse.fvillagra-dev.workers.dev)
- GitHub: [@francovillagra](https://github.com/francovillagra)
- LinkedIn: [linkedin.com/in/franco-villagra](https://linkedin.com/in/franco-villagra)
- Email: fvillagra.dev@gmail.com

---

## Licencia

MIT — libre para usar, modificar y distribuir.
