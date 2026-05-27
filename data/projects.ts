export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: "p1",
    title: "API REST Securizada",
    description: "API REST con autenticación JWT, refresh tokens, rate limiting y bcrypt. Endpoints de registro, login y rutas protegidas. Documentación completa con ejemplos de uso.",
    technologies: ["Node.js", "Express", "JWT", "bcrypt", "Railway", "Vercel"],
    liveUrl: "https://auth-api-production.vercel.app",
    githubUrl: "https://github.com/francovillagra/auth-api",
    image: "/api-security.png",
  },
  {
    id: "p2",
    title: "Web Vulnerability Scanner",
    description: "Herramienta web para detectar vulnerabilidades de seguridad en sitios web. Analiza headers HTTP, certificados SSL, cookies inseguras, open redirects y más. Sin registro requerido.",
    technologies: ["Next.js", "TypeScript", "Axios", "Tailwind CSS", "Zod", "Recharts", "Vercel"],
    liveUrl: "https://web-vulnerability-scanner-red.vercel.app",
    githubUrl: "https://github.com/francovillagra/web-vulnerability-scanner",
    image: "/projects/vulnerability-scanner.jpeg",
  },
  {
    id: "p3",
    title: "recon-scope",
    description: "Plataforma de reconocimiento automatizado para assessments de seguridad autorizados. Enumera subdominios, escanea puertos y detecta tecnologías con verificación de propiedad de dominio obligatoria antes de cualquier scan.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Supabase", "Railway", "Recharts", "Tailwind CSS"],
    liveUrl: "https://recon-scope.vercel.app",
    githubUrl: "https://github.com/francovillagra/recon-scope",
    image: "/projects/recon_scope_card_v3.svg",
  },
];

export default projects;
