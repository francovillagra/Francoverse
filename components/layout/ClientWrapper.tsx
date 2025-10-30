"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

type VariantSet = {
  initial: object;
  animate: object;
  exit: object;
};

function getVariants(): VariantSet {
  // Slide lateral sutil (sin “pantalla negra”)
  return {
    initial: { opacity: 0, x: 60 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -40,
      transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
    },
  };
}

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 🔒 Normaliza la key: sin hash ni query
  const routeKey = useMemo(
    () => pathname.replace(/[#?].*$/, ""),
    [pathname]
  );

  const variants = useMemo(() => getVariants(), [routeKey]);

  return (
    // 👇 Sin mode="wait" para que no haya “vacío” entre páginas
    <AnimatePresence initial={false}>
      <motion.div
        key={routeKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="w-full h-dvh will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
