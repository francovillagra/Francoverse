import TechMarquee from "@/components/ui/TechMarquee";
import AboutSection from "@/components/sections/About/AboutSection";
import ProjectsSectionServer from "@/components/sections/Projects/ProjectsSectionServer";
import SkillsSection from "@/components/sections/Skills/SkillsSection";
import SkillsSectionServer from "@/components/sections/Skills/SkillsSectionServer";

export default function Home() {
  return (
    <main className="relative z-10 w-full">
      {/* HERO */}
      <section
        id="home"
        className="min-h-dvh grid place-items-center px-6 pt-24 md:pt-28 scroll-mt-24"
      >
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* TÍTULO */}
          <h1 className="text-4xl md:text-7xl font-semibold tracking-[0.22em] uppercase">
            Franco Villagra
          </h1>

          {/* SUBTÍTULO */}
          <p className="mt-6 text-xs md:text-sm tracking-[0.45em] uppercase text-white/70">
            Desarrollador Fullstack
          </p>

          {/* TAGLINE */}
          <p className="mt-4 text-lg md:text-2xl text-white/80">
            — Creando soluciones con tecnología
          </p>

          {/* CINTA TECNOLOGÍAS */}
          <div className="mt-14">
            <TechMarquee />
          </div>

          {/* microcopy opcional */}
          <p className="mt-8 text-white/60 text-sm">
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
      <section id="contact" className="min-h-dvh px-6 py-20 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Contacto</h2>
          <p className="mt-4 text-white/70">Contenido en construcción.</p>
        </div>
      </section>
    </main>
  );
}