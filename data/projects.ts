/**
 * Estado de la demo en línea:
 * - "live": funciona hoy; se muestra el botón Demo con `liveUrl`.
 * - "paused": existe pero su backend está detenido; se muestra "Demo en pausa" y no se enlaza.
 * - "none": no hay una demo que mostrar; solo el código.
 * Cambiar el estado en un solo lugar evita que el portfolio prometa algo que no responde.
 */
export type DemoStatus = "live" | "paused" | "none";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
  completedAt: string; // "YYYY-MM" of last commit
  demo: DemoStatus;
  liveUrl?: string; // solo se enlaza cuando demo === "live"
  githubUrl?: string;
  image?: string;
}

const projects: Project[] = [
  // Primero y destacado: es la única demo que responde hoy y la puerta de entrada a los servicios.
  {
    id: "p2",
    title: "Web Vulnerability Scanner",
    featured: true,
    completedAt: '2026-06',
    description: "Chequeo básico de seguridad para un sitio web, sin registro: HTTPS y certificado TLS, headers, cookies e información expuesta, con recomendaciones en lenguaje claro. Protegido contra SSRF y abuso, con tests de regresión.",
    technologies: ["Next.js", "TypeScript", "Axios", "Tailwind CSS", "Zod", "Vitest", "Vercel"],
    demo: "live",
    liveUrl: "https://web-vulnerability-scanner-red.vercel.app",
    githubUrl: "https://github.com/francovillagra/web-vulnerability-scanner",
    image: "/projects/vulnerability-scanner.jpeg",
  },
  {
    id: "p3",
    title: "Recon Scope",
    featured: true,
    completedAt: '2026-06',
    description: "Plataforma de reconocimiento automatizado para assessments de seguridad autorizados. Enumera subdominios, escanea puertos y detecta tecnologías con verificación de propiedad de dominio obligatoria antes de cualquier scan.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Supabase", "Railway", "Recharts", "Tailwind CSS"],
    demo: "paused", // la base de datos (Supabase, plan gratuito) está en pausa
    liveUrl: "https://recon-scope.vercel.app",
    githubUrl: "https://github.com/francovillagra/recon-scope",
    image: "/projects/recon_scope_card_v3.svg",
  },
  {
    id: "p4",
    title: "Log-Sentinel",
    featured: true,
    completedAt: '2026-06',
    description: "SIEM-lite de Blue Team: ingiere logs, detecta patrones de ataque en tiempo real (fuerza bruta, SQLi, path traversal, XSS, scanners) y transmite alertas a un dashboard live vía WebSocket.",
    demo: "paused", // la base de datos (Supabase, plan gratuito) está en pausa
    liveUrl: "https://log-sentinel-eta.vercel.app",
    githubUrl: "https://github.com/francovillagra/log-sentinel",
    technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "Redis", "Supabase", "WebSocket", "JWT"],
    image: "/images/log-sentinel-banner.svg",
  },
  {
    id: "p1",
    title: "Authentication & Authorization API",
    featured: true,
    completedAt: '2026-06',
    description: "API REST con autenticación JWT, refresh tokens, rate limiting y bcrypt. Endpoints de registro, login y rutas protegidas. Documentación completa con ejemplos de uso.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT", "Redis", "Zod"],
    // Sin demo: es una API sin interfaz, y la dirección que se enlazaba antes no era la del proyecto.
    demo: "none",
    githubUrl: "https://github.com/francovillagra/auth-api-security",
    image: "/projects/auth-api-card.svg",
  },
];

export default projects;
