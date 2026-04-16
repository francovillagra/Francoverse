"use client";

import { useEffect, useMemo, useState } from "react";

export default function Stats({
  startYear = 2023,
  projectsCount = 0,
  happyClients = 0,
}: {
  startYear?: number;
  projectsCount?: number;
  happyClients?: number;
}) {
  const [visits, setVisits] = useState(0);

  const years = useMemo(() => {
    const now = new Date();
    return Math.max(0, now.getFullYear() - startYear);
  }, [startYear]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "francoverse_visits";
    const prev = Number(localStorage.getItem(key) || "0");
    const next = prev + 1;
    localStorage.setItem(key, String(next));
    setVisits(next);
  }, []);

  const items = [
    { label: "Visitas", value: visits },
    { label: "Años de experiencia", value: years },
    { label: "Proyectos", value: projectsCount },
    { label: "Clientes felices", value: happyClients },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      {items.map((it) => (
        <div key={it.label} className="rounded-2xl border p-4 text-center shadow-sm">
          <div className="text-3xl font-bold tabular-nums">{it.value}</div>
          <div className="text-sm opacity-80">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
