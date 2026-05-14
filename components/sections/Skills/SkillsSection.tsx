'use client';

export default function SkillsSection() {
  const skills = [
    { name: 'React',      icon: '⚛' },
    { name: 'Next.js',    icon: '▲' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Node.js',    icon: '⬢' },
    { name: 'Python',     icon: 'Py' },
    { name: 'Tailwind',   icon: '〰' },
    { name: 'JavaScript', icon: 'JS' },
    { name: 'Git',        icon: '⎇' },
  ];

  return (
    <div className="flex flex-col justify-center px-6 py-20 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-fg/95 mb-6">
          Habilidades
        </h2>
        <p className="text-base text-fg/60 leading-relaxed">
          Explorá tecnologías y descubrí en qué proyectos las apliqué.
        </p>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center gap-3 text-fg/40 hover:text-fg/70 transition-colors cursor-default"
          >
            <div className="text-3xl font-light">
              {skill.icon}
            </div>
            <span className="text-xs font-mono tracking-wider uppercase">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-16 text-center text-xs text-fg/40 font-mono tracking-wider">
        Seleccioná una tecnología para ver los proyectos donde la utilicé.
      </p>

    </div>
  );
}
