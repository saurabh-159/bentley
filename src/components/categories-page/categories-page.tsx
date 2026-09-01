"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Box,
  Building2,
  Droplets,
  Route,
} from "lucide-react";
import { HeroCopySwiper } from "@/components/hero-copy-swiper";
import { FloatingContact } from "@/components/home-page/floating-contact";
import { Reveal, RevealItem, RevealStagger } from "@/components/home-page/reveal";
import { cn } from "@/lib/utils";
import {
  catalog,
  categoryCount,
  categoryMeta,
  categoryPath,
  productCategories,
  productsInCategory,
  type ProductCategory,
} from "@/lib/catalog";

const categoryIcons = {
  "Structural analysis and detailing": Building2,
  "Civil and transportation": Route,
  "Water and construction": Droplets,
  "CAD and MEP": Box,
} as const;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80";

const heroSlides = [
  {
    title: "Software by discipline",
    description:
      "Four focused catalogs for structural, civil, water, and CAD teams — licensed and supported in India.",
  },
  ...productCategories.map((category) => ({
    title: categoryMeta[category].shortName,
    description: categoryMeta[category].description,
  })),
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CategoriesPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <main>
        <section className="relative isolate overflow-hidden bg-foreground">
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: easeOut }}
          >
            <Image
              src={HERO_IMAGE}
              alt="City skyline representing the infrastructure disciplines we support"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/62 to-black/35"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
          />
          <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand" />

          <div className="relative mx-auto w-full max-w-[92rem] px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20 lg:px-8 lg:pt-10 lg:pb-24">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm"
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
              <span aria-current="page">Categories</span>
            </nav>

            <HeroCopySwiper
              slides={heroSlides}
              ariaLabel="Category highlights"
            />

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {productCategories.map((category) => (
                <Link
                  key={category}
                  href={categoryPath(category)}
                  className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/15"
                >
                  {categoryMeta[category].shortName}
                  <span className="ml-1.5 tabular-nums text-white/55">
                    {categoryCount(category)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
                {productCategories.length} categories · {catalog.length} products
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Choose a catalog
              </h2>
            </Reveal>

            <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {productCategories.map((category, index) => (
                <RevealItem key={category}>
                  <CategoryCard
                    category={category}
                    index={index}
                    reduceMotion={!!reduceMotion}
                  />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="border-t border-border bg-background">
          <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
                Need a hand
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Not sure which category fits?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Browse the full catalog, or talk to us and we will match software
                to the work you actually do.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center border border-border px-6 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-muted"
              >
                All products
              </Link>
              <Link
                href="/#contact"
                className="group inline-flex h-12 items-center justify-center gap-2 bg-brand px-6 text-xs font-semibold tracking-[0.14em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
              >
                Talk to us
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FloatingContact />
    </>
  );
}

function CategoryCard({
  category,
  index,
  reduceMotion,
}: {
  category: ProductCategory;
  index: number;
  reduceMotion: boolean;
}) {
  const meta = categoryMeta[category];
  const Icon = categoryIcons[category];
  const products = productsInCategory(category);
  const featured = products.filter((item) => item.featured);
  const preview = (featured.length > 0 ? featured : products).slice(0, 3);
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="h-full"
    >
      <Link
        href={categoryPath(category)}
        className={cn(
          "group relative flex h-full min-h-[22rem] overflow-hidden rounded-2xl bg-muted sm:min-h-[24rem]",
          "shadow-[0_18px_40px_-28px_rgba(15,15,15,0.5)]"
        )}
      >
        <Image
          src={meta.image}
          alt={meta.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15" />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        <span className="absolute top-0 left-0 h-[3px] w-0 bg-brand transition-[width] duration-500 group-hover:w-full" />

        <div className="relative flex w-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="grid size-11 place-items-center rounded-lg border border-white/25 bg-white/10 text-white backdrop-blur-sm">
              <Icon className="size-5" aria-hidden />
            </span>
            <span
              aria-hidden
              className="font-heading text-3xl font-semibold tracking-tight text-white/25"
            >
              {number}
            </span>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
              {meta.shortName}
            </h2>
            <p className="mt-1 text-sm text-white/75">{meta.tagline}</p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {preview.map((item) => (
                <li
                  key={item.slug}
                  className="rounded-md border border-white/20 bg-black/25 px-2 py-0.5 text-[11px] font-medium text-white/85 backdrop-blur-sm"
                >
                  {item.name}
                </li>
              ))}
            </ul>

            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-white uppercase">
              Browse category
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
