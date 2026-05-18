'use client';

export default function TechMarquee() {
  const techs = [
    { name: 'React',      Icon: () => <i className="text-2xl opacity-40">⚛</i> },
    { name: 'Next.js',    Icon: () => <span className="text-2xl font-bold opacity-40">N</span> },
    { name: 'TypeScript', Icon: () => <span className="text-xl font-bold opacity-40">TS</span> },
    { name: 'Node.js',    Icon: () => <span className="text-2xl opacity-40">⬢</span> },
    { name: 'Python',     Icon: () => <span className="text-2xl opacity-40">🐍</span> },
    { name: 'Tailwind',   Icon: () => <span className="text-2xl opacity-40">〰</span> },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-9">
      {techs.map((tech) => (
        <div
          key={tech.name}
          className="flex flex-col items-center gap-2 text-fg/40 hover:text-fg/60 transition-colors"
        >
          <tech.Icon />
          <span className="text-[10px] font-mono tracking-wider uppercase opacity-50">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
