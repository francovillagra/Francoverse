// components/ui/ParticlesBackground.tsx
"use client";

import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";

export default function ParticlesBackground() {
  const { resolvedTheme } = useTheme();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // 🎨 Colores por tema
  const color = resolvedTheme === "dark" ? "#ffffff" : "#141414";
  const linkOpacity = resolvedTheme === "dark" ? 0.25 : 0.18;

  // ⚙️ Opciones dependientes del tema
  const options: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: true, zIndex: 0 }, // por encima del background del body, por debajo de tu contenido (z-10/z-20)
    background: { color: "transparent" },
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 140 },
        push: { quantity: 4 },
      },
    },
    particles: {
      number: { value: 120, density: { enable: true, area: 800 } },
      color: { value: color },
      links: { enable: true, distance: 150, opacity: linkOpacity, width: 1, color },
      move: { enable: true, speed: 0.8, outModes: { default: "out" } },
      opacity: { value: resolvedTheme === "dark" ? 0.5 : 0.45 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
  // 👇 reconfigura automáticamente cuando cambia el tema
  }), [resolvedTheme, color, linkOpacity]);

  return (
    // pointer-events-none para no bloquear clics; el canvas ya se posiciona full screen por su cuenta
    <Particles id="tsparticles" init={particlesInit} options={options} className="pointer-events-none" />
  );
}
