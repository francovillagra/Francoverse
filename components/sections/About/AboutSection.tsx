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
          Soy <span className="text-fg/90 font-medium">Desarrollador Full Stack</span>: construyo aplicaciones web aplicando ciberseguridad desde el diseño. Expongo vulnerabilidades construyendo herramientas ofensivas, para neutralizarlas. Combino desarrollo en <span className="text-fg/90">TypeScript/Next.js y Python/FastAPI</span> con seguridad a lo largo de todo el ciclo de vida del software (SDLC). Actualmente estudio la Licenciatura en Ciberdefensa (FADENA), con base sólida en Desarrollo Full Stack (UTN). Todos mis proyectos están desplegados en producción, construidos con estándares profesionales de seguridad.
        </p>
      </div>

      {/* 3-column cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <div className="border border-line bg-transparent rounded-lg p-6">
          <h3 className="text-sm font-mono tracking-widest uppercase text-fg/60 mb-3">
            Formación
          </h3>
          <p className="text-sm text-fg/70 leading-relaxed">
            Desarrollo Full Stack (UTN). Lic. en Ciberdefensa en curso (FADENA).
          </p>
        </div>

        <div className="border border-line bg-transparent rounded-lg p-6">
          <h3 className="text-sm font-mono tracking-widest uppercase text-fg/60 mb-3">
            Stack
          </h3>
          <p className="text-sm text-fg/70 leading-relaxed">
            TypeScript y Next.js en web; Python y FastAPI en backend y tooling de seguridad.
          </p>
        </div>

        <div className="border border-line bg-transparent rounded-lg p-6">
          <h3 className="text-sm font-mono tracking-widest uppercase text-fg/60 mb-3">
            Foco
          </h3>
          <p className="text-sm text-fg/70 leading-relaxed">
            Seguridad en todo el SDLC: de la herramienta ofensiva al deploy.
          </p>
        </div>

      </div>
    </div>
  );
}
