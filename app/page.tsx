import TechMarquee from "@/components/ui/TechMarquee";
import AboutSection from "@/components/sections/About/AboutSection";
import ProjectsSection from "@/components/sections/Projects/ProjectsSection";
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
          <p className="text-[9px] md:text-[11px] font-mono tracking-normal md:tracking-ultra uppercase text-fg/60 mb-9">
            Full Stack Developer &middot; Seguridad Aplicada
          </p>

          {/* Name */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-normal md:tracking-wider uppercase leading-tight text-center text-fg/95 mb-10">
            Franco Villagra
          </h1>

          {/* Phrase */}
          <p className="text-sm md:text-lg text-fg/70 leading-relaxed mb-6 max-w-lg mx-auto px-4 md:px-0">
            Construyo software. Lo defiendo.
          </p>

          <a
            href="/cv-franco-villagra.pdf"
            download="CV-Franco-Villagra.pdf"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 border border-line bg-transparent text-fg hover:bg-fg/10 hover:border-fg/30 transition-all rounded-lg font-mono text-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Descargar CV
          </a>

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

      {/* CONTACT */}
      <section id="contact" className="relative scroll-mt-24">
        <ContactSection />
      </section>
    </main>
  );
}