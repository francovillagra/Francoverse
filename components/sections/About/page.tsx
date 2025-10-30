// app/section/about/page.tsx

import Stats from "@/components/sections/About/Stats";
import { projects } from "@/data/projects";


export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Sobre mí</h1>
      <p className="mt-3 opacity-90">
        Soy Franco Villagra, desarrollador fullstack con foco en crear soluciones de alto impacto…
      </p>

      <Stats
        startYear={2023}
        projectsCount={Array.isArray(projects) ? projects.length : 0}
        happyClients={0}
      />
    </section>
  );
}
