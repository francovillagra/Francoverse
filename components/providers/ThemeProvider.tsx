// components/providers/ThemeProvider.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

/**
 * Modo día/noche. Al entrar manda el sistema; el botón de la barra guarda la elección en este navegador.
 * Las clases de <html> son `t-day` y `t-night` (las paletas están en app/globals.css). Los cambios de color
 * se animan (no se usa `disableTransitionOnChange`); con "reducir movimiento" la hoja de estilos los anula.
 */
export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider attribute="class" value={{ light: "t-day", dark: "t-night" }} defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
