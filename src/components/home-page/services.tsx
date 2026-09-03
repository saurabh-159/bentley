"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  FolderSync,
  GraduationCap,
  Headset,
  KeyRound,
  PenTool,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const services = [
  {
    category: "Licensing",
    title: "Software Licensing",
    description:
      "Guidance on the right license, user model and deployment approach.",
    icon: KeyRound,
  },
  {
    category: "Implementation",
    title: "Implementation",
    description:
      "Installation, configuration, deployment and environment setup.",
    icon: Settings2,
  },
  {
    category: "Training",
    title: "Training",
    description:
      "Practical, workflow-focused training designed around your team.",
    icon: GraduationCap,
  },
  {
    category: "Support",
    title: "Technical Support",
    description:
      "Ongoing help after go-live so issues do not stall production work.",
    icon: Headset,
  },
  {
    category: "Consulting",
    title: "CAD/BIM Consulting",
    description:
      "Advice on standards, templates and how teams should use the tools.",
    icon: PenTool,
  },
  {
    category: "Migration",
    title: "Migration & Deployment",
    description:
      "Move drawings, libraries and users onto the new platform with less disruption.",
    icon: FolderSync,
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Services
 * Content: licensing, implementation, training, support, consulting, migration
 * UI: compact split — heading + 2-col indexed rows
 */
export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              <span className="inline-block h-px w-8 bg-brand" aria-hidden />
              Services
            </p>
            <h2 className="mt-2 font-heading text-[1.7rem] font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]">
              More Than Software
            </h2>
            <p className="mt-2.5 max-w-sm text-sm leading-6 text-muted-foreground">
              Buying technology is one step. Making it work for your
              organization is the real objective.
            </p>
            <Link
              href="/#contact"
              className="group/cta mt-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-brand uppercase"
            >
              Talk with a consultant
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
          </Reveal>

          <RevealStagger className="mt-6 border border-border lg:col-span-8 lg:mt-0">
            <div className="grid sm:grid-cols-2">
              {services.map((service, index) => (
                <RevealItem key={service.title}>
                  <ServiceRow
                    service={service}
                    index={index}
                    reduceMotion={!!reduceMotion}
                  />
                </RevealItem>
              ))}
            </div>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
  reduceMotion,
}: {
  service: (typeof services)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");
  const Icon = service.icon;

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { x: 2 }}
      transition={{ duration: 0.25, ease }}
      className={cn(
        "group relative flex h-full items-start gap-3 px-4 py-3.5 transition-colors duration-300 hover:bg-muted/70 sm:px-5",
        index % 2 === 0 && "sm:border-r sm:border-border",
        "border-b border-border",
        index === 5 && "border-b-0",
        index >= 4 && "sm:border-b-0"
      )}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100"
      />

      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors duration-300 group-hover:border-brand group-hover:text-brand">
        <Icon className="size-3.5" aria-hidden />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-heading text-[10px] font-semibold tracking-[0.16em] text-brand tabular-nums">
            {number}
          </span>
          <span className="h-px w-3 bg-border" aria-hidden />
          <span className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {service.category}
          </span>
        </div>
        <h3 className="mt-1 font-heading text-[0.95rem] font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand sm:text-base">
          {service.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-5">
          {service.description}
        </p>
      </div>
    </motion.article>
  );
}
