import Link from "next/link";
import HeroSection from "@/components/sections/Hero/HeroSection";
import ProjectsSection from "@/components/sections/Projects/ProjectsSection";
import SkillsSection from "@/components/sections/Skills/SkillsSection";
import AboutSection from "@/components/sections/About/AboutSection"

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

export default async function SectionPage({ params }: Props) {
  const { section } = await params;

  switch (section) {
    case "hero":
      return (
        <main className="relative w-full h-dvh grid place-items-center px-6">
          <BackHome />
          <div className="w-full max-w-6xl">
            <HeroSection />
          </div>
        </main>
      );

    case "about":
      return (
        <main className="relative w-full h-dvh">
          <AboutSection />
        </main>
      );

    case "projects":
      return (
        <main className="relative w-full h-dvh px-6">
          <BackHome />
          <div className="mx-auto max-w-6xl h-full flex items-center">
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

    case "cv":
      return (
        <main className="relative w-full h-dvh grid place-items-center px-6">
          <BackHome />
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold">CV</h2>
            <a
              href="/cv/FrancoVillagra_CV.pdf"
              download
              className="inline-block rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Descargar CV
            </a>
          </div>
        </main>
      );

    default:
      return (
        <main className="w-full h-dvh grid place-items-center px-6 text-center">
          <BackHome />
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Sección no encontrada</h2>
            <p className="text-white/70 mt-2">Probá con /section/hero, /section/projects, /section/skills o /section/cv.</p>
          </div>
        </main>
      );
  }
}
