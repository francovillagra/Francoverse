"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // components/ui/ParticlesBackground.tsx (fragmento)
const options: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 0 },
  background: { color: "transparent" },
  fpsLimit: 60,
  detectRetina: true,
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: { distance: 120 },
      push: { quantity: 2 },
    },
  },
  particles: {
    number: { value: 60, density: { enable: true, area: 1000 } },
    color: { value: "#ffffff" },
    links: { enable: true, distance: 140, opacity: 0.18, width: 1 }, // si querés aún más perf: links.enable = false
    move: { enable: true, speed: 0.6, outModes: { default: "out" } },
    opacity: { value: 0.45 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2.4 } },
  },
};


  // className aplica al contenedor de tsparticles; pointer-events none para no bloquear UI
  return <Particles id="tsparticles" init={particlesInit} options={options} className="pointer-events-none" />;
}
