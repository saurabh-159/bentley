"use client";

import { motion } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function PageLoader() {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0c0c0c]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <div className="flex flex-col items-center px-6">
        <div className="flex size-16 items-center justify-center bg-brand">
          <span className="font-heading text-2xl font-bold text-brand-foreground">
            S
          </span>
        </div>

        <p className="mt-6 font-heading text-lg font-semibold tracking-[0.28em] text-white">
          SYNERGIC
        </p>
        <p className="mt-2 text-[10px] tracking-[0.22em] text-white/50 uppercase">
          Information Solutions
        </p>

        <div className="mt-10 h-[2px] w-44 overflow-hidden bg-white/15">
          <motion.div
            className="h-full origin-left bg-brand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.35, ease: easeOut }}
          />
        </div>
      </div>
    </motion.div>
  );
}
