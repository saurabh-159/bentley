"use client";

import { useState } from "react";
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
  Droplets,
  Layers,
  Route,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem, RevealStagger } from "./reveal";
import { SectionHeading } from "./section-heading";
import { categoryPath, productPath, type ProductCategory } from "@/lib/catalog";

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

const categories: {
  id: Category;
  icon: typeof Layers;
}[] = [
  { id: "All", icon: Layers },
  { id: "Structural", icon: Building2 },
  { id: "Civil", icon: Route },
  { id: "Water & build", icon: Droplets },
  { id: "CAD & MEP", icon: Box },
];

const categoryHrefs: Record<Exclude<Category, "All">, ProductCategory> = {
  Structural: "Structural analysis and detailing",
  Civil: "Civil and transportation",
  "Water & build": "Water and construction",
  "CAD & MEP": "CAD and MEP",
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function countFor(id: Category) {
  if (id === "All") return products.length;
  return products.filter((item) => item.category === id).length;
}

/**
 * Products
 * Content: Synergic — STAAD.Pro, WorkSuite, OpenRoads, Ferrovia, SYNCHRO, Urbano, BricsCAD, Ax3000
 * UI: Bentley — large feature tiles, product name + one line, hover image, "Explore software"
 */
export function Products() {
  const reduceMotion = useReducedMotion();
  const [category, setCategory] = useState<Category>("All");
  const visible =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

  return (
    <section id="products" className="scroll-mt-24 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <Reveal>
          <SectionHeading
            label="Software"
            title="Engineering tools for every discipline"
            description="From structural analysis to roads, water, CAD, and construction sequencing — licensed and supported in India."
            action={
              <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand/80"
                >
                  Explore software
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Browse categories
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            }
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <LayoutGroup>
              <div
                role="tablist"
                aria-label="Product categories"
                className="flex gap-1 overflow-x-auto border-b border-border pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {categories.map((item) => {
                  const active = category === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setCategory(item.id)}
                      className={cn(
                        "relative flex shrink-0 items-center gap-2 px-3.5 py-2 text-sm font-medium tracking-wide transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden />
                      {item.id}
                      <span
                        className={cn(
                          "tabular-nums text-[11px]",
                          active ? "text-brand" : "text-muted-foreground/70"
                        )}
                      >
                        {countFor(item.id)}
                      </span>
                      {active ? (
                        <motion.span
                          layoutId="products-tab-indicator"
                          className="absolute inset-x-3 -bottom-px h-[2px] bg-brand"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 32 }
                          }
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <p className="hidden text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={category}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="inline-flex items-center gap-3"
                >
                  {visible.length}{" "}
                  {visible.length === 1 ? "product" : "products"}
                  {category !== "All" ? (
                    <Link
                      href={categoryPath(categoryHrefs[category])}
                      className="normal-case tracking-normal text-brand hover:text-brand/80"
                    >
                      View category
                    </Link>
                  ) : null}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>
        </Reveal>

        <RevealStagger
          key={category}
          className={cn(
            "mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2",
            category === "All" ? "lg:grid-cols-6" : "lg:grid-cols-3"
          )}
        >
          {visible.map((product, index) => (
            <RevealItem
              key={product.name}
              className={cn(
                category === "All" &&
                  product.featured &&
                  "sm:col-span-2 lg:col-span-3",
                category === "All" &&
                  !product.featured &&
                  "lg:col-span-2"
              )}
            >
              <ProductTile
                product={product}
                index={index}
                tall={category === "All" && product.featured}
                reduceMotion={!!reduceMotion}
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
  index,
  tall,
  reduceMotion,
}: {
  product: (typeof products)[number];
  index: number;
  tall: boolean;
  reduceMotion: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="h-full"
    >
      <Link
        href={productPath(product.name)}
        className={cn(
          "group relative block h-full overflow-hidden bg-muted",
          tall ? "aspect-[2/1] lg:aspect-[21/9]" : "aspect-[16/10]"
        )}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes={
            tall
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />

        {!reduceMotion ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
        ) : null}

        <span className="absolute top-0 left-0 h-[3px] w-0 bg-brand transition-[width] duration-500 group-hover:w-full" />
        {tall ? (
          <span
            aria-hidden
            className="absolute top-0 left-0 h-full w-[3px] origin-top scale-y-0 bg-brand transition-transform duration-500 group-hover:scale-y-100"
          />
        ) : null}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5 sm:p-4">
          <span className="border border-white/35 bg-black/25 px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm">
            {product.category}
          </span>
          {product.featured ? (
            <span className="bg-brand px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-brand-foreground uppercase">
              Featured
            </span>
          ) : (
            <span
              aria-hidden
              className="font-heading text-2xl font-semibold tracking-tight text-white/20 sm:text-3xl"
            >
              {number}
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3.5 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:p-4">
          <h3
            className={cn(
              "font-heading font-semibold tracking-tight text-white",
              tall ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            )}
          >
            {product.name}
          </h3>
          <p className="mt-1 max-w-sm text-sm leading-5 text-white/75">
            {product.line}
          </p>
          <span
            className={cn(
              "mt-2.5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-all duration-500",
              tall
                ? "opacity-80 group-hover:opacity-100"
                : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            )}
          >
            View product
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
