// components/ui/Paragraph.tsx
"use client";

import { PropsWithChildren } from "react";

export default function Paragraph({ children }: PropsWithChildren) {
  return <p className="text-white/80 leading-relaxed">{children}</p>;
}
