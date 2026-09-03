"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { RevealItem, RevealStagger } from "@/components/home-page/reveal";
import { aboutViewport } from "./in-view";

const facts = [
  { kind: "count", to: 2008, grouped: false, suffix: "", label: "Founded" },
  { kind: "count", to: 1900, grouped: true, suffix: "+", label: "Customers" },
  { kind: "text", display: "Hyd", label: "Head office" },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function CountUp({
  to,
  grouped,
  suffix,
}: {
  to: number;
  grouped: boolean;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const format = (value: number) => {
      const rounded = Math.round(value);
      const body = grouped ? rounded.toLocaleString("en-US") : String(rounded);
      return `${body}${suffix}`;
    };

    if (reduceMotion || !inView) {
      node.textContent = reduceMotion ? format(to) : format(0);
      return;
    }

    const controls = animate(0, to, {
      duration: 1.7,
      ease: easeOut,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });

    return () => controls.stop();
  }, [grouped, inView, reduceMotion, suffix, to]);

  const final = grouped
    ? `${to.toLocaleString("en-US")}${suffix}`
    : `${to}${suffix}`;

  return (
    <span ref={ref} className="tabular-nums" aria-label={final}>
      0{suffix}
    </span>
  );
}

export function AboutValues() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <RevealStagger
          className="grid gap-5 text-center sm:grid-cols-2 sm:gap-10"
          viewport={aboutViewport}
        >
          <RevealItem className="mx-auto max-w-md">
            <h3 className="overflow-hidden font-heading text-2xl font-semibold tracking-tight text-[#EF363B] sm:text-3xl">
              <motion.span
                className="inline-block"
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        hidden: { y: "110%" },
                        show: {
                          y: "0%",
                          transition: { duration: 0.55, ease: easeOut },
                        },
                      }
                }
              >
                Vision
              </motion.span>
            </h3>
            <motion.span
              aria-hidden
              className="mx-auto mt-2 block h-px w-10 origin-center bg-[#EF363B]"
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: { scaleX: 0 },
                      show: {
                        scaleX: 1,
                        transition: {
                          duration: 0.45,
                          delay: 0.12,
                          ease: easeOut,
                        },
                      },
                    }
              }
            />
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Put the right CAD and engineering tools in every team that wants
              to lead its industry.
            </p>
          </RevealItem>
          <RevealItem className="mx-auto max-w-md">
            <h3 className="overflow-hidden font-heading text-2xl font-semibold tracking-tight text-[#EF363B] sm:text-3xl">
              <motion.span
                className="inline-block"
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        hidden: { y: "110%" },
                        show: {
                          y: "0%",
                          transition: { duration: 0.55, ease: easeOut },
                        },
                      }
                }
              >
                Mission
              </motion.span>
            </h3>
            <motion.span
              aria-hidden
              className="mx-auto mt-2 block h-px w-10 origin-center bg-[#EF363B]"
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: { scaleX: 0 },
                      show: {
                        scaleX: 1,
                        transition: {
                          duration: 0.45,
                          delay: 0.12,
                          ease: easeOut,
                        },
                      },
                    }
              }
            />
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Earn trust with deep AEC knowledge, keep clients ahead of the
              field, and meet the next challenge with the right tools.
            </p>
          </RevealItem>
        </RevealStagger>

        <RevealStagger
          className="mt-8 grid grid-cols-3 border-t border-border pt-6"
          viewport={aboutViewport}
        >
          {facts.map((fact) => (
            <RevealItem
              key={fact.label}
              className="border-l border-border px-4 first:border-l-0 first:pl-0 sm:px-8 sm:first:pl-0"
            >
              <p className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {fact.kind === "count" ? (
                  <CountUp
                    to={fact.to}
                    grouped={fact.grouped}
                    suffix={fact.suffix}
                  />
                ) : (
                  fact.display
                )}
              </p>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {fact.label}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
