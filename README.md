# Francoverse — Portfolio

Portfolio personal de Franco Villagra — Full Stack Developer · Seguridad Aplicada.

Proyectos en producción que combinan desarrollo (TypeScript/Next.js · Python/FastAPI) con seguridad aplicada: autenticación hardened, escaneo de vulnerabilidades, reconocimiento automatizado y monitoreo de logs de seguridad.

🔗 **[francoverse.vercel.app](https://francoverse.vercel.app)**

---

## Secciones

- **Hero** — Presentación con tagline, descarga de CV y marquee de tecnologías con color de marca
- **Sobre mí** — Bio + ficha rápida (Formación / Stack / Foco)
- **Proyectos** — Filtro interactivo por tecnología + cards con imagen, stack y links. Vista completa en `/proyectos`
- **Contacto** — Email y redes sociales

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 15** | Framework fullstack con App Router |
| **React 19** | UI con hooks y componentes funcionales |
| **TypeScript** | Tipado estático en todo el proyecto |
| **Tailwind CSS** | Estilos utilitarios y diseño responsivo |
| **Framer Motion** | Animaciones declarativas, AnimatePresence, useReducedMotion |
| **Lucide React** | Íconos SVG |
| **Vercel** | Deploy y hosting en producción |

---

## Proyectos incluidos

| Proyecto | Stack | Links |
|---|---|---|
| **Recon Scope** | Next.js · TypeScript · FastAPI · Python · PostgreSQL · Supabase · Railway · Recharts · Tailwind CSS | [Demo](https://recon-scope.vercel.app) · [Repo](https://github.com/francovillagra/recon-scope) |
| **Log-Sentinel** | Python · FastAPI · Next.js · TypeScript · Redis · Supabase · WebSocket · JWT | [Demo](https://log-sentinel-eta.vercel.app) · [Repo](https://github.com/francovillagra/log-sentinel) |
| **Authentication & Authorization API** | Next.js · TypeScript · Prisma · PostgreSQL · JWT · Redis · Zod | [Demo](https://auth-api-production.vercel.app) · [Repo](https://github.com/francovillagra/auth-api-security) |
| **Web Vulnerability Scanner** | Next.js · TypeScript · Axios · Tailwind CSS · Zod · Recharts · Vercel | [Demo](https://web-vulnerability-scanner-red.vercel.app) · [Repo](https://github.com/francovillagra/web-vulnerability-scanner) |

---

## Correr localmente

**Prerequisitos:** Node.js 18+ y yarn

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

## Estructura del proyecto

```
Francoverse/
├── app/
│   ├── page.tsx                  # Página principal (Hero + secciones)
│   ├── layout.tsx                # Layout global y metadata SEO/OG
│   ├── proyectos/
│   │   └── page.tsx              # Vista completa de proyectos con sort
│   └── section/[section]/        # Rutas dinámicas: about, projects, cv
├── components/
│   ├── sections/
│   │   ├── Hero/                 # HeroSection + TechMarquee
│   │   ├── About/                # AboutSection (bio + cards Formación/Stack/Foco)
│   │   ├── Projects/             # ProjectsSection (filtro + grilla) + ProjectCard
│   │   ├── Contact/              # ContactSection
│   │   └── Navigation/           # TopNav, menú móvil, ScrollNavigator
│   ├── layout/                   # MainLayout, SectionContainer, wrappers
│   └── ui/                       # Button, Title, ScrollNavigator, etc.
├── data/
│   ├── projects.ts               # Array de proyectos (featured, completedAt, technologies)
│   ├── skills.ts                 # 7 tiles curados con match[] y color
│   └── techColors.ts             # Fuente única de color por tecnología (rgb)
├── public/
│   └── projects/                 # Imágenes de los proyectos
└── types/                        # Tipos TypeScript globales
```

---

## Decisiones de arquitectura

**Una sola fuente de verdad por concepto:**
- Colores de tecnología → `data/techColors.ts` (usados en TechMarquee y SkillTiles)
- Stack de cada proyecto → `data/projects.ts` campo `technologies[]`
- Tiles de habilidades → `data/skills.ts` con `match[]` que puente hacia `technologies[]`

**Habilidades data-driven:** los tiles de la sección Proyectos derivan su conteo y filtrado del array de proyectos en tiempo de render. Agregar un proyecto nuevo con su `technologies[]` lo hace aparecer automáticamente bajo cada tile que matchee — sin tocar el componente.

**Contraste monocromático:** escala de grises basada en `fg` (blanco puro) con opacidad: `fg/95` primario · `fg/70` cuerpo · `fg/60` secundario (piso) · `fg/50` hints decorativos únicamente.

---

## Autor

**Franco Villagra** — Full Stack Developer · Seguridad Aplicada

- Portfolio: [francoverse.vercel.app](https://francoverse.vercel.app)
- GitHub: [@francovillagra](https://github.com/francovillagra)
- LinkedIn: [linkedin.com/in/franco-villagra](https://linkedin.com/in/franco-villagra)
- Email: fvillagra.dev@gmail.com

---

## Licencia

MIT — libre para usar, modificar y distribuir.
