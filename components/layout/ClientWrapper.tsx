"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

type VariantSet = {
  initial: object;
  animate: object;
  exit: object;
};

function getVariants(pathname: string) {
  if (pathname.startsWith("/section/projects")) {
    return { initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
      exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } },
    };
  }
  if (pathname.startsWith("/section/skills")) {
    return { initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
      exit: { opacity: 0, x: -16, transition: { duration: 0.2, ease: "easeIn" } },
    };
  }
  if (pathname.startsWith("/section/about")) {   // <- antes era /section/hero
    return { initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
      exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } },
    };
  }
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };
}


export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const variants = useMemo(() => getVariants(pathname), [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="w-full h-dvh" // cada page debe encajar en 1 pantalla
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
