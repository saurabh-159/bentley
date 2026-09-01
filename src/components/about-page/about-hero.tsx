"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HERO_VIDEO = "https://assets.mixkit.co/videos/36836/36836-720.mp4";
const HERO_POSTER =
  "https://assets.mixkit.co/videos/36836/36836-thumb-720-0.jpg";

const labels = [
  "Who we are",
  "What we do",
  "Our vision",
  "Our mission",
] as const;

const longestLabel = labels.reduce((longest, label) =>
  label.length > longest.length ? label : longest
);

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

export function AboutHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section className="relative isolate overflow-hidden bg-foreground">
      <div className="pointer-events-none absolute inset-0 z-0">
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
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/62 to-black/35"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
        />
      </div>
      <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-0.5 bg-brand" />

      <div className="relative z-10 mx-auto flex min-h-[28rem] w-full max-w-7xl flex-col justify-end px-4 pt-6 pb-0 sm:min-h-[32rem] sm:px-6 sm:pt-8 lg:min-h-[36rem] lg:pt-10">
        <motion.nav
          aria-label="Breadcrumb"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm"
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
          <span aria-current="page">About us</span>
        </motion.nav>

        <div className="mt-8 max-w-3xl pb-12 sm:mt-10 sm:pb-14 lg:pb-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
            className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase"
          >
            <motion.span
              aria-hidden
              className="inline-block h-px w-8 shrink-0 origin-left bg-brand"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.12, ease: easeOut }}
            />
            <span
              className="about-hero-label relative inline-block h-[1.2em] overflow-hidden"
              aria-live="polite"
            >
              <span className="invisible block whitespace-nowrap" aria-hidden>
                {longestLabel}
              </span>
              <Swiper
                direction="vertical"
                loop
                speed={450}
                slidesPerView={1}
                allowTouchMove={false}
                autoplay={
                  reduceMotion
                    ? false
                    : {
                        delay: 2000,
                        disableOnInteraction: false,
                      }
                }
                modules={[Autoplay]}
                className="about-hero-label-swiper"
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "100%",
                  width: "100%",
                  margin: 0,
                  overflow: "hidden",
                }}
              >
                {labels.map((label) => (
                  <SwiperSlide
                    key={label}
                    className="!flex !h-full items-center whitespace-nowrap"
                  >
                    {label}
                  </SwiperSlide>
                ))}
              </Swiper>
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: easeOut }}
            className="mt-3 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            Synergic Information Solutions
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: easeOut }}
            className="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-[1.05rem]"
          >
            A leading system integrator in India — CAD solutions for
            architecture, civil, and mechanical engineering teams.
          </motion.p>
        </div>

        <div className="grid grid-cols-3 border-t border-white/15 bg-black/35 backdrop-blur-md">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.42 + index * 0.08,
                ease: easeOut,
              }}
              className="border-l border-white/15 px-3 py-4 first:border-l-0 first:pl-0 sm:px-6 sm:py-5 sm:first:pl-0"
            >
              <p className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
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
              <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-white/55 uppercase sm:text-[11px]">
                {fact.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
