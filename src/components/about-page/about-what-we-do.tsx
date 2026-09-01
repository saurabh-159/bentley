"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Lock, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home-page/reveal";
import { aboutViewport } from "./in-view";

const pillars = [
  {
    word: "Easy",
    icon: Sparkles,
    title: "Best-fit, not more software",
    body: "With so many platforms available, we recommend what actually fits your business — so teams adopt the right tool, not another unused licence.",
  },
  {
    word: "Fast",
    icon: Zap,
    title: "From challenge to delivery",
    body: "We help customers turn project friction into opportunity — better collaboration, smoother data exchange, and lower cost on design and infrastructure work.",
  },
  {
    word: "Secure",
    icon: Lock,
    title: "Trusted through the work",
    body: "Recommendations that protect data exchange and keep supply chains collaborating with confidence — from first demo to live project.",
  },
] as const;

const CYCLE_MS = 4200;
const easeOut = [0.22, 1, 0.36, 1] as const;

export function AboutWhatWeDo() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = pillars[active];
  const Icon = current.icon;

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((index) => (index + 1) % pillars.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, active]);

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <Reveal viewport={aboutViewport}>
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            <span className="inline-block h-px w-8 bg-brand" aria-hidden />
            What we do
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
            Easy. Fast. Secure.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-[1.05rem]">
            Everyone has challenges. At Synergic, we help customers turn those
            into opportunities — whether the work is data exchange, supply-chain
            collaboration, or reducing cost on design and infrastructure
            projects.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8" viewport={aboutViewport}>
          <div
            className="flex flex-col overflow-hidden border border-border lg:grid lg:grid-cols-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
          >
            <LayoutGroup>
              <div
                role="tablist"
                aria-label="How we help"
                className="order-2 divide-y divide-border lg:order-1 lg:col-span-5 lg:border-r lg:border-border"
              >
                {pillars.map((item, index) => {
                  const selected = index === active;
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.word}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="about-pillar-panel"
                      id={`about-pillar-tab-${index}`}
                      onClick={() => setActive(index)}
                      onMouseEnter={() => {
                        if (window.matchMedia("(hover: hover)").matches) {
                          setActive(index);
                        }
                      }}
                      className={cn(
                        "relative flex w-full items-center gap-3 px-4 py-4 text-left transition-colors sm:px-5",
                        selected
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      {selected ? (
                        <motion.span
                          layoutId="about-pillar-indicator"
                          className="absolute inset-y-0 left-0 w-[3px] bg-brand"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 32 }
                          }
                        />
                      ) : null}

                      <span
                        className={cn(
                          "w-6 shrink-0 font-heading text-[10px] font-semibold tracking-[0.14em] tabular-nums",
                          selected ? "text-brand" : "text-muted-foreground/70"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <ItemIcon
                            className={cn(
                              "size-3.5 shrink-0",
                              selected ? "text-brand" : "text-muted-foreground"
                            )}
                            aria-hidden
                          />
                          <span className="font-heading text-lg font-semibold tracking-tight">
                            {item.word}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                          {item.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <div
              id="about-pillar-panel"
              role="tabpanel"
              aria-labelledby={`about-pillar-tab-${active}`}
              className="relative order-1 min-h-[280px] overflow-hidden bg-foreground text-background lg:order-2 lg:col-span-7 lg:min-h-[320px]"
            >
              {!reduceMotion && !paused ? (
                <motion.span
                  key={active}
                  aria-hidden
                  className="absolute top-0 left-0 z-10 h-[3px] w-full origin-left bg-brand"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                />
              ) : (
                <span className="absolute top-0 left-0 z-10 h-[3px] w-full bg-brand" />
              )}

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-7">
                <span className="inline-flex items-center gap-1.5 border border-white/25 px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-white/90 uppercase">
                  <Icon className="size-3" aria-hidden />
                  {current.word}
                </span>
                <span
                  aria-hidden
                  className="font-heading text-5xl font-semibold tracking-tight text-white/15 sm:text-6xl"
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex h-full min-h-[280px] items-end p-5 sm:min-h-[320px] sm:p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.word}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                  >
                    <h3 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                      {current.word}.
                    </h3>
                    <p className="mt-2 font-heading text-lg font-medium tracking-tight text-white/80 sm:text-xl">
                      {current.title}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
                      {current.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 grid gap-8 border-t border-border pt-8 lg:grid-cols-12 lg:items-end"
          viewport={aboutViewport}
        >
          <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:col-span-8 sm:text-[1.05rem] sm:leading-7">
            With so many software platforms available, Synergic will ensure our
            recommendations are the best fit for your business. Contact us
            today — our consultants will provide the information you need.
          </p>
          <div className="lg:col-span-4 lg:justify-self-end">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <Link
                href="/#contact"
                className="group inline-flex h-12 items-center justify-center bg-brand px-7 text-xs font-semibold tracking-[0.16em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
              >
                Talk with a consultant
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
