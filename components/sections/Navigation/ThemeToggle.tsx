// components/navigation/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="ml-2 rounded-xl border border-white/15 bg-white/10 px-2 py-1 text-xs text-white/90 hover:bg-white/20 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      {isDark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
