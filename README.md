# Francoverse — Portfolio

Portfolio personal de Franco Villagra — Full Stack Developer · Seguridad de Aplicaciones Web.

Proyectos públicos que combinan desarrollo (TypeScript/Next.js · Python/FastAPI) con seguridad aplicada: autenticación, escaneo de vulnerabilidades, reconocimiento automatizado y monitoreo de logs de seguridad. También ofrece revisiones de seguridad para aplicaciones web (sección Servicios).

🔗 **[francoverse.fvillagra-dev.workers.dev](https://francoverse.fvillagra-dev.workers.dev)**

---

## Secciones

- **Hero** — Presentación con tagline, descarga de CV y marquee de tecnologías con color de marca
- **Sobre mí** — Bio + ficha rápida (Formación / Stack / Foco)
- **Proyectos** — Filtro interactivo por tecnología + cards con imagen, stack, links y estado de la demo. Vista completa en `/proyectos`
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
| **Web Vulnerability Scanner** | Next.js · TypeScript · Axios · Tailwind CSS · Zod · Vitest · Vercel | [En línea](https://web-vulnerability-scanner-red.vercel.app) | [Repo](https://github.com/francovillagra/web-vulnerability-scanner) |
| **Recon Scope** | Next.js · TypeScript · FastAPI · Python · PostgreSQL · Supabase · Railway · Recharts · Tailwind CSS | En pausa | [Repo](https://github.com/francovillagra/recon-scope) |
| **Log-Sentinel** | Python · FastAPI · Next.js · TypeScript · Redis · Supabase · WebSocket · JWT | En pausa | [Repo](https://github.com/francovillagra/log-sentinel) |
| **Authentication & Authorization API** | Next.js · TypeScript · Prisma · PostgreSQL · JWT · Redis · Zod | Sin demo (API sin interfaz) | [Repo](https://github.com/francovillagra/auth-api-security) |

### Estado de las demos

Cada proyecto declara en `data/projects.ts` el campo `demo`:

- `"live"` — responde hoy: la card muestra el botón **Demo** con `liveUrl`.
- `"paused"` — existe, pero su backend está detenido (por ejemplo, base de datos en el plan gratuito de Supabase, que se pausa tras una semana sin uso): la card muestra **Demo en pausa** y no enlaza nada.
- `"none"` — no hay demo que mostrar: solo el código.

Así el portfolio no promete nada que no responda. Para reactivar una demo, alcanza con restaurar el backend y cambiar `demo` a `"live"`.

---

## Seguridad del sitio

Los headers se definen en `lib/security-headers.ts` y se aplican a todas las rutas desde `next.config.ts`. En el modo estático (ver más abajo) salen de `public/_headers`, que tiene que decir lo mismo:

- `Content-Security-Policy` (solo en producción; en desarrollo React Refresh necesita `eval`)
- `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Referrer-Policy` y `Permissions-Policy`
- Se oculta el header `X-Powered-By`

Limitación conocida: la CSP permite `'unsafe-inline'` en scripts y estilos, porque Next.js y `next-themes` insertan scripts en línea (hidratación y tema inicial). Endurecerla con nonces exigiría renderizar las páginas de forma dinámica; queda como mejora pendiente.

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
│   ├── contact.ts                # Email de contacto, URL del escáner y mailto de la revisión
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
- Datos de contacto → `lib/contact.ts` (usados por la sección Contacto y el botón de Servicios)
- Tiles de habilidades → `data/skills.ts` con `match[]` que puente hacia `technologies[]`

**Habilidades data-driven:** los tiles de la sección Proyectos derivan su conteo y filtrado del array de proyectos en tiempo de render. Agregar un proyecto nuevo con su `technologies[]` lo hace aparecer automáticamente bajo cada tile que matchee — sin tocar el componente.

**Contraste monocromático:** escala de grises basada en `fg` (blanco puro) con opacidad: `fg/95` primario · `fg/70` cuerpo · `fg/60` secundario (piso) · `fg/50` hints decorativos únicamente.

---

## Autor

**Franco Villagra** — Full Stack Developer · Seguridad de Aplicaciones Web

- Portfolio: [francoverse.fvillagra-dev.workers.dev](https://francoverse.fvillagra-dev.workers.dev)
- GitHub: [@francovillagra](https://github.com/francovillagra)
- LinkedIn: [linkedin.com/in/franco-villagra](https://linkedin.com/in/franco-villagra)
- Email: fvillagra.dev@gmail.com

---

## Licencia

MIT — libre para usar, modificar y distribuir.
