"use client";

import { Mail, Linkedin, Github } from "lucide-react";

const contactItems = [
  {
    label: "Email",
    value: "fr4nconv@gmail.com",
    href: "mailto:fr4nconv@gmail.com",
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
    <div className="flex-1 flex flex-col justify-end px-6 pb-12 max-w-5xl mx-auto">

      <div className="max-w-3xl mb-10">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-fg/95">
          Contacto
        </h2>
        <p className="mt-4 text-fg/60 text-base leading-relaxed">
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
              <Icon size={16} className="text-fg/50 group-hover:text-fg/70 transition-colors" />
              <span className="text-xs font-mono tracking-widest uppercase text-fg/40">
                {label}
              </span>
            </div>

            <p className="mt-4 text-sm text-fg/70 group-hover:text-fg/90 transition-colors break-words">
              {value}
            </p>
          </a>
        ))}
      </div>

    </div>
  );
}