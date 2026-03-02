"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
};

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let centerX = width / 2;
    let centerY = height / 2;

    const STAR_COUNT = 400;

    const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
    }));

    let animationId = 0;

    const animate = () => {
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= 2;

        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
          star.z = width;
        }

        const sx = centerX + (star.x / star.z) * width;
        const sy = centerY + (star.y / star.z) * height;

        const radius = Math.max(0.2, (1 - star.z / width) * 3);

        context.beginPath();
        context.arc(sx, sy, radius, 0, Math.PI * 2);
        context.fillStyle = "white";
        context.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}