"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

type VariantSet = {
  initial: object;
  animate: object;
  exit: object;
};

// 🌫️ Transición Fade ultra sutil (simple y elegante)
function getVariants(): VariantSet {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.22, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.18, ease: "easeIn" },
    },
  };
}

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 🔒 Normaliza la key: sin hash ni query
  const routeKey = useMemo(() => pathname.replace(/[#?].*$/, ""), [pathname]);

  const variants = useMemo(() => getVariants(), [routeKey]);

  return (
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
