"use client";

import { motion, useReducedMotion } from "motion/react";
import { Compass, Target } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/home-page/reveal";
import { aboutViewport } from "./in-view";

const values = [
  {
    label: "Our vision",
    icon: Compass,
    quote:
      "We supply CAD software and efficient solutions to enable customers to be at the top of their industries.",
  },
  {
    label: "Our mission",
    icon: Target,
    quote:
      "Gain the trust of our clients with industry knowledge, help them stay ahead of the competition, and handle future challenges with improved and optimised solutions.",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function AboutValues() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-muted/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <Reveal viewport={aboutViewport}>
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            <span className="inline-block h-px w-8 bg-brand" aria-hidden />
            How we work
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Vision and mission, in practice.
          </h2>
        </Reveal>

        <RevealStagger
          className="mt-8 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2"
          viewport={aboutViewport}
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <RevealItem key={value.label}>
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                  className="group relative h-full overflow-hidden bg-background px-6 py-8 sm:px-8 sm:py-10"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-6 right-4 font-heading text-[7rem] font-semibold leading-none text-foreground/[0.04] sm:text-[9rem]"
                  >
                    “
                  </span>
                  <span className="absolute top-0 left-0 h-[3px] w-0 bg-brand transition-[width] duration-500 ease-out group-hover:w-full" />

                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center border border-border bg-muted text-brand">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
                      {String(index + 1).padStart(2, "0")} · {value.label}
                    </p>
                  </div>

                  <blockquote className="relative mt-6 max-w-md font-heading text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl sm:leading-snug">
                    {value.quote}
                  </blockquote>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
