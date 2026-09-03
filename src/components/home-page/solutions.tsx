"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  Box,
  Building2,
  Cog,
  PenTool,
  Route,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { productPath } from "@/lib/catalog";

const industries = [
  {
    name: "CAD & Drafting",
    category: "Design",
    challenge:
      "Professional CAD solutions for 2D drafting, 3D design, documentation and engineering production.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Engineer working at a CAD workstation",
    icon: PenTool,
    software: ["BricsCAD", "BricsCAD Lite", "GstarCAD"],
  },
  {
    name: "BIM & Building Design",
    category: "Buildings",
    challenge:
      "Improve coordination, design quality and collaboration across building projects.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Contemporary architectural facade",
    icon: Building2,
    software: ["BricsCAD", "OpenBuildings"],
  },
  {
    name: "Civil & Infrastructure",
    category: "Infrastructure",
    challenge:
      "Design, analyze and deliver roads, highways, utilities and infrastructure projects.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Highway corridor at dusk",
    icon: Route,
    software: ["OpenRoads Designer", "OpenRail Designer", "Ferrovia"],
  },
  {
    name: "Structural Engineering",
    category: "Structural",
    challenge:
      "Powerful tools for structural analysis, design, documentation and engineering workflows.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Structural steel frame",
    icon: Box,
    software: ["STAAD.Pro", "Structural WorkSuite"],
  },
  {
    name: "MEP Design",
    category: "Building Services",
    challenge:
      "Design, coordinate and document HVAC, electrical and plumbing systems for building projects.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Mechanical plant room",
    icon: Wind,
    software: ["AX3000 MEP", "BricsCAD"],
  },
  {
    name: "Mechanical Design",
    category: "Manufacturing",
    challenge:
      "Professional tools for 3D mechanical design, assemblies and manufacturing production.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Engineer reviewing a mechanical design on screen",
    icon: Cog,
    software: ["BricsCAD", "GstarCAD"],
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;
const CYCLE_MS = 4000;

/**
 * Solutions
 * Content: CAD & Drafting, BIM & Building Design, Civil & Infrastructure,
 * Structural Engineering, MEP Design, Mechanical Design
 * UI: Bentley — industry switcher, live visual, software toolkit, Motion
 */
export function Solutions() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = industries[active];
  const Icon = current.icon;
  const number = String(active + 1).padStart(2, "0");

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((index) => (index + 1) % industries.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, active]);

  return (
    <section id="solutions" className="scroll-mt-24 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <Reveal>
          <SectionHeading
            label="Industries we empower"
            title="Solutions for the way you work"
            description="Whether you design buildings, corridors, plants, or networks, we match software to the discipline — not the other way around."
            action={
              <p className="hidden text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase lg:block">
                06 disciplines
              </p>
            }
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
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
                aria-label="Industry solutions"
                className="order-2 divide-y divide-border lg:order-1 lg:col-span-5 lg:border-r lg:border-border"
              >
                {industries.map((item, index) => {
                  const selected = index === active;
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="solution-panel"
                      id={`solution-tab-${index}`}
                      onClick={() => setActive(index)}
                      onMouseEnter={() => {
                        if (window.matchMedia("(hover: hover)").matches) {
                          setActive(index);
                        }
                      }}
                      className={cn(
                        "relative flex w-full items-center gap-3 px-4 py-3 text-left transition-colors sm:px-5",
                        selected
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      {selected ? (
                        <motion.span
                          layoutId="solutions-tab-indicator"
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
                            {item.name}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground line-clamp-1">
                          {item.challenge}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <div
              id="solution-panel"
              role="tabpanel"
              aria-labelledby={`solution-tab-${active}`}
              className="relative order-1 aspect-[16/9] overflow-hidden bg-muted lg:order-2 lg:col-span-7 lg:aspect-auto lg:min-h-[380px]"
            >
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={current.name}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.7, ease: easeOut }}
                >
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

              {!reduceMotion ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                />
              ) : null}

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

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
                <span className="inline-flex items-center gap-1.5 border border-white/35 bg-black/25 px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm">
                  <Icon className="size-3" aria-hidden />
                  {current.category}
                </span>
                <span
                  aria-hidden
                  className="font-heading text-5xl font-semibold tracking-tight text-white/20 lg:text-6xl"
                >
                  {number}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                  >
                    <h3 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {current.name}
                    </h3>
                    <p className="mt-1.5 max-w-md text-xs leading-5 text-white/70 sm:text-sm">
                      {current.challenge}
                    </p>

                    <p className="mt-3 text-[10px] font-semibold tracking-[0.18em] text-white/50 uppercase">
                      Software library
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {current.software.map((name) => (
                        <Link
                          key={name}
                          href={productPath(name)}
                          className="border border-white/25 bg-white/5 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-white/90 uppercase transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
                        >
                          {name}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/#contact"
                      className="group/cta mt-3 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-white uppercase"
                    >
                      Talk with a consultant
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
