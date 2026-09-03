"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const HERO_VIDEO = "https://assets.mixkit.co/videos/28790/28790-720.mp4";
const HERO_POSTER =
  "https://assets.mixkit.co/videos/28790/28790-thumb-720-0.jpg";

const taglines = [
  "Authorized Channel Partner",
  "Licensing",
  "Implementation",
  "Training",
  "Technical Support",
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
 * Content: Designed. Coordinated. Delivered. — software plus select, implement, train, support
 * UI: Bentley — full-bleed cinematic video, oversized headline, one CTA, optional news strip
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const tagline = taglines[taglineIndex];

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setTaglineIndex((index) => (index + 1) % taglines.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    video.muted = true;
    void video.play().catch(() => {});
  }, [reduceMotion]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[calc(82svh-4.5rem)] overflow-hidden bg-foreground sm:min-h-[calc(82svh-5rem)]"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.1, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/55 to-black/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
      />

      <div className="relative mx-auto flex min-h-[calc(82svh-4.5rem)] w-full max-w-7xl flex-col justify-center px-4 pb-20 pt-12 sm:min-h-[calc(82svh-5rem)] sm:px-6 sm:pb-24 sm:pt-16">
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
            <span className="inline-block h-px w-8 shrink-0 bg-brand" />
            <span
              aria-live="polite"
              className="relative grid min-w-0 overflow-hidden"
            >
              {taglines.map((line) => (
                <span
                  key={line}
                  className="invisible col-start-1 row-start-1"
                  aria-hidden
                >
                  {line}
                </span>
              ))}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={tagline}
                  initial={reduceMotion ? false : { y: "160%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: "-160%", opacity: 0 }}
                  transition={{ duration: 0.7, ease: easeOut }}
                  className="col-start-1 row-start-1"
                >
                  {tagline}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="font-heading text-[2.35rem] leading-[1.08] font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Designed. Coordinated. Delivered.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg"
          >
            The right technology can transform the way your team designs,
            coordinates and delivers. We combine leading engineering software
            with the expertise to select, implement, train and support it.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-9">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <Link
                href="/#solutions"
                className="inline-flex h-12 items-center gap-2 bg-brand px-7 text-sm font-semibold tracking-[0.14em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
              >
                Explore Solutions
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
