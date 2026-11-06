"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

/**
 * Interruptor del modo nocturno. Al entrar por primera vez manda el modo del sistema; al tocar el botón se
 * guarda la elección en este navegador (next-themes, en localStorage). Cómo se dibuja el interruptor lo
 * decide la clase de <html> (ver app/globals.css), así que es correcto desde el primer cuadro.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // En el servidor y durante la hidratación todavía no se sabe qué modo quedó activo.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const night = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="theme"
      aria-pressed={night}
      onClick={() => setTheme(document.documentElement.classList.contains("t-night") ? "light" : "dark")}
    >
      <span className="track" aria-hidden="true">
        <span className="knob" />
      </span>
      <span className="label">Modo nocturno</span>
    </button>
  );
}
