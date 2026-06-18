'use client';

export default function TopNav() {
  const sections = [
    { id: 'home',     label: 'HOME' },
    { id: 'about',    label: 'SOBRE MÍ' },
    { id: 'projects', label: 'PROYECTOS' },
    { id: 'contact',  label: 'CONTACTO' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-line">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo/Initials */}
        <button
          onClick={() => scrollToSection('home')}
          className="text-xs font-mono tracking-widest text-fg/90 hover:text-fg transition-colors"
        >
          FV
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="text-[11px] font-normal tracking-widest text-fg/50 hover:text-fg/90 transition-colors"
            >
              {section.label}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
}
