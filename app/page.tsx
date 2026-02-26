"use client";

export default function Home() {
  return (
    <main className="relative z-10 w-full">
      {/* HERO */}
      <section
        id="home"
        className="min-h-dvh grid place-items-center px-6 scroll-mt-24"
      >
        <div className="max-w-3xl text-center space-y-6">
          <p className="uppercase tracking-[0.2em] text-white/60 text-sm">
            Portafolio
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Francoverse
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80">
            Desarrollador <span className="font-semibold">Fullstack</span> — React •
            Next.js • Node
          </p>
          <p className="text-white/70">
            Usá los botones de la esquina superior para navegar entre secciones.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-dvh px-6 py-20 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Sobre mí</h2>
          <p className="mt-4 text-white/70">
            {/* TODO: pegar contenido de /section/about acá */}
            Contenido en construcción.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="min-h-dvh px-6 py-20 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Proyectos</h2>
          <p className="mt-4 text-white/70">
            {/* TODO: pegar contenido de /section/projects acá */}
            Contenido en construcción.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="min-h-dvh px-6 py-20 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Habilidades</h2>
          <p className="mt-4 text-white/70">
            {/* TODO: pegar contenido de /section/skills acá */}
            Contenido en construcción.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-dvh px-6 py-20 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Contacto</h2>
          <p className="mt-4 text-white/70">
            Contenido en construcción.
          </p>
        </div>
      </section>
    </main>
  );
}