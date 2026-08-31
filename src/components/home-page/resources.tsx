import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "./reveal";
import { SectionHeading } from "./section-heading";

const articles = [
  {
    category: "Product",
    date: "12 Aug 2026",
    title: "Why Indian structural teams still start with STAAD.Pro",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "High-rise structural grid",
  },
  {
    category: "Insight",
    date: "28 Jul 2026",
    title: "From corridor to construction: OpenRoads on Indian highways",
    image:
      "https://images.unsplash.com/photo-1465443333659-0283149ce63b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Elevated highway through a city",
  },
  {
    category: "Guide",
    date: "4 Jun 2026",
    title: "Pipe networks without the detour: Urbano for water and sewer",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Water and landscape infrastructure",
  },
] as const;

/**
 * Resource center
 * Content: Synergic — STAAD.Pro, OpenRoads, Urbano / Civil 3D articles
 * UI: Bentley — "News, insights, and more" — image, date, title, category
 */
export function Resources() {
  return (
    <section id="resources" className="scroll-mt-24 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <SectionHeading
            label="Resource center"
            title="News, insights, and more"
            action={
              <Link
                href="/#resources"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                View all
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </Reveal>

        <RevealStagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {articles.map((article) => (
            <RevealItem key={article.title}>
              <Link href="/#contact" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] uppercase">
                  <span className="text-brand">{article.category}</span>
                  <span className="h-px w-4 bg-border" />
                  <time className="text-muted-foreground">{article.date}</time>
                </div>
                <h3 className="mt-2.5 font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
                  {article.title}
                </h3>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
