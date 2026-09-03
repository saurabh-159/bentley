"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

const nodes = [
  { id: "requirement", label: "Your Requirement" },
  { id: "industry", label: "Your Industry" },
  { id: "workflow", label: "Your Workflow" },
  { id: "options", label: "Software Options" },
  { id: "recommendation", label: "Expert Recommendation" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;
const CYCLE_MS = 2800;

/**
 * Technology Advisory
 * Content: which software is right for you — requirement, industry, workflow
 * UI: dark split layout, recommendation CTAs, interactive decision diagram
 */
export function TechnologyAdvisory() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((index) => (index + 1) % nodes.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, active]);

  return (
    <section
      id="advisory"
      aria-labelledby="advisory-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#1a1d1f]"
    >
      <svg
        aria-hidden
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -top-[38%] -right-[18%] h-[150%] w-[72%] text-white/[0.07]"
      >
        <circle cx="400" cy="400" r="250" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="330" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="410" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase">
            Technology Advisory
          </p>
          <h2
            id="advisory-heading"
            className="mt-3 max-w-md font-heading text-[2rem] font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
          >
            Which Software Is Right for You?
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65 sm:text-base">
            There is rarely one answer for every team. We compare options
            against your workflow, industry, team size, compatibility
            requirements and budget—then help you make a practical decision.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <Link
                href="/#contact"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
              >
                Get a Recommendation
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <Link
                href="/#solutions"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-brand transition-colors hover:bg-white/92"
              >
                Compare Solutions
              </Link>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
          >
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:grid-rows-2 lg:items-center lg:gap-x-3 lg:gap-y-7">
              <FlowNode
                node={nodes[0]}
                active={active === 0}
                reduceMotion={!!reduceMotion}
                onActivate={() => setActive(0)}
              />
              <FlowArrow />
              <FlowNode
                node={nodes[1]}
                active={active === 1}
                reduceMotion={!!reduceMotion}
                onActivate={() => setActive(1)}
              />
              <FlowArrow />
              <FlowNode
                node={nodes[2]}
                active={active === 2}
                reduceMotion={!!reduceMotion}
                onActivate={() => setActive(2)}
              />

              <FlowNode
                node={nodes[3]}
                active={active === 3}
                reduceMotion={!!reduceMotion}
                onActivate={() => setActive(3)}
              />
              <FlowArrow />
              <FlowNode
                node={nodes[4]}
                active={active === 4}
                reduceMotion={!!reduceMotion}
                onActivate={() => setActive(4)}
              />
            </div>

            <div className="flex flex-col items-stretch gap-2 lg:hidden">
              {nodes.map((node, index) => (
                <div key={node.id} className="flex flex-col items-center gap-2">
                  <FlowNode
                    node={node}
                    active={active === index}
                    reduceMotion={!!reduceMotion}
                    onActivate={() => setActive(index)}
                    className="w-full"
                  />
                  {index < nodes.length - 1 ? <FlowArrow down /> : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FlowNode({
  node,
  active,
  reduceMotion,
  onActivate,
  className,
}: {
  node: (typeof nodes)[number];
  active: boolean;
  reduceMotion: boolean;
  onActivate: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.28, ease }}
      aria-pressed={active}
      className={cn(
        "relative flex min-h-[4.25rem] items-center justify-center rounded-lg border px-4 py-4 text-center transition-[border-color,background-color,box-shadow] duration-300 sm:min-h-[4.75rem] sm:px-5 sm:py-5",
        active
          ? "border-brand/70 bg-[#2a2e31] shadow-[0_0_0_1px_oklch(0.605_0.233_27_/_0.18)]"
          : "border-white/12 bg-[#2a2e31]/80 hover:border-white/25",
        className
      )}
    >
      <span className="block font-heading text-[0.95rem] font-semibold tracking-tight text-white sm:text-base">
        {node.label}
      </span>
    </motion.button>
  );
}

function FlowArrow({ down = false }: { down?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center text-brand",
        down ? "h-3" : "px-0.5"
      )}
    >
      <svg
        viewBox="0 0 12 12"
        className={cn("size-3.5 fill-current", down && "rotate-90")}
      >
        <path d="M3.2 1.6 10 6 3.2 10.4V1.6Z" />
      </svg>
    </span>
  );
}
