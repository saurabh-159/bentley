"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { HeroCopySwiper } from "@/components/hero-copy-swiper";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=80";

const slides = [
  {
    title: "Explore our software portfolio",
    description:
      "Four technology foundations. One independent, engineering-focused approach to helping you choose what fits — licensed and supported in India.",
  },
  {
    title: "Bentley Systems",
    description:
      "Infrastructure engineering, asset management and digital project delivery technology.",
  },
  {
    title: "BricsCAD",
    description:
      "Professional CAD and design technology for modern engineering workflows.",
  },
  {
    title: "GstarCAD",
    description:
      "DWG-based CAD solutions for architecture, engineering and design organizations.",
  },
  {
    title: "AX3000 MEP",
    description:
      "Engineering software for MEP design and building services workflows.",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ProductsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-foreground">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: easeOut }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Infrastructure construction representing the projects our software supports"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/62 to-black/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand" />

      <div className="relative mx-auto w-full max-w-[92rem] px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20 lg:px-8 lg:pt-10 lg:pb-24">
        <motion.nav
          aria-label="Breadcrumb"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm"
        >
          <Link
            href="/"
            className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Synergic
          </Link>
          <span className="text-white/45" aria-hidden>
            /
          </span>
          <span aria-current="page">Products</span>
        </motion.nav>

        <HeroCopySwiper slides={slides} ariaLabel="Product highlights" />
      </div>
    </section>
  );
}
