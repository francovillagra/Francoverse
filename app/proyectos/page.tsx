import type { Metadata } from "next";
import ProjectsSection from "@/components/site/ProjectsSection";

export const metadata: Metadata = {
  title: "Proyectos | Franco Villagra",
  description: "Proyectos de seguridad de aplicaciones de Franco Villagra, cada uno con lo que hoy se puede comprobar. El código se comparte a pedido, bajo NDA.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  return (
    <main id="contenido">
      <ProjectsSection headingAs="h1" />
    </main>
  );
}
