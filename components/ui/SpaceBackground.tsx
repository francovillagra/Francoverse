"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  layer: 0 | 1 | 2;
};

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);


    // Ajustables
    const STAR_COUNT = 520;
    const SPEED_BASE = 2.2;
    const ROT_SPEED = 0.0012;
    const TRAILS_ALPHA = 0.22;
    const FOV = 0.95;
    const MOUSE_INFLUENCE = 140;

    const layerSpeed = [0.85, 1.0, 1.25] as const;

    const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => {
      const layer = (Math.random() < 0.55 ? 0 : Math.random() < 0.82 ? 1 : 2) as 0 | 1 | 2;
      return {
        x: (Math.random() - 0.5) * w,
        y: (Math.random() - 0.5) * h,
        z: Math.random() * w + 1,
        px: 0,
        py: 0,
        layer,
      };
    });

    let angle = 0;
    let raf = 0;

    const resetStar = (s: Star) => {
      s.x = (Math.random() - 0.5) * w;
      s.y = (Math.random() - 0.5) * h;
      s.z = w + Math.random() * (w * 0.35);
      s.px = 0;
      s.py = 0;
      s.layer = (Math.random() < 0.55 ? 0 : Math.random() < 0.82 ? 1 : 2) as 0 | 1 | 2;
    };

    const animate = () => {
      // “Persistencia” para trails
      ctx.fillStyle = `rgba(0,0,0,${TRAILS_ALPHA})`;
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      angle += ROT_SPEED;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      for (const s of stars) {
        const sp = SPEED_BASE * layerSpeed[s.layer];
        s.z -= sp;

        if (s.z <= 2) {
          resetStar(s);
          continue;
        }

        // rotación XY (swirl)
        const rx = s.x * cosA - s.y * sinA;
        const ry = s.x * sinA + s.y * cosA;

        // proyección
        const k = (w * FOV) / s.z;
        const x = cx + rx * k;
        const y = cy + ry * k;

        const baseR = (1 - s.z / (w * 1.1)) * (2.2 + s.layer * 1.2);
        const r = Math.max(0.2, baseR);

        const alpha = Math.min(1, 0.25 + (1 - s.z / w) * 0.9);

        // trail
        if (s.px !== 0 || s.py !== 0) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.55})`;
          ctx.lineWidth = Math.max(0.6, r * 0.75);
          ctx.beginPath();
          ctx.moveTo(s.px, s.py);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // estrella
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        s.px = x;
        s.py = y;

        if (x < -120 || x > w + 120 || y < -120 || y > h + 120) resetStar(s);
      }

      raf = requestAnimationFrame(animate);
    };

    // init
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);


    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}