'use client';

import { Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  repoUrl?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Francoverse',
    description: 'Portfolio personal diseñado para presentar mis proyectos, tecnologías y evolución profesional de una forma visual, moderna e interactiva.',
    image: '/projects/francoverse.jpg',
    repoUrl: 'https://github.com/francovillagra',
  },
  {
    id: '2',
    title: 'Challenge Telecom X',
    description: 'Proyecto de análisis de datos orientado a estudiar la evasión de clientes, detectar patrones y transformar datos en información útil para la toma de decisiones.',
    image: '/projects/telecom.jpg',
    repoUrl: 'https://github.com/francovillagra',
  },
  {
    id: '3',
    title: 'Somos Equipo',
    description: 'Plataforma colaborativa diseñada para facilitar la gestión de equipos, proyectos y comunicación interna de forma eficiente y escalable.',
    image: '/projects/somosequipo.svg',
    repoUrl: 'https://github.com/francovillagra/somosequipo',
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
              <div className="aspect-video bg-bg-elevated overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                />
              </div>
            )}

            <div className="p-6">
              <h3 className="text-lg font-medium text-fg/90 mb-3">
                {project.title}
              </h3>
              <p className="text-sm text-fg/60 leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex items-center gap-3">
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
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
