// components/layout/ClientWrapper.tsx
"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const easeOut: number[] = [0.16, 1, 0.3, 1]; // en lugar de "ease: 'easeOut'"
  const easeIn: number[] = [0.4, 0, 1, 1];

  const variants: Variants = getVariants(pathname, easeOut, easeIn);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="relative z-10 w-full h-dvh"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function getVariants(pathname: string, easeOut: number[], easeIn: number[]): Variants {
  if (pathname.startsWith("/section/projects")) {
    return {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: easeOut } },
      exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: easeIn } },
    };
  }
  if (pathname.startsWith("/section/skills")) {
    return {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: easeOut } },
      exit: { opacity: 0, x: -16, transition: { duration: 0.2, ease: easeIn } },
    };
  }
  if (pathname.startsWith("/section/about")) {
    return {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
      exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: easeIn } },
    };
  }
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.28, ease: easeOut } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: easeIn } },
  };
}
