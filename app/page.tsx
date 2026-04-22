import TechMarquee from "@/components/ui/TechMarquee";
import AboutSection from "@/components/sections/About/AboutSection";
import ProjectsSectionServer from "@/components/sections/Projects/ProjectsSectionServer";
import SkillsSectionServer from "@/components/sections/Skills/SkillsSectionServer";
import ContactSection from "@/components/sections/Contact/ContactSection";

export default function Home() {
  return (
    <main className="relative z-10 w-full">
          {/* HERO */}
      <section
        id="home"
        className="relative min-h-dvh overflow-hidden grid place-items-center px-4 pt-24 md:px-6 md:pt-28 scroll-mt-24"
      >
        <div className="w-full max-w-[22rem] sm:max-w-2xl md:max-w-5xl mx-auto text-center">
          {/* TÍTULO */}
          <h1 className="text-2xl sm:text-4xl md:text-7xl font-semibold tracking-[0.04em] sm:tracking-[0.12em] md:tracking-[0.22em] uppercase leading-tight break-words">
            Franco Villagra
          </h1>

          {/* SUBTÍTULO */}
          <p className="mt-4 text-[10px] sm:text-xs md:text-sm tracking-[0.16em] sm:tracking-[0.3em] md:tracking-[0.45em] uppercase text-white/70">
            Desarrollador Fullstack
          </p>

          {/* TAGLINE */}
          <p className="mt-3 text-sm sm:text-lg md:text-2xl text-white/80">
            — Creando soluciones con tecnología
          </p>

          {/* CINTA TECNOLOGÍAS */}
          <div className="mt-8 md:mt-14">
            <TechMarquee />
          </div>

          {/* microcopy opcional */}
          <p className="mt-5 md:mt-8 text-white/60 text-xs sm:text-sm">
            Navegá por las secciones desde la barra superior.
          </p>
        </div>
      </section>

            {/* ABOUT */}
      <AboutSection />

      {/* PROJECTS */}
      <ProjectsSectionServer featuredOnly limit={6} showViewAll />

      {/* SKILLS */}
        <SkillsSectionServer />

    {/* CONTACT */}
      <ContactSection />
    </main>
  );
}