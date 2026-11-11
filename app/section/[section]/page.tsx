import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsSection from "@/components/site/ProjectsSection";

// Estas direcciones existen desde el portfolio anterior (y están en el mapa del sitio y en enlaces ajenos): se
// mantienen. Las secciones válidas se generan al compilar (necesario para el modo estático) y cualquier otra
// ruta devuelve 404.
const SECTIONS = ["about", "projects", "cv"] as const;
type Section = (typeof SECTIONS)[number];
type Props = { params: Promise<{ section: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

const isSection = (value: string): value is Section => (SECTIONS as readonly string[]).includes(value);

const META: Record<Section, { title: string; description: string; canonical: string }> = {
  about: {
    title: "Sobre mí | Franco Villagra",
    description: "Franco Villagra: desarrollador orientado a ciberseguridad, con 8 años como auditor externo en el sector público.",
    canonical: "/section/about",
  },
  projects: {
    title: "Proyectos | Franco Villagra",
    description: "Proyectos de seguridad de aplicaciones de Franco Villagra, cada uno con lo que hoy se puede comprobar.",
    canonical: "/proyectos",
  },
  cv: {
    title: "CV | Franco Villagra",
    description: "Currículum de Franco Villagra, desarrollador orientado a ciberseguridad, en PDF.",
    canonical: "/section/cv",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) return {};
  const { title, description, canonical } = META[section];
  return { title, description, alternates: { canonical } };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  if (section === "projects") {
    return (
      <main id="contenido">
        <ProjectsSection headingAs="h1" />
      </main>
    );
  }

  if (section === "cv") {
    return (
      <main id="contenido">
        <div className="wrap page">
          <h1 className="h2">CV</h1>
          <p className="prose">Currículum en PDF, de una página.</p>
          <div className="acts">
            <a className="btn" href="/cv-franco-villagra.pdf" download="CV-Franco-Villagra.pdf">
              Descargar CV (PDF)
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="contenido">
      <div className="wrap page">
        <h1 className="h2">Sobre mí</h1>
        <div className="prose">
          <p>
            Soy desarrollador orientado a ciberseguridad. Construyo con TypeScript/Next.js y Python/FastAPI, con la seguridad como
            requisito en todo el ciclo de vida del software (SDLC), y pruebo lo que construyo antes de darlo por bueno.
          </p>
          <p>
            Vengo de 8 años como auditor externo en el sector público: verificar con evidencia es mi oficio. El código de mis
            proyectos se comparte a pedido, bajo NDA.
          </p>
        </div>
        <dl className="facts">
          <div>
            <dt>Formación</dt>
            <dd>Desarrollo Full Stack (UTN). Licenciatura en Ciberdefensa en curso (FADENA).</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>TypeScript y Next.js en web; Python y FastAPI en backend y en herramientas de seguridad.</dd>
          </div>
          <div>
            <dt>Foco</dt>
            <dd>Seguridad de aplicaciones web en todo el SDLC, del diseño al despliegue.</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
