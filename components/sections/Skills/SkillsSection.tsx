"use client";

import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import Paragraph from "@/components/ui/Paragraph";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Habilidades"
      className="min-h-dvh w-full flex items-center justify-center px-6 py-20 scroll-mt-24 text-white"
    >
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <Title>Habilidades</Title>

          <Paragraph>
            Cuento con una base sólida en desarrollo fullstack, combinando
            tecnologías de frontend y backend para construir aplicaciones
            modernas, funcionales y escalables.
          </Paragraph>

          <Paragraph>
            Trabajo con herramientas como{" "}
            <span className="font-semibold text-white">
              JavaScript, TypeScript, React, Next.js, Node.js, Python, SQL,
              MongoDB, Tailwind CSS y Git
            </span>
            , integrando lógica, estructura y experiencia de usuario en una
            misma solución.
          </Paragraph>

          <Paragraph>
            Además, continúo fortaleciendo mi perfil en{" "}
            <span className="font-semibold text-white">
              seguridad informática, ciberdefensa, inteligencia artificial
              aplicada y cloud
            </span>
            , con el objetivo de evolucionar hacia un perfil técnico cada vez
            más completo y especializado.
          </Paragraph>
        </div>
      </Container>
    </section>
  );
}