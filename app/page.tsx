import Hero from "@/components/site/Hero";
import ServiceSection from "@/components/site/ServiceSection";
import ProjectsSection from "@/components/site/ProjectsSection";
import ContactSection from "@/components/site/ContactSection";

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <ServiceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
