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
          Soy <span className="text-fg/90 font-medium">Desarrollador Full Stack</span> especializado en seguridad de aplicaciones web. Construyo con <span className="text-fg/90">TypeScript/Next.js y Python/FastAPI</span>, con la seguridad como requisito en todo el ciclo de vida del software (SDLC), y pruebo lo que construyo antes de darlo por bueno. Vengo de 8 años como auditor externo en el sector público: verificar con evidencia es mi oficio. Estudio la Licenciatura en Ciberdefensa (FADENA), sobre una base de Desarrollo Full Stack (UTN). Mis proyectos son públicos en GitHub, con el código a la vista.
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
            Seguridad de aplicaciones web en todo el SDLC, del diseño al deploy.
          </p>
        </div>

      </div>
    </div>
  );
}
