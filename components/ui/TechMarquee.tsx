'use client';

export default function TechMarquee() {
  const techs = [
    { name: 'React',      Icon: () => <i className="text-2xl opacity-70">⚛</i> },
    { name: 'Next.js',    Icon: () => <span className="text-2xl font-bold opacity-70">N</span> },
    { name: 'TypeScript', Icon: () => <span className="text-xl font-bold opacity-70">TS</span> },
    { name: 'Node.js',    Icon: () => <span className="text-2xl opacity-70">⬢</span> },
    { name: 'Python',     Icon: () => <span className="text-2xl opacity-70">🐍</span> },
    { name: 'Tailwind',   Icon: () => <span className="text-2xl opacity-70">〰</span> },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-9">
      {techs.map((tech) => (
        <div
          key={tech.name}
          className="flex flex-col items-center gap-2 text-fg/60 hover:text-fg/95 transition-colors"
        >
          <tech.Icon />
          <span className="text-[10px] font-mono tracking-wider uppercase opacity-90">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
