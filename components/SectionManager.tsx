'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from "./sections/Hero/HeroSection";
import SkillsSection from "./sections/Skills/SkillsSection";
import ProjectsSection from "./sections/Projects/ProjectsSection";

type Section = 'hero' | 'skills' | 'projects';

export default function SectionManager() {
  const [activeSection, setActiveSection] = useState<Section>('hero');

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroSection key="hero" />;
      case 'skills':
        return <SkillsSection key="skills" />;
      case 'projects':
        return <ProjectsSection key="projects" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030014] text-white flex flex-col items-center justify-center p-4">
      <nav className="flex space-x-4 mb-8">
        {(['hero', 'skills', 'projects'] as Section[]).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded ${
              activeSection === section ? 'bg-cyan-500' : 'bg-gray-700'
            } hover:opacity-80 transition`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
