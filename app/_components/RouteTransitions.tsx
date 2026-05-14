"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const variants = {
  initial: { opacity: 0, y: 8, filter: "blur(2px)" },
  enter:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit:    { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

export default function RouteTransitions({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname} // <- cambia al navegar
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="min-h-dvh"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
