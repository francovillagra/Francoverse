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
        className="min-h-dvh grid place-items-center px-5 pt-28 md:pt-28 scroll-mt-24"
      >
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* TÍTULO */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-semibold tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.22em] uppercase leading-tight">
            Franco Villagra
          </h1>

          {/* SUBTÍTULO */}
          <p className="mt-4 text-[10px] sm:text-xs md:text-sm tracking-[0.22em] sm:tracking-[0.3em] md:tracking-[0.45em] uppercase text-white/70">
            Desarrollador Fullstack
          </p>

          {/* TAGLINE */}
          <p className="mt-3 text-base sm:text-lg md:text-2xl text-white/80">
            — Creando soluciones con tecnología
          </p>

          {/* CINTA TECNOLOGÍAS */}
          <div className="mt-10 md:mt-14">
            <TechMarquee />
          </div>

          {/* microcopy opcional */}
          <p className="mt-6 md:mt-8 text-white/60 text-sm">
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