import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Closing CTA
 * Content: Synergic — contact / demo intent (not on their current home as a dedicated band)
 * UI: Bentley — "Ready to transform your infrastructure projects?" + Talk to us
 */
export function Cta() {
  return (
    <section id="career" className="scroll-mt-24 bg-foreground text-background">
      <div className="h-0.5 bg-brand" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:py-28">
        <Reveal className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            Get started
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl lg:text-[3.15rem] lg:leading-[1.12]">
            Ready to transform your infrastructure projects?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-background/65">
            Request a demo, a licence quote, or a conversation about careers in
            Hyderabad. Our consultants will follow up with a fit for your
            discipline — not a generic catalogue.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#contact"
            className="inline-flex h-12 items-center justify-center bg-brand px-7 text-xs font-semibold tracking-[0.16em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
          >
            Talk to us
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex h-12 items-center justify-center border border-background/20 px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:border-background/50 hover:bg-background/5"
          >
            Send a message
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
