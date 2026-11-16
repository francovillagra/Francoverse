/**
 * Estado de la demo en línea:
 * - "live": funciona hoy; se muestra el botón Ver demo en vivo con `liveUrl`.
 * - "paused": existe pero su backend está detenido; se muestra "Demo en pausa" y no se enlaza.
 * - "none": no hay una demo en línea que mostrar (puede haber una grabación: ver `video`).
 * Cambiar el estado en un solo lugar evita que el portfolio prometa algo que no responda.
 *
 * El código de los proyectos no se enlaza: se comparte a pedido, bajo NDA (botón "Pedir acceso al código").
 */
export type DemoStatus = "live" | "paused" | "none";

/**
 * Grabación de la demo, hecha en un laboratorio propio con datos de práctica. Los archivos están en public/videos/
 * (MP4 H.264 sin audio y una portada WebP). `description` es la alternativa en texto del video: se muestra debajo y la
 * lee el lector de pantalla, así que tiene que decir lo que pasa en pantalla, sin adornos.
 */
export interface ProjectVideo {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Duración para leer, por ejemplo "1 min 17 s". */
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Texto breve en lenguaje simple: es el que se muestra en la página principal. */
  summary: string;
  technologies: string[];
  featured: boolean;
  completedAt: string; // "YYYY-MM" of last commit
  demo: DemoStatus;
  liveUrl?: string; // solo se enlaza cuando demo === "live"
  /** Comprobaciones verificadas en el código, el CI o producción. Solo lo que hoy se puede demostrar. */
  proofs?: string[];
  /** Grabación de la demo: se muestra en la fila, debajo de las comprobaciones. */
  video?: ProjectVideo;
}

const projects: Project[] = [
  // Primero y destacado: es la única demo que responde hoy y la puerta de entrada a los servicios.
  {
    id: "p2",
    title: "Web Vulnerability Scanner",
    featured: true,
    completedAt: '2026-06',
    description: "Chequeo básico de seguridad para un sitio web, sin registro: HTTPS y certificado TLS, headers, cookies e información expuesta, con recomendaciones en lenguaje claro.",
    summary: "Chequeo básico de seguridad para un sitio web, sin registro: HTTPS y certificado TLS, cabeceras, cookies e información expuesta, con recomendaciones en lenguaje claro.",
    technologies: ["Next.js", "TypeScript", "Axios", "Tailwind CSS", "Zod", "Vitest", "Vercel"],
    demo: "live",
    liveUrl: "https://web-vulnerability-scanner-red.vercel.app",
    proofs: [
      "218 pruebas automáticas",
      "Integración continua con GitHub Actions",
      "Defensa contra SSRF en varias capas, con pruebas de regresión",
    ],
  },
  {
    id: "p3",
    title: "Recon Scope",
    featured: true,
    completedAt: '2026-06',
    description: "Plataforma de reconocimiento automatizado para assessments de seguridad autorizados. Enumera subdominios, escanea puertos y detecta tecnologías con verificación de propiedad de dominio obligatoria antes de cualquier scan.",
    summary: "Mapea qué partes de un sitio están expuestas en Internet, y solo si su dueño lo autoriza: subdominios, puertos y tecnologías.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Supabase", "Railway", "Recharts", "Tailwind CSS"],
    demo: "none", // la demo en línea está detenida (base de datos en pausa, plan gratuito de Supabase): se muestra la grabación
    liveUrl: "https://recon-scope.vercel.app",
    proofs: [
      "272 pruebas automáticas",
      "Prueba de punta a punta con Docker Compose en el CI",
      "Hallazgos de una revisión propia (SSRF, DoS, dependencias) corregidos y cubiertos por pruebas",
    ],
    video: {
      src: "/videos/recon-scope.mp4",
      poster: "/videos/recon-scope.webp",
      width: 1920,
      height: 1080,
      duration: "1 min 17 s",
      description:
        "Recorrido en un laboratorio propio, con datos de práctica. Sin la prueba de que el dominio es del cliente, el motor se niega a escanear. Con la prueba, revisa subdominios, puertos y sitios web, y explica cada hallazgo en lenguaje claro. Al dar de baja el servidor olvidado, el informe pasa de 8 hallazgos a 1.",
    },
  },
  {
    id: "p4",
    title: "Log-Sentinel",
    featured: true,
    completedAt: '2026-06',
    description: "SIEM-lite de Blue Team: ingiere logs, detecta patrones de ataque en tiempo real (fuerza bruta, SQLi, path traversal, XSS, scanners) y transmite alertas a un dashboard live vía WebSocket.",
    summary: "Recibe los registros (logs) de una aplicación y avisa en tiempo real cuando detecta patrones de ataque: fuerza bruta, inyección SQL, path traversal, XSS y escáneres. Las alertas llegan a un panel en vivo.",
    demo: "none", // la demo en línea está detenida (base de datos en pausa, plan gratuito de Supabase): se muestra la grabación
    liveUrl: "https://log-sentinel-eta.vercel.app",
    proofs: [
      "760 pruebas automáticas",
      "Hallazgos de una revisión propia (ReDoS, entradas sin límite) corregidos y cubiertos por pruebas",
      "Imagen de contenedor sin root, construida en el CI",
    ],
    technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "Redis", "Supabase", "WebSocket", "JWT"],
    video: {
      src: "/videos/log-sentinel.mp4",
      poster: "/videos/log-sentinel.webp",
      width: 1920,
      height: 1080,
      duration: "35 s",
      description:
        "Grabación en un laboratorio propio, con datos de práctica. A la izquierda, una consola envía tráfico de ataque simulado. A la derecha, el panel de avisos muestra las alertas en vivo, con la regla que las detectó: fuerza bruta, inyección SQL, lectura de archivos privados, programas de ataque conocidos y ráfagas de visitas.",
    },
  },
  {
    id: "p1",
    title: "Authentication & Authorization API",
    featured: true,
    completedAt: '2026-06',
    description: "API REST con autenticación JWT, rate limiting y bcrypt. Registro, login, logout que revoca la sesión y rutas protegidas por rol. Documentación con ejemplos de uso.",
    summary: "API de registro e inicio de sesión: contraseñas con bcrypt, tokens JWT, límite de pedidos y rutas protegidas por rol. Al cerrar sesión, la sesión se revoca.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT", "Redis", "Zod"],
    // Sin demo en línea: es una API sin interfaz, y la dirección que se enlazaba antes no era la del proyecto.
    // La grabación muestra su consola de práctica.
    demo: "none",
    proofs: [
      "Refresh tokens con rotación y detección de reuso",
      "RLS activo en las 4 tablas de la base",
      "Pruebas de integración contra PostgreSQL real en el CI",
    ],
    video: {
      src: "/videos/auth-api.mp4",
      poster: "/videos/auth-api.webp",
      width: 1920,
      height: 1080,
      duration: "1 min 14 s",
      description:
        "Recorrido en un laboratorio propio, con datos de práctica: una tienda de ejemplo recibe ataques reales contra su API. La API frena la adivinación de contraseñas desde el sexto intento, detecta que una sesión fue copiada y la cierra, y rechaza las llaves de administrador falsas. Al final muestra un límite que todavía no cubre.",
    },
  },
];

export default projects;
