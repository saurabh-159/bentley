import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "./reveal";
import { SectionHeading } from "./section-heading";

const industries = [
  {
    name: "Architectural",
    challenge: "Coordinate design from concept through documentation.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Contemporary architectural facade",
  },
  {
    name: "Structural",
    challenge: "Analyze and design buildings and industrial structures with confidence.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Structural steel frame",
  },
  {
    name: "Rail & Road",
    challenge: "Deliver corridors, junctions, and rail alignments as one model.",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Railway corridor",
  },
  {
    name: "MEP",
    challenge: "Design building services that clash less and commission faster.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Mechanical plant room",
  },
  {
    name: "Construction",
    challenge: "Sequence the site in 4D before a single pour.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Active construction site",
  },
  {
    name: "Water",
    challenge: "Model networks, plants, and flood risk as a connected system.",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0195d8c5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Reservoir and water infrastructure",
  },
] as const;

/**
 * Solutions
 * Content: Synergic — Architectural, Structural, Rail & Road, MEP, Construction, Water
 * UI: Bentley — industry grid with photo, title, one-line challenge, "Learn more"
 */
export function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-24 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <SectionHeading
            label="Industries we empower"
            title="Solutions for the way you work"
            description="Whether you design buildings, corridors, plants, or networks, we match software to the discipline — not the other way around."
          />
        </Reveal>

        <RevealStagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item) => (
            <RevealItem key={item.name}>
              <Link href="/#contact" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-0 left-0 h-[3px] w-0 bg-brand transition-[width] duration-500 group-hover:w-full" />
                </div>
                <div className="pt-5 pb-2">
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {item.challenge}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand">
                    Learn more
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
