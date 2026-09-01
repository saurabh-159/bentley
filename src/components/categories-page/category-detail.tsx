"use client";

import { Suspense } from "react";
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
import { ProductsCatalog } from "@/components/products-page/products-catalog";
import { cn } from "@/lib/utils";
import {
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

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CategoryDetail({ category }: { category: ProductCategory }) {
  const reduceMotion = useReducedMotion();
  const meta = categoryMeta[category];
  const Icon = categoryIcons[category];
  const count = categoryCount(category);
  const products = productsInCategory(category);
  const heroSlides = [
    {
      title: category,
      description: meta.description,
    },
    ...products.map((product) => ({
      title: product.name,
      description: product.line,
    })),
  ];

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
              src={meta.image}
              alt={meta.imageAlt}
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
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm"
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
              <Link
                href="/categories"
                className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Categories
              </Link>
              <span className="text-white/45" aria-hidden>
                /
              </span>
              <span aria-current="page">{meta.shortName}</span>
            </nav>

            <p className="mt-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-white/80 uppercase">
              <span className="grid size-9 place-items-center rounded-md border border-white/25 bg-white/10">
                <Icon className="size-4 text-white" aria-hidden />
              </span>
              {count} {count === 1 ? "product" : "products"}
            </p>

            <HeroCopySwiper
              slides={heroSlides}
              ariaLabel={`${meta.shortName} highlights`}
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {productCategories.map((item) => {
                const active = item === category;
                return (
                  <Link
                    key={item}
                    href={categoryPath(item)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "bg-white text-foreground"
                        : "border border-white/25 bg-white/10 text-white/85 hover:border-white/50 hover:bg-white/15"
                    )}
                  >
                    {categoryMeta[item].shortName}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <Suspense fallback={<CatalogFallback />}>
          <ProductsCatalog lockedCategory={category} />
        </Suspense>

        <section className="border-t border-border bg-background">
          <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-14">
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Looking for something else? Browse every category, or jump into the
              full software catalog.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/categories"
                className="inline-flex h-12 items-center justify-center border border-border px-6 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-muted"
              >
                All categories
              </Link>
              <Link
                href="/products"
                className="group inline-flex h-12 items-center justify-center gap-2 bg-brand px-6 text-xs font-semibold tracking-[0.14em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
              >
                All products
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

function CatalogFallback() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-40 animate-pulse bg-muted" />
      </div>
    </section>
  );
}
