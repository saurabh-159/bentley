"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2400&q=80";

const phrases = [
  {
    word: "infrastructure",
    line: "Highways, rail, and urban assets — from concept through delivery.",
  },
  {
    word: "structures",
    line: "STAAD.Pro analysis and design for India's building teams.",
  },
  {
    word: "civil works",
    line: "OpenRoads corridors, sites, and detailed road design.",
  },
  {
    word: "water systems",
    line: "WaterGEMS modelling for distribution, treatment, and networks.",
  },
  {
    word: "construction",
    line: "SYNCHRO 4D planning so the site matches the model.",
  },
] as const;

const INTERVAL_MS = 3800;
const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Closing CTA
 * Content: Synergic — contact / demo intent (not on their current home as a dedicated band)
 * UI: Bentley — cinematic closer, rotating discipline word, Talk to us
 */
export function Cta() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const phrase = phrases[index];

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, index]);

  return (
    <section
      id="career"
      aria-labelledby="cta-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-foreground text-background"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 22, ease: "linear" }}
      >
        <Image
          src={CTA_IMAGE}
          alt="City skyline at dusk representing infrastructure we help teams deliver"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/72 to-black/45"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"
      />

      <div className="relative h-0.5 bg-brand" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-28">
        <Reveal className="lg:col-span-8">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase">
            <span className="inline-block h-px w-8 bg-brand" aria-hidden />
            Get started
          </p>

          <h2
            id="cta-heading"
            className="font-heading text-3xl font-semibold tracking-tight sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12]"
          >
            <span className="sr-only" aria-live="polite">
              Ready to transform your {phrase.word}?
            </span>
            <span aria-hidden className="block">
              Ready to transform your
            </span>
            <span
              aria-hidden
              className="relative mt-1 inline-grid overflow-hidden align-bottom"
            >
              {phrases.map((item) => (
                <span
                  key={item.word}
                  className="invisible col-start-1 row-start-1 whitespace-nowrap"
                >
                  {item.word}?
                </span>
              ))}
              <AnimatePresence mode="wait">
                <motion.span
                  key={phrase.word}
                  initial={reduceMotion ? false : { y: "80%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: "-80%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className="col-start-1 row-start-1 whitespace-nowrap text-brand"
                >
                  {phrase.word}?
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>

          <div className="relative mt-5 min-h-[3.25rem] max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={phrase.word}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="text-base leading-7 text-white/70"
              >
                {phrase.line}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center gap-2 lg:hidden">
            {phrases.map((item, itemIndex) => (
              <button
                key={item.word}
                type="button"
                onClick={() => setIndex(itemIndex)}
                aria-label={item.word}
                aria-current={itemIndex === index ? "true" : undefined}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  itemIndex === index
                    ? "w-8 bg-brand"
                    : "w-1.5 bg-white/30 hover:bg-white/55"
                )}
              />
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <Link
                href="/#contact"
                className="group inline-flex h-12 items-center justify-center bg-brand px-7 text-xs font-semibold tracking-[0.16em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
              >
                Talk to us
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center justify-center border border-white/20 px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:border-white/50 hover:bg-white/5"
              >
                Send a message
              </Link>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="hidden lg:col-span-4 lg:block">
          <ul className="flex flex-col border-l border-white/15">
            {phrases.map((item, itemIndex) => {
              const active = itemIndex === index;
              return (
                <li key={item.word}>
                  <button
                    type="button"
                    onClick={() => setIndex(itemIndex)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "group flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors",
                      active ? "bg-white/10" : "hover:bg-white/5"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px] tracking-wider transition-colors",
                        active ? "text-brand" : "text-white/35"
                      )}
                    >
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-heading text-lg font-medium tracking-tight capitalize transition-colors",
                        active ? "text-white" : "text-white/45 group-hover:text-white/80"
                      )}
                    >
                      {item.word}
                    </span>
                    {active ? (
                      <motion.span
                        layoutId="cta-active-dot"
                        className="ml-auto size-1.5 shrink-0 bg-brand"
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      <div className="relative h-0.5 bg-white/10">
        <motion.span
          key={phrase.word}
          aria-hidden
          className="absolute inset-y-0 left-0 bg-brand"
          initial={reduceMotion ? { width: `${((index + 1) / phrases.length) * 100}%` } : { width: "0%" }}
          animate={{
            width: reduceMotion
              ? `${((index + 1) / phrases.length) * 100}%`
              : "100%",
          }}
          transition={{
            duration: reduceMotion ? 0.2 : INTERVAL_MS / 1000,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}
