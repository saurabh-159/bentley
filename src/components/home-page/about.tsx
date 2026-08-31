"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80";

const HEADLINE = "Engineering software that builds India.";
const headlineWords = HEADLINE.split(" ");

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

const wordVariants = {
  hidden: { y: "108%", opacity: 0.35 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.72, ease: easeOut },
  },
};

function Headline() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <h2 className="mt-3 max-w-5xl font-heading text-[2.15rem] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
        {HEADLINE}
      </h2>
    );
  }

  return (
    <motion.h2
      className="mt-3 max-w-5xl font-heading text-[2.15rem] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
      }}
    >
      {headlineWords.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.28em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0"
        >
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

/**
 * About / Who we are
 * Content: Synergic — since 2008, 1900+ customers, Hyderabad, vision & mission
 * UI: Bentley — compact two-column story, restrained labels, no extra bands
 */
export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-24 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            <motion.span
              aria-hidden
              className="inline-block h-px w-8 origin-left bg-brand"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: easeOut }}
            />
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.12, ease: easeOut }}
            >
              Who we are
            </motion.span>
          </p>
          <Headline />
        </div>

        <div className="mt-7 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
          <Reveal delay={0.06} className="lg:col-span-5">
            <div className="group relative aspect-[16/10] overflow-hidden bg-muted">
              <motion.div
                className="absolute inset-0"
                initial={reduceMotion ? false : { scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduceMotion ? 0 : 1.35, ease: easeOut }}
              >
                <Image
                  src={STORY_IMAGE}
                  alt="Engineers collaborating over digital infrastructure models"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
              <span
                aria-hidden
                className="absolute top-0 left-0 h-[3px] w-full bg-brand"
              />
              <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-gradient-to-t from-black/65 to-transparent px-5 py-3">
                <motion.p
                  className="text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase"
                  initial={reduceMotion ? false : { y: 14, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.28, ease: easeOut }}
                >
                  Hyderabad · Est. 2008
                </motion.p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <motion.p
              className="max-w-xl text-base leading-7 text-muted-foreground sm:text-[1.05rem] sm:leading-7"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.14, ease: easeOut }}
            >
              Since 2008, Synergic has been Hyderabad&apos;s system integrator
              for architecture, civil, and mechanical teams — helping more
              than 1,900 customers choose, deploy, and get value from
              engineering software.
            </motion.p>
            <motion.p
              className="mt-3 max-w-xl text-base leading-7 text-foreground/80 sm:text-[1.05rem] sm:leading-7"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.26, ease: easeOut }}
            >
              We recommend what actually fits the work, then stay with you
              after the licence — so delivery happens on the tools, not the
              paperwork.
            </motion.p>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.38, ease: easeOut }}
            >
              <Link
                href="/#contact"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                Talk with a consultant
                <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        <RevealStagger className="mt-8 grid gap-5 border-t border-border pt-6 text-center sm:grid-cols-2 sm:gap-10">
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
                        transition: { duration: 0.45, delay: 0.12, ease: easeOut },
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
                        transition: { duration: 0.45, delay: 0.12, ease: easeOut },
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

        <RevealStagger className="mt-8 grid grid-cols-3 border-t border-border pt-6">
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
