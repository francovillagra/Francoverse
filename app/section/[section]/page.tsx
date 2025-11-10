import Link from "next/link";
import HeroSection from "@/components/sections/Hero/HeroSection";
import ProjectsSection from "@/components/sections/Projects/ProjectsSection";
import SkillsSection from "@/components/sections/Skills/SkillsSection";
import AboutSection from "@/components/sections/About/AboutSection";

type SectionKey = "hero" | "about" | "projects" | "skills" | "cv";
type Props = { params: { section: string } };

function BackHome() {
  return (
    <div className="absolute top-4 left-4 z-20">
      <Link
        href="/"
        className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/30
                   text-neutral-900 dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/10
                   transition"
      >
        ← Volver
      </Link>
    </div>
  );
}

export default function SectionPage({ params }: Props) {
  const { section } = params;

  switch (section as SectionKey) {
    case "hero":
      return (
        <main
          className="relative w-full h-dvh grid place-items-center px-6
                     bg-white/80 text-neutral-900 dark:bg-[#030014]/95 dark:text-white
                     backdrop-blur transition-colors"
        >
          <BackHome />
          <div className="w-full max-w-6xl">
            <HeroSection />
          </div>
        </main>
      );

    case "about":
      return (
        <main
          className="relative w-full h-dvh
                     bg-white/80 text-neutral-900 dark:bg-[#030014]/95 dark:text-white
                     backdrop-blur transition-colors"
        >
          <AboutSection />
        </main>
      );

    case "projects":
      return (
        <main
          className="relative w-full h-dvh px-6
                     bg-white/80 text-neutral-900 dark:bg-[#030014]/95 dark:text-white
                     backdrop-blur transition-colors"
        >
          <BackHome />
          <div className="mx-auto max-w-6xl h-full flex items-center">
            <ProjectsSection isStandalone />
          </div>
        </main>
      );

    case "skills":
      return (
        <main
          className="relative w-full h-dvh grid place-items-center px-6
                     bg-white/80 text-neutral-900 dark:bg-[#030014]/95 dark:text-white
                     backdrop-blur transition-colors"
        >
          <BackHome />
          <div className="w-full max-w-6xl">
            <SkillsSection />
          </div>
        </main>
      );

    case "cv":
      return (
        <main
          className="relative w-full h-dvh grid place-items-center px-6
                     bg-white/80 text-neutral-900 dark:bg-[#030014]/95 dark:text-white
                     backdrop-blur transition-colors"
        >
          <BackHome />
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold">CV</h2>
            <a
              href="/cv/FrancoVillagra_CV.pdf"
              download
              className="inline-block rounded-2xl px-5 py-3
                         bg-black text-white dark:bg-white dark:text-black
                         font-semibold hover:opacity-90 transition"
            >
              Descargar CV
            </a>
          </div>
        </main>
      );

    default:
      return (
        <main
          className="w-full h-dvh grid place-items-center px-6 text-center
                     bg-white/80 text-neutral-900 dark:bg-[#030014]/95 dark:text-white
                     backdrop-blur transition-colors"
        >
          <BackHome />
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Sección no encontrada</h2>
            <p className="text-neutral-600 dark:text-white/70 mt-2">
              Probá con /section/hero, /section/projects, /section/skills o /section/cv.
            </p>
          </div>
        </main>
      );
  }
}
