"use client";

import { Mail, Linkedin, Github } from "lucide-react";

const contactItems = [
  {
    label: "Email",
    value: "fvillagra.dev@gmail.com",
    href: "mailto:fvillagra.dev@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/francovillagra",
    href: "https://github.com/francovillagra",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/franco-villagra",
    href: "https://linkedin.com/in/franco-villagra",
    icon: Linkedin,
  },
];

export default function ContactSection() {
  return (
    <div className="flex flex-col px-6 py-20 max-w-5xl mx-auto">

      <div className="max-w-3xl mb-10">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-fg/95">
          Contacto
        </h2>
        <p className="mt-4 text-fg/70 text-base leading-relaxed">
          Si te interesa mi perfil, querés conocer más sobre mis proyectos o
          explorar una oportunidad de trabajo, podés contactarme a través de
          estos canales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contactItems.map(({ label, value, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group border border-line rounded-lg p-5 transition-colors hover:border-line-strong"
          >
            <div className="flex items-center gap-3">
              <Icon size={16} className="text-fg/60 group-hover:text-fg/90 transition-colors" />
              <span className="text-xs font-mono tracking-widest uppercase text-fg/60">
                {label}
              </span>
            </div>

            <p className="mt-4 text-sm text-fg/70 group-hover:text-fg/90 transition-colors break-words">
              {value}
            </p>
          </a>
        ))}
      </div>

      {/* CV - Segunda fila */}
      <div className="mt-6 max-w-md mx-auto w-full">
        <a
          href="/cv-franco-villagra.pdf"
          download="CV-Franco-Villagra.pdf"
          className="border border-line bg-transparent rounded-lg p-6 hover:border-fg/30 hover:bg-fg/5 transition-all flex flex-col items-center text-center group w-full"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 text-fg/60 group-hover:text-fg transition-colors"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <h3 className="font-semibold text-lg mb-1">Curriculum Vitae</h3>
          <p className="text-fg/70 text-sm">Descargar PDF</p>
        </a>
      </div>

    </div>
  );
}