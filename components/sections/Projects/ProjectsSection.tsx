'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { skills } from '@/data/skills';
import projects from '@/data/projects';
import ProjectCard from './ProjectCard';

const ICONS: Record<string, string> = {
  'Next.js':    '▲',
  'TypeScript': 'TS',
  'React':      '⚛',
  'Python':     'Py',
  'FastAPI':    'FA',
  'Tailwind':   '≋',
  'JWT':        'JWT',
};

const featuredCount = projects.filter(p => p.featured).length;

export default function ProjectsSection() {
  const [active, setActive]   = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const shouldReduceMotion    = useReducedMotion();

  const toggle = (name: string) =>
    setActive(prev => (prev === name ? null : name));

  const activeSkill = skills.find(s => s.name === active) ?? null;

  const displayed = activeSkill
    ? projects.filter(p => activeSkill.match.some(m => p.technologies.includes(m)))
    : projects.filter(p => p.featured);

  return (
    <div className="min-h-dvh flex flex-col justify-center px-6 py-20 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-fg/95">
          Proyectos
        </h2>
        <Link
          href="/proyectos"
          className="text-xs font-mono tracking-wider uppercase text-fg/50 hover:text-fg/80 transition-colors border border-line px-4 py-2 rounded"
        >
          Ver todos
        </Link>
      </div>

      {/* Skill tiles */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 max-w-3xl mx-auto">
        {skills.map(skill => {
          const count       = projects.filter(p => skill.match.some(m => p.technologies.includes(m))).length;
          const isActive    = active === skill.name;
          const isHighlight = isActive || hovered === skill.name;

          return (
            <button
              key={skill.name}
              aria-pressed={isActive}
              onClick={() => toggle(skill.name)}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              style={{ '--c': skill.color } as React.CSSProperties}
              className={[
                'relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                isActive
                  ? 'border-[rgba(var(--c),0.6)] shadow-[0_8px_32px_-8px_rgba(var(--c),0.45)]'
                  : 'border-white/10 hover:border-[rgba(var(--c),0.4)] hover:shadow-[0_8px_24px_-8px_rgba(var(--c),0.3)]',
              ].join(' ')}
            >
              <span
                className="text-xl font-light transition-colors duration-200 leading-none"
                style={isHighlight ? { color: `rgb(var(--c))` } : { color: 'rgb(161,161,170)' }}
              >
                {ICONS[skill.name] ?? skill.name.slice(0, 2)}
              </span>
              <span
                className="text-[10px] font-mono tracking-wider uppercase leading-tight text-center transition-colors duration-200"
                style={isHighlight ? { color: 'rgb(244,244,245)' } : { color: 'rgb(161,161,170)' }}
              >
                {skill.name}
              </span>
              <span
                className="text-[9px] font-mono"
                style={{ color: 'rgb(161,161,170)' }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Status bar */}
      <div className="mt-10 max-w-3xl mx-auto flex items-center justify-between text-xs font-mono">
        {activeSkill ? (
          <>
            <span className="text-zinc-400">
              <span style={{ color: `rgb(${activeSkill.color})` }}>{activeSkill.name}</span>
              {' '}· usada en{' '}
              <span className="text-zinc-300">{displayed.length}</span>
              {' '}{displayed.length === 1 ? 'proyecto' : 'proyectos'}
            </span>
            <button
              onClick={() => setActive(null)}
              className="text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-2"
            >
              Limpiar
            </button>
          </>
        ) : (
          <span className="text-zinc-400">
            Proyectos destacados · <span className="text-zinc-300">{featuredCount}</span>
          </span>
        )}
      </div>

      {/* Results grid */}
      <motion.div
        layout={!shouldReduceMotion}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayed.map(project => (
            <motion.div
              key={project.id}
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard
                {...project}
                highlightTechs={activeSkill?.match}
                highlightColor={activeSkill?.color}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
