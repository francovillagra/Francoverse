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

  const isDark = resolvedTheme === "dark";
  const color = isDark ? "#ffffff" : "#141414";
  const linkOpacity = isDark ? 0.25 : 0.18;

  const options: ISourceOptions = useMemo(
    () => ({
      detectRetina: true,
      background: { color: "transparent" },
      fpsLimit: 60,

      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          repulse: { distance: 140, duration: 0.4 },
          push: { quantity: 4 },
        },
      },

      particles: {
        number: { value: 150, density: { enable: true, area: 800 } },
        color: { value: color },
        links: { enable: true, distance: 150, opacity: linkOpacity, width: 1.2, color },
        move: { enable: true, speed: 0.8, outModes: { default: "out" } },
        opacity: { value: isDark ? 0.5 : 0.45 },
        shape: { type: "circle" },
        size: { value: { min: 1.5, max: 3.5 } },
      },
    }),
    [isDark, color, linkOpacity]
  );

  return (
    <div className="fixed inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}