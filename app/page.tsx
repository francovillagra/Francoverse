import TechMarquee from "@/components/ui/TechMarquee";
import AboutSection from "@/components/sections/About/AboutSection";
import ProjectsSectionServer from "@/components/sections/Projects/ProjectsSectionServer";
import SkillsSection from "@/components/sections/Skills/SkillsSection";
import ContactSection from "@/components/sections/Contact/ContactSection";

export default function Home() {
  return (
    <main className="relative z-10 w-full">
      {/* HERO */}
      <section
        id="home"
        className="relative min-h-dvh overflow-hidden grid place-items-center px-4 pt-24 md:px-6 md:pt-28 scroll-mt-24"
      >
        <div className="w-full max-w-2xl mx-auto text-center">

          {/* Position label */}
          <p className="text-[11px] font-mono tracking-ultra uppercase text-fg/40 mb-9">
            Desarrollador &middot; Ciberseguridad
          </p>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider uppercase leading-tight text-fg/95 mb-10">
            Franco Villagra
          </h1>

          {/* Phrase */}
          <p className="text-base md:text-lg text-fg/70 leading-relaxed mb-14 max-w-lg mx-auto">
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
        <ProjectsSectionServer featuredOnly limit={6} showViewAll />
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative min-h-dvh scroll-mt-24">
        <SkillsSection />
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative min-h-dvh scroll-mt-24">
        <ContactSection />
      </section>
    </main>
  );
}