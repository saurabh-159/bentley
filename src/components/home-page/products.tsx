"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem, RevealStagger } from "./reveal";
import { SectionHeading } from "./section-heading";

type Category = "All" | "Structural" | "Civil" | "Water & build" | "CAD & MEP";

const products = [
  {
    name: "STAAD.Pro",
    line: "3D structural analysis and design",
    category: "Structural",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Steel structure under construction",
  },
  {
    name: "OpenRoads Designer",
    line: "End-to-end detailed road design",
    category: "Civil",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Highway corridor at dusk",
  },
  {
    name: "SYNCHRO",
    line: "4D construction planning and management",
    category: "Water & build",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Construction site with tower cranes",
  },
  {
    name: "WaterGEMS",
    line: "Water distribution analysis and design",
    category: "Water & build",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Water infrastructure and treatment plant",
  },
  {
    name: "BricsCAD Pro",
    line: "Professional 2D and 3D CAD, without compromise",
    category: "CAD & MEP",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Engineer working at a CAD workstation",
  },
  {
    name: "Structural WorkSuite",
    line: "Complete structural analysis toolkit",
    category: "Structural",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern concrete and glass building structure",
  },
  {
    name: "OpenRail Designer",
    line: "BIM-ready railway corridor design",
    category: "Civil",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Railway tracks stretching into the distance",
  },
  {
    name: "Ax3000 MEP",
    line: "Building services, energy, and VR workflows",
    category: "CAD & MEP",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Mechanical building services in a plant room",
  },
] as const;

const categories: Category[] = [
  "All",
  "Structural",
  "Civil",
  "Water & build",
  "CAD & MEP",
];

/**
 * Products
 * Content: Synergic — STAAD.Pro, WorkSuite, OpenRoads, Ferrovia, SYNCHRO, Urbano, BricsCAD, Ax3000
 * UI: Bentley — large feature tiles, product name + one line, hover image, "Explore software"
 */
export function Products() {
  const [category, setCategory] = useState<Category>("All");
  const visible =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

  return (
    <section id="products" className="scroll-mt-24 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <SectionHeading
            label="Software"
            title="Engineering tools for every discipline"
            description="From structural analysis to roads, water, CAD, and construction sequencing — licensed and supported in India."
            action={
              <Link
                href="/#contact"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                Explore software
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="flex gap-1 overflow-x-auto border-b border-border pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  "relative shrink-0 px-3.5 py-2.5 text-sm font-medium tracking-wide transition-colors",
                  category === item
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item}
                {category === item ? (
                  <span className="absolute inset-x-3 -bottom-px h-[2px] bg-brand" />
                ) : null}
              </button>
            ))}
          </div>
        </Reveal>

        <RevealStagger
          key={category}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visible.map((product) => (
            <RevealItem
              key={product.name}
              className={cn(
                category === "All" && product.featured && "sm:col-span-1 lg:col-span-2"
              )}
            >
              <ProductTile
                product={product}
                tall={category === "All" && product.featured}
              />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function ProductTile({
  product,
  tall,
}: {
  product: (typeof products)[number];
  tall: boolean;
}) {
  return (
    <Link
      href="/#contact"
      className={cn(
        "group relative block overflow-hidden bg-muted",
        tall ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[4/3]"
      )}
    >
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        sizes={
          tall
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
      <span className="absolute top-0 left-0 h-[3px] w-0 bg-brand transition-[width] duration-500 group-hover:w-full" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-white sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-1 max-w-sm text-sm text-white/75">{product.line}</p>
      </div>
    </Link>
  );
}
