'use client';

import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  repoUrl?: string;
  demoUrl?: string;
  stack?: string[];
}

const projects: Project[] = [
  {
    id: '3',
    title: 'API REST Securizada',
    description: 'API REST con autenticación JWT, rate limiting, security headers y logging. PostgreSQL + Upstash Redis.',
    image: '/api-security.png',
    repoUrl: 'https://github.com/francovillagra/auth-api-security',
    demoUrl: 'https://auth-api-production.vercel.app',
    stack: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', 'Upstash Redis'],
  },
];

export default function ProjectsSection() {
  return (
    <div className="min-h-dvh flex flex-col justify-center px-6 py-20 max-w-6xl mx-auto">

      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-fg/95">
          Proyectos
        </h2>
        <button className="text-xs font-mono tracking-wider uppercase text-fg/50 hover:text-fg/80 transition-colors border border-line px-4 py-2 rounded">
          Ver todos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-line bg-transparent rounded-lg overflow-hidden hover:border-line-strong transition-colors group"
          >
            {project.image && (
              <div className="relative aspect-video bg-bg-elevated overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                />
              </div>
            )}

            <div className="p-6">
              <h3 className="text-lg font-medium text-fg/90 mb-3">
                {project.title}
              </h3>
              <p className="text-sm text-fg/60 leading-relaxed mb-4">
                {project.description}
              </p>

              {project.stack && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-fg/50 border border-line px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-fg/70 hover:text-fg/95 transition-colors"
                  >
                    <Github size={14} />
                    Repo
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-fg/70 hover:text-fg/95 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
