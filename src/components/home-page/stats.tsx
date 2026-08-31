"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { RevealItem, RevealStagger } from "./reveal";

const stats = [
  { to: 25, grouped: false, suffix: "+", label: "Products" },
  { to: 6, grouped: false, suffix: "", label: "Solutions" },
  { to: 1900, grouped: true, suffix: "+", label: "Customers" },
  { to: 17, grouped: false, suffix: " yrs", label: "In market" },
] as const;

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
      ease: [0.22, 1, 0.36, 1],
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

/**
 * Stats
 * Content: Synergic — products, solutions, 1500+ customers, satisfaction
 * UI: Bentley — large numerals on a dark band, short labels, no cartoon counters
 */
export function Stats() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <RevealStagger className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-0">
          {stats.map((item) => (
            <RevealItem
              key={item.label}
              className="lg:border-l lg:border-background/10 lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                <CountUp
                  to={item.to}
                  grouped={item.grouped}
                  suffix={item.suffix}
                />
              </p>
              <p className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-background/55 uppercase">
                {item.label}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
