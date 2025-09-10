// app/section/[section]/page.tsx
import Link from "next/link";
import HeroSection from "@/components/sections/Hero/HeroSection";
import ProjectsSection from "@/components/sections/Projects/ProjectsSection";
import SkillsSection from "@/components/sections/Skills/SkillsSection";

type Props = { params: { section: string } };

function BackHome() {
  return (
    <div className="absolute top-4 left-4 z-20">
      <Link
        href="/"
        className="rounded-xl px-3 py-2 border border-white/30 hover:border-white/60 transition"
      >
        ← Volver
      </Link>
    </div>
  );
}

export default function SectionPage({ params }: Props) {
  const { section } = params;

  switch (section) {
    case "hero":
      return (
        <main className="relative w-full h-dvh grid place-items-center px-6">
          <BackHome />
          {/* Hero en una sola pantalla */}
          <div className="w-full max-w-6xl">
            <HeroSection />
          </div>
        </main>
      );

    case "projects":
      return (
        <main className="relative w-full h-dvh px-6">
          <BackHome />
          <div className="mx-auto max-w-6xl h-full flex items-center">
            {/* isStandalone ajusta padding/fondo sin generar scroll */}
            <ProjectsSection isStandalone />
          </div>
        </main>
      );

    case "skills":
      return (
        <main className="relative w-full h-dvh grid place-items-center px-6">
          <BackHome />
          <div className="w-full max-w-6xl">
            <SkillsSection />
          </div>
        </main>
      );

    default:
      return (
        <main className="w-full h-dvh grid place-items-center px-6 text-center">
          <BackHome />
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Sección no encontrada</h2>
            <p className="text-white/70 mt-2">Probá con /section/hero, /section/projects o /section/skills.</p>
          </div>
        </main>
      );
  }
}
