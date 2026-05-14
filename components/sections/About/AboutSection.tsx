'use client';

export default function AboutSection() {
  return (
    <div className="min-h-dvh flex flex-col justify-center px-6 py-20 max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-fg/95 mb-6">
          Sobre mí
        </h2>
      </div>

      {/* Bio */}
      <div className="mb-16 max-w-3xl mx-auto space-y-6">
        <p className="text-base md:text-lg text-fg/70 leading-relaxed">
          Soy <span className="text-fg/90 font-medium">Franco Villagra</span>, desarrollador fullstack con formación en sistemas, desarrollo de software y arquitectura de aplicaciones, con una proyección cada vez más orientada a la Seguridad Informática.
        </p>
        <p className="text-base md:text-lg text-fg/70 leading-relaxed">
          Mi perfil combina una base sólida en <span className="text-fg/90">JavaScript, TypeScript, React, Next.js, Node.js, Python y bases de datos</span>, junto con un interés profundo por comprender cómo funcionan los sistemas, cómo se protegen y cómo pueden evolucionar de forma segura.
        </p>
        <p className="text-base md:text-lg text-fg/70 leading-relaxed">
          Actualmente continúo mi camino en ciberdefensa e inteligencia artificial aplicada, explorando la intersección entre desarrollo, automatización, análisis y seguridad para construir soluciones modernas, confiables y con propósito.
        </p>
      </div>

      {/* 3-column cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <div className="border border-line bg-transparent rounded-lg p-6">
          <h3 className="text-sm font-mono tracking-widest uppercase text-fg/50 mb-3">
            Base técnica
          </h3>
          <p className="text-sm text-fg/65 leading-relaxed">
            Formación en desarrollo full stack, arquitectura de aplicaciones y tecnologías modernas para construir soluciones web funcionales y escalables.
          </p>
        </div>

        <div className="border border-line bg-transparent rounded-lg p-6">
          <h3 className="text-sm font-mono tracking-widest uppercase text-fg/50 mb-3">
            Especialización
          </h3>
          <p className="text-sm text-fg/65 leading-relaxed">
            Orientación hacia Seguridad Informática, con interés en comprender, proteger y fortalecer sistemas, procesos y entornos digitales.
          </p>
        </div>

        <div className="border border-line bg-transparent rounded-lg p-6">
          <h3 className="text-sm font-mono tracking-widest uppercase text-fg/50 mb-3">
            Proyección
          </h3>
          <p className="text-sm text-fg/65 leading-relaxed">
            Evolución constante en ciberdefensa, inteligencia artificial aplicada y cloud, integrando desarrollo, análisis y seguridad en un mismo camino profesional.
          </p>
        </div>

      </div>
    </div>
  );
}
