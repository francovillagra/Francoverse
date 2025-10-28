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
    // Hace que el canvas se fije a pantalla completa con su propio z-index
    fullScreen: { enable: true, zIndex: 0 },
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
      number: { value: 120, density: { enable: true, area: 800 } }, // súbelo para verificar visual
      color: { value: "#ffffff" },
      links: { enable: true, distance: 150, opacity: 0.25, width: 1, color: "#ffffff" },
      move: { enable: true, speed: 0.8, outModes: { default: "out" } },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
  };

  // className aplica al contenedor de tsparticles; pointer-events none para no bloquear UI
  return <Particles id="tsparticles" init={particlesInit} options={options} className="pointer-events-none" />;
}
