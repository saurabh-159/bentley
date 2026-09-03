"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { productPath } from "@/lib/catalog";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const platforms = [
  {
    name: "Bentley Systems",
    description:
      "Infrastructure engineering and digital solutions for the infrastructure lifecycle.",
  },
  {
    name: "BricsCAD",
    description:
      "Professional CAD, BIM and design technology for modern engineering teams.",
  },
  {
    name: "GstarCAD",
    description:
      "Professional DWG-based CAD solutions for architecture, engineering and design.",
  },
  {
    name: "AX3000 MEP",
    description:
      "Engineering software for MEP design and building services workflows.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Technology Foundation
 * Content: Bentley Systems, BricsCAD, GstarCAD, AX3000 MEP
 * UI: Centered heading, four equal cards, brand border follows hover
 */
export function TechnologyFoundation() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section
      id="technology"
      className="scroll-mt-24 border-t border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase">
              Technology Foundation
            </p>
            <h2 className="mt-2 font-heading text-[1.7rem] font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]">
              Powered by Leading
              <br className="hidden sm:block" /> Engineering Technology
            </h2>
            <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              We bring together established technology platforms and practical
              engineering expertise so you can make technology decisions with
              clarity.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-4">
          {platforms.map((platform, index) => {
            const selected = active === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <RevealItem key={platform.name}>
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.4, ease }}
                  onMouseEnter={() => setActive(index)}
                  onFocusCapture={() => setActive(index)}
                  className="h-full"
                >
                  <Link
                    href={productPath(platform.name)}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-xl border bg-background px-5 py-4 transition-[border-color,box-shadow] duration-300 sm:px-5 sm:py-4",
                      selected
                        ? "border-brand shadow-[0_16px_32px_-24px_oklch(0.605_0.233_27_/_0.55)]"
                        : "border-border/80 hover:border-brand/35"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 top-0 h-[2px] origin-left bg-brand transition-transform duration-500 ease-out",
                        selected ? "scale-x-100" : "scale-x-0"
                      )}
                    />

                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute right-3 top-2.5 select-none font-heading text-[2.75rem] leading-none font-semibold tracking-tight transition-colors duration-500",
                        selected
                          ? "text-brand/[0.1]"
                          : "text-foreground/[0.06]"
                      )}
                    >
                      {number}
                    </span>

                    <h3 className="relative z-[1] pr-12 font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl sm:leading-snug">
                      {platform.name}
                    </h3>

                    <p className="relative z-[1] mt-2 text-sm leading-5 text-muted-foreground">
                      {platform.description}
                    </p>

                    <span
                      className={cn(
                        "relative z-[1] mt-3 inline-flex h-4 items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-brand uppercase transition-opacity duration-300",
                        selected
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      )}
                    >
                      Explore platform
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
