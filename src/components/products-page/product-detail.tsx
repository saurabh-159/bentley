"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Box,
  Building2,
  Droplets,
  Route,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  categoryPath,
  type CatalogProduct,
} from "@/lib/catalog";
import { getProductPageContent } from "@/lib/product-copy";

const categoryIcons = {
  "Structural analysis and detailing": Building2,
  "Civil and transportation": Route,
  "Water and construction": Droplets,
  "CAD and MEP": Box,
} as const;

const sections = [
  { id: "overview", label: "Overview" },
  { id: "capabilities", label: "Capabilities" },
  { id: "technical", label: "Technical" },
  { id: "faq", label: "FAQ" },
  { id: "related", label: "Related" },
] as const;

export function ProductDetail({
  product,
  related,
}: {
  product: CatalogProduct;
  related: CatalogProduct[];
}) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]["id"]>("overview");
  const content = useMemo(() => getProductPageContent(product), [product]);
  const Icon = categoryIcons[product.category];
  const navItems =
    related.length > 0 ? sections : sections.filter((item) => item.id !== "related");

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const ctx = gsap.context(() => {
      const hero = root.querySelector("[data-pd-hero]");
      const heroMedia = root.querySelector("[data-pd-hero-media]");
      const heroShot = root.querySelector("[data-pd-hero-shot]");
      const progress = root.querySelector("[data-pd-progress]");
      const heroBits = root.querySelectorAll("[data-pd-hero-copy]");

      gsap.fromTo(
        heroBits,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.08,
        }
      );

      if (heroShot) {
        gsap.fromTo(
          heroShot,
          { x: 48, opacity: 0, rotate: 1.2 },
          { x: 0, opacity: 1, rotate: 0, duration: 1.05, ease: "power3.out", delay: 0.22 }
        );
      }

      if (hero && heroMedia) {
        gsap.to(heroMedia, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }

      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.35,
            },
          }
        );
      }

      sections.forEach((item) => {
        const trigger = root.querySelector(`#${item.id}`);
        if (!trigger) return;
        ScrollTrigger.create({
          trigger,
          start: "top 168",
          end: "bottom 168",
          onEnter: () => setActiveSection(item.id),
          onEnterBack: () => setActiveSection(item.id),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-pd-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 52, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      const cards = root.querySelectorAll("[data-pd-card]");
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-pd-cap]").forEach((cap, index) => {
        const media = cap.querySelector("[data-pd-cap-media]");
        const copy = cap.querySelector("[data-pd-cap-copy]");
        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.16 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: cap,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
        if (copy) {
          gsap.fromTo(
            copy,
            { x: index % 2 === 0 ? 40 : -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cap,
                start: "top 78%",
                once: true,
              },
            }
          );
        }
      });

      const techItems = root.querySelectorAll("[data-pd-tech]");
      if (techItems.length) {
        gsap.fromTo(
          techItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: techItems[0],
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = window.requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [product.slug, reduceMotion]);

  return (
    <main ref={rootRef} className="overflow-x-clip bg-background">
      <section
        data-pd-hero
        className="relative isolate overflow-hidden bg-foreground"
      >
        <div className="pointer-events-none absolute inset-0">
          <div data-pd-hero-media className="absolute inset-0 will-change-transform">
            <Image
              src={product.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/86 via-black/68 to-black/38"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/28"
          />
        </div>
        <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-0.5 bg-brand" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pt-10 lg:pb-24">
          <div className="lg:col-span-7">
            <nav
              data-pd-hero-copy
              aria-label="Breadcrumb"
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm"
            >
              <Link
                href="/products"
                className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Products
              </Link>
              <span className="text-white/45" aria-hidden>
                /
              </span>
              <Link
                href={categoryPath(product.category)}
                className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {product.category}
              </Link>
              <span className="text-white/45" aria-hidden>
                /
              </span>
              <span aria-current="page">{product.name}</span>
            </nav>

            <p
              data-pd-hero-copy
              className="mt-8 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase"
            >
              <span className="inline-block h-px w-8 bg-brand" aria-hidden />
              {product.vendor}
            </p>

            <h1
              data-pd-hero-copy
              className="mt-3 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.06]"
            >
              {product.name}
            </h1>
            <p
              data-pd-hero-copy
              className="mt-4 max-w-xl text-base leading-7 text-white/78 sm:text-[1.05rem]"
            >
              {product.line}
            </p>

            <div data-pd-hero-copy className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="group inline-flex h-12 items-center justify-center bg-brand px-7 text-xs font-semibold tracking-[0.16em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
              >
                Request a quote
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#capabilities"
                className="inline-flex h-12 items-center justify-center border border-white/25 px-7 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:border-white/50 hover:bg-white/5"
              >
                See capabilities
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              data-pd-hero-shot
              className="relative aspect-[16/10] overflow-hidden border border-white/15 bg-black/30 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={product.hoverImage}
                alt={product.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/55 px-4 py-3 backdrop-blur-sm">
                <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                  <Icon className="size-3.5 text-brand" />
                  {product.category}
                </p>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[4.5rem] z-40 border-b border-border bg-background/92 backdrop-blur-xl sm:top-20">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-1 px-2 sm:px-6">
          <nav
            aria-label="On this page"
            className="flex min-w-0 flex-1 items-center gap-0 overflow-x-auto"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative shrink-0 px-3 py-3.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors sm:px-4",
                  activeSection === item.id
                    ? "text-brand"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-0 h-0.5 origin-left bg-brand transition-transform duration-300",
                    activeSection === item.id ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            ))}
          </nav>
          <Link
            href="/#contact"
            className="ml-2 hidden h-10 shrink-0 items-center bg-brand px-4 text-[11px] font-semibold tracking-[0.14em] text-brand-foreground uppercase transition-colors hover:bg-brand/90 sm:inline-flex"
          >
            Enquire
          </Link>
        </div>
        <div className="h-0.5 bg-muted">
          <div
            data-pd-progress
            className="h-full origin-left bg-brand"
            style={reduceMotion ? undefined : { transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <section
        id="overview"
        className="scroll-mt-[7.75rem] bg-background sm:scroll-mt-[8.5rem]"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div data-pd-reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              <span className="inline-block h-px w-8 bg-brand" aria-hidden />
              Overview
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.7rem] lg:leading-[1.15]">
              {content.overviewTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {content.overviewBody}
            </p>
          </div>

          <aside data-pd-reveal className="lg:col-span-5">
            <div className="border border-border bg-muted/40">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <Icon className="size-4 text-brand" />
                <Link
                  href={categoryPath(product.category)}
                  className="text-sm font-medium transition-colors hover:text-brand"
                >
                  {product.category}
                </Link>
              </div>
              <dl className="divide-y divide-border">
                <MetaRow label="Vendor" value={product.vendor} />
                <MetaRow label="Price" value={product.price} />
                <div className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-4">
                  <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Industries
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {product.industries.map((industry) => (
                      <span
                        key={industry}
                        className="border border-border bg-background px-2 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase"
                      >
                        {industry}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:pb-22">
          <div className="grid gap-px bg-border sm:grid-cols-3">
            {content.benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                data-pd-card
                className="bg-background px-6 py-8 sm:px-8"
              >
                <p className="font-mono text-[11px] tracking-wider text-brand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {benefit.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="scroll-mt-[7.75rem] border-t border-border bg-background sm:scroll-mt-[8.5rem]"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div data-pd-reveal className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              Capabilities
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              What {product.name} helps you do
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              From modelling and analysis through documentation and delivery — the capabilities teams use on live jobs, licensed and supported in India.
            </p>
          </div>

          <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
            {content.capabilities.map((capability, index) => (
              <article
                key={capability.title}
                data-pd-cap
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <div
                  data-pd-cap-media-wrap
                  className={cn(
                    "overflow-hidden bg-muted lg:col-span-6",
                    index % 2 === 1 && "lg:order-2"
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div data-pd-cap-media className="absolute inset-0 will-change-transform">
                      <Image
                        src={capability.image}
                        alt={capability.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand" />
                  </div>
                </div>
                <div data-pd-cap-copy className="lg:col-span-6">
                  <p className="font-mono text-[11px] tracking-wider text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {capability.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div
          data-pd-reveal
          className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              Licensing
            </p>
            <p className="mt-1 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
              Enterprise and other licensing options
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.name} is licensed and supported in India through Synergic. Price: {product.price}.
            </p>
          </div>
          <Link
            href="/#contact"
            className="group inline-flex h-12 shrink-0 items-center justify-center bg-brand px-6 text-xs font-semibold tracking-[0.14em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
          >
            Talk to us
            <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section
        id="technical"
        className="scroll-mt-[7.75rem] bg-background sm:scroll-mt-[8.5rem]"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div data-pd-reveal className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              Technical capabilities
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              How {product.name} is put to work
            </h2>
          </div>
          <div className="mt-10 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
            {content.technical.map((group) => (
              <div key={group.title} data-pd-tech>
                <h3 className="font-heading text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-foreground/80"
                    >
                      <span className="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-[7.75rem] border-t border-border bg-muted/30 sm:scroll-mt-[8.5rem]"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-20">
          <div data-pd-reveal className="lg:col-span-4">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              FAQ
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Questions about {product.name}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Still deciding? Enquire and we will map seats, training, and how it sits with the rest of your stack.
            </p>
          </div>
          <div data-pd-reveal className="lg:col-span-8">
            <Accordion className="border-t border-border">
              {content.faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="rounded-none py-5 text-left font-heading text-base font-semibold tracking-tight hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section
          id="related"
          className="scroll-mt-[7.75rem] border-t border-border bg-background sm:scroll-mt-[8.5rem]"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <div data-pd-reveal>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
                Related software
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                <Link
                  href={categoryPath(product.category)}
                  className="transition-colors hover:text-brand"
                >
                  More in {product.category}
                </Link>
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  data-pd-reveal
                  className="group flex h-full flex-col overflow-hidden border border-border bg-background transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(15,15,15,0.45)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      {item.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {item.line}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                      View details
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative isolate overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={product.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/72 to-black/50"
          />
        </div>
        <div className="relative h-0.5 bg-brand" />
        <div
          data-pd-reveal
          className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:py-20"
        >
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase">
              <span className="inline-block h-px w-8 bg-brand" aria-hidden />
              Get started
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
              Ready to put {product.name} to work?
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              Licensed and supported in India through Synergic. Tell us about seats, training, and the rest of your stack.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex h-12 items-center justify-center bg-brand px-7 text-xs font-semibold tracking-[0.16em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
            >
              Request a quote
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center border border-white/20 px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:border-white/50 hover:bg-white/5"
            >
              All products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-4">
      <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
