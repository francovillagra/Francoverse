"use client";

import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";

export default function DustParticlesBackground() {
  const { resolvedTheme } = useTheme();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const color = resolvedTheme === "dark" ? "#ffffff" : "#141414";

  const options: ISourceOptions = useMemo(
    () => ({
      detectRetina: true,
      background: { color: "transparent" },
      fpsLimit: 60,
      interactivity: {
        events: {
          resize: true,
        },
        modes: {
          bubble: { distance: 120, size: 3, duration: 0.8, opacity: 0.35 },
        },
      },
      particles: {
        number: { value: 55, density: { enable: true, area: 900 } },
        color: { value: color },
        links: { enable: false }, // polvo, sin red
        move: { enable: true, speed: 0.18, outModes: { default: "out" } },
        opacity: { value: 0.18 },
        shape: { type: "circle" },
        size: { value: { min: 0.6, max: 1.4 } },
      },
    }),
    [resolvedTheme, color]
  );

  return (
    <Particles
      id="dust"
      init={particlesInit}
      options={options}
      className="absolute inset-0 w-full h-full"
    />
  );
}