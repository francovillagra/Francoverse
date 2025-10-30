// components/ui/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function BackButton({
  fallbackHref = "/",
  label = "VOLVER",
}: { fallbackHref?: string; label?: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border transition hover:scale-[1.02] active:scale-[0.98]"
      aria-label={label}
    >
      ← {label}
    </button>
  );
}
