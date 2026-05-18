import TechMarquee from "@/components/ui/TechMarquee";
import AboutSection from "@/components/sections/About/AboutSection";
import ProjectsSection from "@/components/sections/Projects/ProjectsSection";
import SkillsSection from "@/components/sections/Skills/SkillsSection";
import ContactSection from "@/components/sections/Contact/ContactSection";

export default function Home() {
  return (
    <main className="relative z-10 w-full">
      {/* HERO */}
      <section
        id="home"
        className="relative min-h-dvh flex flex-col items-center justify-center px-6 pt-24 md:pt-28 scroll-mt-24"
      >
        <div className="w-full max-w-2xl text-center">

          {/* Position label */}
          <p className="text-[9px] md:text-[11px] font-mono tracking-normal md:tracking-ultra uppercase text-fg/40 mb-9">
            Desarrollador &middot; Ciberseguridad
          </p>

          {/* Name */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-normal md:tracking-wider uppercase leading-tight text-center text-fg/95 mb-10">
            Franco Villagra
          </h1>

          {/* Phrase */}
          <p className="text-sm md:text-lg text-fg/70 leading-relaxed mb-14 max-w-lg mx-auto px-4 md:px-0">
            Construyo software. Aprendo a defenderlo.
          </p>

          {/* Tech icons */}
          <div className="mt-14">
            <TechMarquee />
          </div>

          {/* Scroll cue */}
          <p className="mt-12 text-fg/30 text-[11px] font-mono tracking-widest">
            ↓ SCROLL
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative min-h-dvh scroll-mt-24">
        <AboutSection />
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative min-h-dvh scroll-mt-24">
        <ProjectsSection />
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative scroll-mt-24">
        <SkillsSection />
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative scroll-mt-24">
        <ContactSection />
      </section>
    </main>
  );
}