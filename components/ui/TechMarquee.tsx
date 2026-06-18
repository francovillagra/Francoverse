'use client';

import { techColors } from '@/data/techColors';

const techs = [
  { name: 'React',      Icon: () => <i className="text-2xl">⚛</i> },
  { name: 'Next.js',    Icon: () => <span className="text-2xl font-bold">N</span> },
  { name: 'TypeScript', Icon: () => <span className="text-xl font-bold">TS</span> },
  { name: 'Node.js',    Icon: () => <span className="text-2xl">⬢</span> },
  { name: 'Python',     Icon: () => <span className="text-2xl">🐍</span> },
  { name: 'Tailwind',   Icon: () => <span className="text-2xl">〰</span> },
];

export default function TechMarquee() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-9">
      {techs.map(({ name, Icon }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2"
          style={{ color: `rgb(${techColors[name]})` }}
        >
          <Icon />
          <span className="text-[10px] font-mono tracking-wider uppercase opacity-90">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
