"use client";

import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const contactItems = [
  {
    label: "Email",
    value: "fr4nconv@gmail.com",
    href: "mailto:fr4nconv@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "GitHub",
    value: "github.com/francovillagra",
    href: "https://github.com/francovillagra",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/franco-villagra",
    href: "https://linkedin.com/in/franco-villagra",
    icon: FaLinkedin,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contacto"
      className="min-h-dvh w-full px-6 py-20 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contacto</h2>
          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
            Si te interesa mi perfil, querés conocer más sobre mis proyectos o
            explorar una oportunidad de trabajo, podés contactarme a través de
            estos canales.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactItems.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-3">
                <Icon className="text-xl text-white/85 transition group-hover:scale-110" />
                <span className="text-sm uppercase tracking-[0.18em] text-white/45">
                  {label}
                </span>
              </div>

              <p className="mt-4 text-sm md:text-base text-white/80 break-words">
                {value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}