# Francoverse — Portfolio

Portfolio personal de Franco Villagra, desarrollador orientado a ciberseguridad.

Proyectos que combinan desarrollo (TypeScript/Next.js · Python/FastAPI) con seguridad aplicada: autenticación, escaneo de vulnerabilidades, reconocimiento automatizado y monitoreo de logs de seguridad. El código se comparte a pedido, bajo NDA. También ofrece revisiones de seguridad para aplicaciones web (sección Servicios).

🔗 **[francoverse.fvillagra-dev.workers.dev](https://francoverse.fvillagra-dev.workers.dev)**

---

## Secciones

- **Hero** — Presentación con tagline, descarga de CV y marquee de tecnologías con color de marca
- **Sobre mí** — Bio + ficha rápida (Formación / Stack / Foco)
- **Proyectos** — Filtro interactivo por tecnología + cards con imagen, stack, comprobaciones verificadas, estado de la demo y pedido de acceso al código. Vista completa en `/proyectos`
- **Servicios** — Revisión de seguridad express para aplicaciones Next.js/Supabase/Vercel y seguridad automática en repositorios. El botón de contacto abre un correo con una plantilla para describir el sitio
- **Contacto** — Email y redes sociales

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 16** | Framework fullstack con App Router |
| **React 19** | UI con hooks y componentes funcionales |
| **TypeScript** | Tipado estático en todo el proyecto |
| **Tailwind CSS** | Estilos utilitarios y diseño responsivo |
| **Framer Motion** | Animaciones declarativas, AnimatePresence, useReducedMotion |
| **Lucide React** | Íconos SVG |
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

- `"live"` — responde hoy: la card muestra el botón **Ver demo** con `liveUrl`.
- `"paused"` — existe, pero su backend está detenido (por ejemplo, base de datos en el plan gratuito de Supabase, que se pausa tras una semana sin uso): la card muestra **Demo en pausa** y no enlaza nada.
- `"none"` — no hay demo que mostrar.

Así el portfolio no promete nada que no responda. Para reactivar una demo, alcanza con restaurar el backend y cambiar `demo` a `"live"`.

El código no se enlaza: cada card tiene el botón **Pedir acceso al código**, que abre un correo con el asunto y una plantilla ya escritos (`codeAccessMailto` en `lib/contact.ts`). La lista `proofs` de cada proyecto solo incluye lo que hoy se puede demostrar (pruebas, CI, controles verificados).

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
│   ├── page.tsx                  # Página principal (Hero + secciones)
│   ├── layout.tsx                # Layout global, metadata SEO/OG y Web Analytics
│   ├── proyectos/
│   │   └── page.tsx              # Vista completa de proyectos con sort
│   └── section/[section]/        # Rutas dinámicas: about, projects, cv
├── components/
│   ├── sections/
│   │   ├── Hero/                 # HeroSection + TechMarquee
│   │   ├── About/                # AboutSection (bio + cards Formación/Stack/Foco)
│   │   ├── Projects/             # ProjectsSection (filtro + grilla) + ProjectCard
│   │   ├── Services/             # ServicesSection (revisión de seguridad express)
│   │   ├── Contact/              # ContactSection
│   │   └── Navigation/           # TopNav, menú móvil, ScrollNavigator
│   ├── layout/                   # MainLayout, SectionContainer, wrappers
│   └── ui/                       # Button, Title, ScrollNavigator, etc.
├── data/
│   ├── projects.ts               # Array de proyectos (featured, completedAt, technologies, demo)
│   ├── skills.ts                 # 7 tiles curados con match[] y color
│   └── techColors.ts             # Fuente única de color por tecnología (rgb)
├── lib/
│   ├── contact.ts                # Email de contacto, URL del escáner y mailto de la revisión y del acceso al código
│   └── security-headers.ts       # Headers de seguridad y CSP
├── public/
│   └── projects/                 # Imágenes de los proyectos
└── types/                        # Tipos TypeScript globales
```

---

## Decisiones de arquitectura

**Una sola fuente de verdad por concepto:**
- Colores de tecnología → `data/techColors.ts` (usados en TechMarquee y SkillTiles)
- Stack y estado de la demo de cada proyecto → `data/projects.ts` (`technologies[]`, `demo`)
- Datos de contacto → `lib/contact.ts` (usados por la sección Contacto, el botón de Servicios y el pedido de acceso al código)
- Tiles de habilidades → `data/skills.ts` con `match[]` que puente hacia `technologies[]`

**Habilidades data-driven:** los tiles de la sección Proyectos derivan su conteo y filtrado del array de proyectos en tiempo de render. Agregar un proyecto nuevo con su `technologies[]` lo hace aparecer automáticamente bajo cada tile que matchee — sin tocar el componente.

**Contraste monocromático:** escala de grises basada en `fg` (blanco puro) con opacidad: `fg/95` primario · `fg/70` cuerpo · `fg/60` secundario (piso) · `fg/50` hints decorativos únicamente.

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
