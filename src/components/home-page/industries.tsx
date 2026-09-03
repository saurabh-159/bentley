"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryPath } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const industries = [
  {
    tag: "CAD",
    title: "CAD & Drafting",
    description: "2D/3D design, documentation and production workflows.",
    href: categoryPath("CAD and MEP"),
  },
  {
    tag: "BIM",
    title: "BIM & Building Design",
    description: "Building information modeling, collaboration and coordination.",
    href: categoryPath("CAD and MEP"),
  },
  {
    tag: "CIV",
    title: "Civil & Infrastructure",
    description: "Roads, highways, utilities and infrastructure delivery.",
    href: categoryPath("Civil and transportation"),
  },
  {
    tag: "STR",
    title: "Structural Engineering",
    description: "Structural analysis, design and documentation workflows.",
    href: categoryPath("Structural analysis and detailing"),
  },
  {
    tag: "MEP",
    title: "MEP Design",
    description: "HVAC, electrical and plumbing systems for building projects.",
    href: categoryPath("CAD and MEP"),
  },
  {
    tag: "MEC",
    title: "Mechanical Design",
    description: "3D mechanical design, assemblies and manufacturing production.",
    href: categoryPath("CAD and MEP"),
  },
] as const;

/**
 * Industries
 * Content: CAD, BIM, Civil, Structural, MEP, Mechanical — from the Industries nav
 * UI: editorial bento — featured tile + index cells, hover accent, no card grid
 */
export function Industries() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="scroll-mt-24 border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase">
                Start with your requirement
              </p>
              <h2
                id="industries-heading"
                className="mt-2 font-heading text-[1.65rem] font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]"
              >
                What Are You Looking to Solve?
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
                Start with the work you need to accomplish—not a product name.
                We&apos;ll help connect your requirements to the right technology.
              </p>
            </div>
            <p className="hidden text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase lg:block">
              06 disciplines
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-12">
          {industries.map((item, index) => {
            const featured = index === 0;
            const selected = active === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <RevealItem
                key={item.title}
                className={cn(
                  "bg-background",
                  featured && "sm:col-span-2 lg:col-span-6 lg:row-span-2",
                  index === 1 && "lg:col-span-6",
                  index === 2 && "lg:col-span-6",
                  index >= 3 && "lg:col-span-4"
                )}
              >
                <article
                  className="h-full"
                  onMouseEnter={() => setActive(index)}
                  onFocusCapture={() => setActive(index)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden transition-colors duration-300",
                      featured ? "px-6 py-6 sm:px-8 sm:py-8" : "px-5 py-5",
                      selected ? "bg-muted/70" : "hover:bg-muted/40"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0 left-0 w-[3px] origin-top bg-brand transition-transform duration-300 ease-out",
                        selected ? "scale-y-100" : "scale-y-0"
                      )}
                    />

                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute top-3 right-4 select-none font-heading font-semibold tracking-tight",
                        featured
                          ? "text-7xl text-foreground/[0.06] lg:text-8xl"
                          : "text-5xl text-foreground/[0.05]",
                        selected && "text-brand/[0.12]"
                      )}
                    >
                      {number}
                    </span>

                    <span
                      className={cn(
                        "relative z-[1] inline-flex w-fit items-center px-2 py-0.5 text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300",
                        selected
                          ? "bg-brand text-brand-foreground"
                          : "bg-secondary text-brand group-hover:bg-brand group-hover:text-brand-foreground"
                      )}
                    >
                      {item.tag}
                    </span>

                    <h3
                      className={cn(
                        "relative z-[1] mt-4 font-heading font-semibold tracking-tight text-foreground",
                        featured
                          ? "text-2xl sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]"
                          : "text-[1.05rem] sm:text-lg"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "relative z-[1] mt-1.5 text-muted-foreground",
                        featured
                          ? "max-w-md text-sm leading-6 sm:text-[15px]"
                          : "text-[13px] leading-5"
                      )}
                    >
                      {item.description}
                    </p>

                    <span
                      className={cn(
                        "relative z-[1] mt-auto inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand",
                        featured ? "pt-8" : "pt-4"
                      )}
                    >
                      Explore Solution
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
