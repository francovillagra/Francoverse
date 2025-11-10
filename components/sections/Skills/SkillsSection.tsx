'use client';

import Container from '@/components/ui/Container';
import Title from '@/components/ui/Title';
import Paragraph from '@/components/ui/Paragraph';

export default function SkillsSection() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center
  bg-white/80 dark:bg-[#030014]/95 backdrop-blur px-6
  text-neutral-900 dark:text-white transition-colors">

      <Container>
        <Title>Habilidades</Title>
        <Paragraph>
          Tengo experiencia en el desarrollo Fullstack: desde interfaces modernas con React y Tailwind, hasta APIs robustas con Node.js, Express y bases de datos SQL/NoSQL. También he trabajado con herramientas de CI/CD y despliegue en la nube.
        </Paragraph>
      </Container>
    </section>
  );
}
