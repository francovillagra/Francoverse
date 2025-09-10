// components/layout/ClientWrapper.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} variants={variants} initial="initial" animate="animate" exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
