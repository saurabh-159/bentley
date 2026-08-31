"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=2400&q=80";

const newsItems = [
  {
    label: "Partner news",
    title: "Authorized Bentley channel partner for India's AEC sector",
    href: "/#about",
    cta: "Learn more",
  },
  {
    label: "Software",
    title: "STAAD.Pro, OpenRoads, and SYNCHRO available through Synergic",
    href: "/#products",
    cta: "Explore software",
  },
  {
    label: "Since 2008",
    title: "1,900+ customers across architecture, civil, and mechanical",
    href: "/#about",
    cta: "About us",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const contentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

/**
 * Hero
 * Content: Synergic — "Your Trusted Technology Partner", AEC digital transformation in India
 * UI: Bentley — full-bleed cinematic image, oversized headline, one CTA, optional news strip
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const [newsIndex, setNewsIndex] = useState(0);
  const news = newsItems[newsIndex];

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setNewsIndex((index) => (index + 1) % newsItems.length);
    }, 5600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-foreground sm:min-h-[calc(100svh-5rem)]"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 18, ease: "linear" }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Aerial view of a highway interchange representing modern infrastructure"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/55 to-black/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-7xl flex-col justify-center px-4 pb-28 pt-16 sm:min-h-[calc(100svh-5rem)] sm:px-6 sm:pb-32 sm:pt-20">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={itemVariants}
            className="mb-5 flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-white/80 uppercase"
          >
            <span className="inline-block h-px w-8 bg-brand" />
            Your trusted technology partner
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="font-heading text-[2.35rem] leading-[1.08] font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Engineering software for modern infrastructure
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg"
          >
            Accelerating digital transformation in India&apos;s AEC sector with
            world-class design tools for architecture, civil, and mechanical
            engineering.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-9">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <Link
                href="/#products"
                className="inline-flex h-12 items-center gap-2 bg-brand px-7 text-sm font-semibold tracking-[0.14em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
              >
                Explore software
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
        className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-black/45 backdrop-blur-md"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-3.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={news.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                <span className="w-fit shrink-0 border border-brand/80 px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-white uppercase">
                  {news.label}
                </span>
                <p className="min-w-0 truncate text-sm text-white/90">
                  {news.title}
                </p>
              </div>
              <Link
                href={news.href}
                className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:text-brand"
              >
                {news.cta}
                <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
