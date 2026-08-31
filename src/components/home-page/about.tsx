"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80";

const facts = [
  { kind: "count", to: 2008, grouped: false, suffix: "", label: "Founded" },
  { kind: "count", to: 1900, grouped: true, suffix: "+", label: "Customers" },
  { kind: "text", display: "Hyd", label: "Head office" },
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
 * About / Who we are
 * Content: Synergic — since 2008, 1900+ customers, Hyderabad, vision & mission
 * UI: Bentley — compact two-column story, restrained labels, no extra bands
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="group relative aspect-[16/11] overflow-hidden bg-muted">
              <Image
                src={STORY_IMAGE}
                alt="Engineers collaborating over digital infrastructure models"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute top-0 left-0 h-[3px] w-full bg-brand"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 py-4">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">
                  Hyderabad · Est. 2008
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
                <span className="inline-block h-px w-8 bg-brand" aria-hidden />
                Who we are
              </p>
              <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
                Engineering software
                <br className="hidden sm:block" /> that builds India.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-[17px] sm:leading-8">
                Since 2008, Synergic has been Hyderabad&apos;s system integrator
                for architecture, civil, and mechanical teams — helping more
                than 1,900 customers choose, deploy, and get value from
                engineering software.
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/80 sm:text-[17px] sm:leading-8">
                We recommend what actually fits the work, then stay with you
                after the licence — so delivery happens on the tools, not the
                paperwork.
              </p>
              <Link
                href="/#contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                Talk with a consultant
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>

        <RevealStagger className="mt-10 grid gap-8 border-t border-border pt-8 text-center sm:grid-cols-2 sm:gap-12">
          <RevealItem className="mx-auto max-w-md">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#EF363B] sm:text-3xl">
              Vision
            </h3>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Put the right CAD and engineering tools in every team that wants
              to lead its industry.
            </p>
          </RevealItem>
          <RevealItem className="mx-auto max-w-md">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#EF363B] sm:text-3xl">
              Mission
            </h3>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Earn trust with deep AEC knowledge, keep clients ahead of the
              field, and meet the next challenge with the right tools.
            </p>
          </RevealItem>
        </RevealStagger>

        <RevealStagger className="mt-10 grid grid-cols-3 border-t border-border pt-8">
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
