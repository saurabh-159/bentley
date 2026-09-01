"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem, RevealStagger } from "@/components/home-page/reveal";
import { aboutViewport } from "./in-view";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80";

const partners = [
  { name: "Bentley Systems", role: "Infrastructure" },
  { name: "Studio ARS", role: "Civil design" },
  { name: "CGS LABS", role: "Rail and road" },
  { name: "EDV Software", role: "Building services" },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function AboutStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <Reveal className="lg:col-span-5" viewport={aboutViewport}>
            <div className="group relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[16/11] lg:aspect-[4/5]">
              <motion.div
                className="absolute inset-0"
                initial={reduceMotion ? false : { scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={aboutViewport}
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
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-white/85 uppercase">
                  <MapPin className="size-3.5" aria-hidden />
                  Hyderabad · Est. 2008
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <motion.p
              className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase"
              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={aboutViewport}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <span className="inline-block h-px w-8 bg-brand" aria-hidden />
              Our journey
            </motion.p>

            <motion.h2
              className="mt-3 max-w-xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={aboutViewport}
              transition={{ duration: 0.6, delay: 0.06, ease: easeOut }}
            >
              Built in Hyderabad. Trusted across India.
            </motion.h2>

            <motion.p
              className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-[1.05rem] sm:leading-7"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={aboutViewport}
              transition={{ duration: 0.6, delay: 0.14, ease: easeOut }}
            >
              Synergic is a leading system integrator in India. We deliver CAD
              solutions to enterprise customers in architecture, civil, and
              mechanical engineering. Our journey started in 2008, and over the
              years we have built deep expertise across these domains.
            </motion.p>

            <motion.p
              className="mt-4 max-w-xl text-base leading-7 text-foreground/80 sm:text-[1.05rem] sm:leading-7"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={aboutViewport}
              transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
            >
              We have successfully served over 1,900 customers and are
              constantly growing our reach and product verticals. We operate
              from Hyderabad. Our partners include leading OEMs and solution
              providers such as Bentley Systems, Studio ARS, CGS LABS, and EDV
              Software.
            </motion.p>
          </div>
        </div>

        <RevealStagger
          className="mt-10 grid grid-cols-2 border border-border lg:grid-cols-4"
          viewport={aboutViewport}
        >
          {partners.map((partner, index) => (
            <RevealItem
              key={partner.name}
              className={cn(
                index % 2 === 0 && "border-r border-border",
                index < 2 && "max-lg:border-b max-lg:border-border",
                "lg:border-r lg:border-border lg:last:border-r-0"
              )}
            >
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="group relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6"
              >
                <span className="absolute top-0 left-0 h-[2px] w-0 bg-brand transition-[width] duration-500 ease-out group-hover:w-full" />
                <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {String(index + 1).padStart(2, "0")} · OEM partner
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {partner.name}
                </h3>
                <p className="mt-1 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {partner.role}
                </p>
              </motion.article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
