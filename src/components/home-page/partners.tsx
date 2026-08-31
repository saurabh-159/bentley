"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const partners = [
  { name: "Bentley Systems", role: "Infrastructure engineering", mark: "BS" },
  { name: "Studio ARS", role: "Civil design", mark: "SA" },
  { name: "CGS LABS", role: "Rail and road", mark: "CG" },
  { name: "EDV Software", role: "Building services", mark: "ED" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/**
 * Partners
 * Content: Synergic — Bentley Systems, Studio ARS, CGS LABS, EDV Software
 * UI: Bentley — logo wall, large names, quiet roles, scroll reveal from below
 */
export function Partners() {
  const reduceMotion = useReducedMotion();

  const headingReveal = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };

  const itemReveal = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.35 } },
      }
    : {
        hidden: { opacity: 0, y: 72 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease },
        },
      };

  return (
    <section className="border-y border-border bg-muted/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-7">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.45 }}
          variants={{
            hidden: headingReveal.hidden,
            show: {
              ...headingReveal.show,
              transition: { duration: 0.65, ease },
            },
          }}
        >
          <SectionHeading
            label="OEM partners"
            labelClassName="text-sm tracking-[0.16em]"
            title="The software we stand behind"
            description="Authorized distribution and local support for the platforms Indian AEC teams actually run."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={listVariants}
          className="mt-4 grid grid-cols-2 border border-border bg-background lg:grid-cols-4"
        >
          {partners.map((partner, index) => (
            <motion.article
              key={partner.name}
              variants={itemReveal}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.35, ease }}
              className={cn(
                "group relative min-w-0 overflow-hidden px-4 py-5 sm:px-6 sm:py-6",
                index % 2 === 0 && "border-r border-border",
                index < 2 && "max-lg:border-b max-lg:border-border",
                "lg:border-r lg:border-border lg:last:border-r-0"
              )}
            >
              <span className="absolute top-0 left-0 h-[2px] w-0 bg-brand transition-[width] duration-500 ease-out group-hover:w-full" />

              <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>

              <p
                aria-hidden
                className="pointer-events-none absolute top-4 right-4 font-heading text-3xl font-semibold tracking-tight text-foreground/[0.06] sm:text-4xl"
              >
                {partner.mark}
              </p>

              <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem] sm:leading-tight">
                {partner.name}
              </h3>
              <p className="mt-1.5 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {partner.role}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
