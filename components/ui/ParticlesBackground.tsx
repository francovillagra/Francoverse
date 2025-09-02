"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = {
    // Captura el mouse aunque el canvas no reciba eventos directamente
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
    fpsLimit: 60,
    detectRetina: true,
    background: { color: "transparent" },
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: "#ffffff" },
      links: { enable: true, distance: 150, opacity: 0.2, width: 1, color: "#ffffff" },
      move: { enable: true, speed: 1, outModes: { default: "out" } },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
  };

  // wrapper fijo a pantalla, detrás de todo y sin capturar eventos
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Particles id="tsparticles" init={particlesInit} options={options} />
    </div>
  );
}
