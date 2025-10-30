"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

function getVariants(): Variants {
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
  const routeKey = useMemo(() => pathname.replace(/[#?].*$/, ""), [pathname]);
  const variants = useMemo<Variants>(() => getVariants(), [routeKey]);

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
