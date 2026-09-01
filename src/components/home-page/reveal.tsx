"use client";

import { motion, type UseInViewOptions } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const defaultRevealViewport: UseInViewOptions = { once: true, amount: 0.18 };
const defaultStaggerViewport: UseInViewOptions = { once: true, amount: 0.12 };

export function Reveal({
  children,
  className,
  delay = 0,
  viewport,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  viewport?: UseInViewOptions;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...defaultRevealViewport, ...viewport }}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  viewport,
}: {
  children: React.ReactNode;
  className?: string;
  viewport?: UseInViewOptions;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ ...defaultStaggerViewport, ...viewport }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
