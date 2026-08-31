"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem, RevealStagger } from "./reveal";
import { SectionHeading } from "./section-heading";

const articles = [
  {
    category: "Product",
    date: "12 Aug 2026",
    read: "6 min",
    title: "Why Indian structural teams still start with STAAD.Pro",
    excerpt:
      "From high-rises to industrial frames, STAAD.Pro is still the first model Indian structural desks open — and the one they hand to site.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "High-rise structural grid",
    featured: true,
  },
  {
    category: "Insight",
    date: "28 Jul 2026",
    read: "5 min",
    title: "From corridor to construction: OpenRoads on Indian highways",
    excerpt:
      "How alignment, drainage, and deliverables stay in one model when the corridor leaves the office.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Highway corridor at dusk",
    featured: false,
  },
  {
    category: "Guide",
    date: "4 Jun 2026",
    read: "4 min",
    title: "Pipe networks without the detour: Urbano for water and sewer",
    excerpt:
      "A shorter path from survey to network model for municipal water and sewer teams.",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Water infrastructure and treatment plant",
    featured: false,
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Resource center
 * Content: Synergic — STAAD.Pro, OpenRoads, Urbano / Civil 3D articles
 * UI: Bentley — featured story + companion cards, hover motion, category + date
 */
export function Resources() {
  const reduceMotion = useReducedMotion();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article !== featured);

  return (
    <section id="resources" className="scroll-mt-24 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
        <Reveal>
          <SectionHeading
            label="Resource center"
            title="News, insights, and more"
            description="Field notes from Indian desks — STAAD.Pro, OpenRoads, Urbano, and the work around them."
            action={
              <Link
                href="/#resources"
                className="group/all inline-flex shrink-0 items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                View all
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/all:translate-x-1" />
              </Link>
            }
          />
        </Reveal>

        <RevealStagger className="mt-6 grid gap-3 lg:grid-cols-12 lg:grid-rows-2">
          <RevealItem className="lg:col-span-7 lg:row-span-2">
            <FeaturedCard article={featured} index={0} reduceMotion={!!reduceMotion} />
          </RevealItem>

          {rest.map((article, index) => (
            <RevealItem key={article.title} className="lg:col-span-5">
              <CompanionCard
                article={article}
                index={index + 1}
                reduceMotion={!!reduceMotion}
              />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function FeaturedCard({
  article,
  index,
  reduceMotion,
}: {
  article: (typeof articles)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease }}
      className="h-full min-h-[260px] sm:min-h-[300px] lg:min-h-0"
    >
      <Link
        href="/#contact"
        className="group relative block h-full min-h-[260px] overflow-hidden bg-muted sm:min-h-[300px] lg:min-h-full"
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

        {!reduceMotion ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
        ) : null}

        <span className="absolute top-0 left-0 h-[3px] w-0 bg-brand transition-[width] duration-500 group-hover:w-full" />
        <span
          aria-hidden
          className="absolute top-0 left-0 h-full w-[3px] origin-top scale-y-0 bg-brand transition-transform duration-500 group-hover:scale-y-100"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
          <span className="border border-white/35 bg-black/25 px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm">
            {article.category}
          </span>
          <span
            aria-hidden
            className="font-heading text-4xl font-semibold tracking-tight text-white/20 sm:text-5xl"
          >
            {number}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:p-5">
          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">
            <time>{article.date}</time>
            <span className="h-px w-4 bg-white/35" />
            <span>{article.read} read</span>
          </div>
          <h3 className="mt-2 max-w-xl font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[1.75rem] lg:leading-tight">
            {article.title}
          </h3>
          <p className="mt-1.5 max-w-md line-clamp-2 text-sm leading-5 text-white/75">
            {article.excerpt}
          </p>
          <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
            Read article
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function CompanionCard({
  article,
  index,
  reduceMotion,
}: {
  article: (typeof articles)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.35, ease }}
      className="h-full"
    >
      <Link
        href="/#contact"
        className="group flex h-full min-h-[148px] overflow-hidden border border-border bg-background max-sm:flex-col sm:min-h-[156px]"
      >
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-muted max-sm:w-full sm:aspect-auto sm:w-[44%]">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 44vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {!reduceMotion ? (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
          ) : null}
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col justify-center px-4 py-3.5 sm:px-5">
          <span className="absolute top-0 left-0 h-[2px] w-0 bg-brand transition-[width] duration-500 ease-out group-hover:w-full" />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] uppercase">
              <span className="text-brand">{article.category}</span>
              <span className="h-px w-4 bg-border" />
              <time className="text-muted-foreground">{article.date}</time>
            </div>
            <span
              aria-hidden
              className="hidden font-heading text-xl font-semibold tracking-tight text-foreground/[0.08] sm:block"
            >
              {number}
            </span>
          </div>

          <h3 className="mt-2 font-heading text-base font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand sm:text-lg sm:leading-snug">
            {article.title}
          </h3>
          <p className="mt-1.5 line-clamp-1 text-sm leading-5 text-muted-foreground">
            {article.excerpt}
          </p>
          <span
            className={cn(
              "mt-2 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-brand uppercase transition-all duration-500",
              "opacity-80 sm:translate-y-1.5 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
            )}
          >
            Read article
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
