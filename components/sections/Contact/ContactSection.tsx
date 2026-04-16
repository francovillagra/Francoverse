'use client';

import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-10
  bg-white/80 text-neutral-900 dark:bg-[#030014]/95 dark:text-white backdrop-blur
  transition-colors">

      <h2 className="text-4xl font-bold mb-6">Contacto</h2>
      <p className="max-w-xl text-center mb-8 text-gray-300">
        ¿Querés conectar conmigo? Podés enviarme un email o visitar mis perfiles en redes sociales.
      </p>
      <div className="flex flex-col items-center space-y-4 text-lg">
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-purple-500" />
          <a href="mailto:franco@example.com" className="hover:underline">
            franco@example.com
          </a>
        </div>
        <div className="flex gap-6 text-2xl">
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-purple-500">
            <FaLinkedin />
          </a>
          <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-purple-500">
            <FaGithub />
          </a>
          <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-purple-500">
            <FaTwitter />
          </a>
        </div>
      </div>
    </section>
  );
}
