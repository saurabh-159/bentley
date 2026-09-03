"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  Box,
  Building2,
  CircleUser,
  Cpu,
  Database,
  GraduationCap,
  Droplets,
  Handshake,
  Headset,
  Layers,
  LayoutGrid,
  Menu,
  Route,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  categoryNav,
  featuredProducts,
  industryNav,
  productExpandLinks,
  resourceNav,
  serviceNav,
  solutionFeature,
  solutions,
  whoWeServe,
} from "./nav-data";
import { SiteLogo } from "./site-logo";

const navItemClass =
  "relative h-12 rounded-none bg-transparent px-3 text-[15px] font-medium tracking-wide text-foreground/70 hover:bg-transparent hover:text-foreground focus:bg-transparent data-popup-open:bg-transparent data-popup-open:text-foreground data-open:bg-transparent data-open:text-foreground";

const expandIcons = {
  "Find a local partner": Handshake,
  "Student & educator access": GraduationCap,
  "Browse categories": LayoutGrid,
  "Software catalog": Layers,
  "Professional services": Headset,
} as const;

const categoryIcons = {
  Structural: Building2,
  "Civil & transport": Route,
  "Water & construction": Droplets,
  "CAD & MEP": Box,
} as const;

const whoWeServeIcons = {
  "Engineering firms": Box,
  "Asset owners": CircleUser,
  Governments: Building2,
  Academia: GraduationCap,
} as const;

const featureLinkIcons = [Cpu, Sparkles, Database] as const;

const panelVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const panelItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  function searchProducts(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{
        boxShadow: scrolled
          ? "0 10px 30px -18px rgba(15, 15, 15, 0.28)"
          : "0 0 0 0 rgba(15, 15, 15, 0)",
      }}
      transition={{ duration: 0.25 }}
      className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center gap-6 px-4 sm:h-20 sm:px-6">
        <SiteLogo />

        <NavigationMenu
          key={pathname}
          align="center"
          delay={40}
          closeDelay={120}
          className="hidden flex-1 justify-center lg:flex"
        >
          <NavigationMenuList onMouseLeave={() => setHovered(null)}>
            <NavigationMenuItem onMouseEnter={() => setHovered("solutions")}>
              <NavigationMenuTrigger className={navItemClass}>
                Solutions
                <NavUnderline show={hovered === "solutions"} />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <SolutionsMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem onMouseEnter={() => setHovered("products")}>
              <NavMenuTriggerLink href="/products" className={navItemClass}>
                Products
                <NavUnderline show={hovered === "products"} />
              </NavMenuTriggerLink>
              <NavigationMenuContent className="p-0">
                <ProductsMenu onSearch={searchProducts} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem onMouseEnter={() => setHovered("services")}>
              <NavMenuTriggerLink href="/#services" className={navItemClass}>
                Services
                <NavUnderline show={hovered === "services"} />
              </NavMenuTriggerLink>
              <NavigationMenuContent className="p-0">
                <SimpleListMenu items={serviceNav} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem onMouseEnter={() => setHovered("industries")}>
              <NavMenuTriggerLink href="/#industries" className={navItemClass}>
                Industries
                <NavUnderline show={hovered === "industries"} />
              </NavMenuTriggerLink>
              <NavigationMenuContent className="p-0">
                <SimpleListMenu items={industryNav} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem onMouseEnter={() => setHovered("resources")}>
              <NavMenuTriggerLink href="/#resources" className={navItemClass}>
                Resources
                <NavUnderline show={hovered === "resources"} />
              </NavMenuTriggerLink>
              <NavigationMenuContent className="p-0">
                <SimpleListMenu items={resourceNav} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem onMouseEnter={() => setHovered("about")}>
              <NavigationMenuLink href="/about" className={navItemClass}>
                About
                <NavUnderline show={hovered === "about"} />
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem onMouseEnter={() => setHovered("categories")}>
              <NavMenuTriggerLink href="/categories" className={navItemClass}>
                Categories
                <NavUnderline show={hovered === "categories"} />
              </NavMenuTriggerLink>
              <NavigationMenuContent className="p-0">
                <CategoriesMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-10 text-foreground/80 hover:bg-muted hover:text-foreground"
                    aria-label="Search"
                  />
                }
              >
                <Search className="size-5" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-3">
                <form onSubmit={searchProducts} className="flex gap-2">
                  <Input
                    type="search"
                    name="q"
                    placeholder="Search products and solutions"
                    className="h-10 text-sm"
                  />
                  <Button type="submit" size="sm" className="h-10 px-4">
                    Go
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/#contact"
              className="hidden h-10 items-center bg-brand px-5 text-xs font-semibold tracking-[0.14em] text-brand-foreground uppercase transition-colors hover:bg-brand/90 md:inline-flex"
            >
              Contact us
            </Link>
          </motion.div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 text-foreground/80 hover:bg-muted hover:text-foreground lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full gap-0 border-border bg-background p-0 text-foreground sm:max-w-sm"
            >
              <SheetHeader className="border-b border-border">
                <SheetTitle className="text-lg text-foreground">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Synergic site navigation
                </SheetDescription>
              </SheetHeader>

              <ScrollArea className="flex-1">
                <nav className="flex flex-col px-4 py-2">
                  <Accordion>
                    <AccordionItem value="solutions" className="border-border">
                      <AccordionTrigger className="text-base text-foreground hover:no-underline">
                        Solutions
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 [&_a]:no-underline">
                        {solutions.map((item) => (
                          <MobileLink
                            key={item.label}
                            href={item.href}
                            nested
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </MobileLink>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="products" className="border-border">
                      <AccordionTrigger className="text-base text-foreground hover:no-underline">
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 [&_a]:no-underline">
                        {featuredProducts.map((item) => (
                          <MobileLink
                            key={item.label}
                            href={item.href}
                            nested
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </MobileLink>
                        ))}
                        <MobileLink
                          href="/products"
                          nested
                          onClick={() => setMobileOpen(false)}
                        >
                          All products
                        </MobileLink>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="services" className="border-border">
                      <AccordionTrigger className="text-base text-foreground hover:no-underline">
                        Services
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 [&_a]:no-underline">
                        {serviceNav.map((item) => (
                          <MobileLink
                            key={item.label}
                            href={item.href}
                            nested
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </MobileLink>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="industries" className="border-border">
                      <AccordionTrigger className="text-base text-foreground hover:no-underline">
                        Industries
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 [&_a]:no-underline">
                        {industryNav.map((item) => (
                          <MobileLink
                            key={item.label}
                            href={item.href}
                            nested
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </MobileLink>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="resources" className="border-border">
                      <AccordionTrigger className="text-base text-foreground hover:no-underline">
                        Resources
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 [&_a]:no-underline">
                        {resourceNav.map((item) => (
                          <MobileLink
                            key={item.label}
                            href={item.href}
                            nested
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </MobileLink>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <MobileLink href="/about" onClick={() => setMobileOpen(false)}>
                    About
                  </MobileLink>

                  <Accordion>
                    <AccordionItem value="categories" className="border-border">
                      <AccordionTrigger className="text-base text-foreground hover:no-underline">
                        Categories
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 [&_a]:no-underline">
                        {categoryNav.map((item) => (
                          <MobileLink
                            key={item.label}
                            href={item.href}
                            nested
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </MobileLink>
                        ))}
                        <MobileLink
                          href="/categories"
                          nested
                          onClick={() => setMobileOpen(false)}
                        >
                          All categories
                        </MobileLink>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </nav>
              </ScrollArea>

              <SheetFooter className="border-t border-border">
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center justify-center bg-brand text-xs font-semibold tracking-[0.14em] text-brand-foreground uppercase"
                >
                  Contact us
                </Link>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

function NavMenuTriggerLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <NavigationMenuTrigger
      nativeButton={false}
      render={<Link href={href} />}
      className={className}
      onClick={(event) => {
        event.preventBaseUIHandler();
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        router.push(href);
      }}
    >
      {children}
    </NavigationMenuTrigger>
  );
}

function NavUnderline({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.span
      layoutId="header-nav-underline"
      className="absolute inset-x-3 bottom-2 h-[2.5px] bg-brand"
      transition={{ type: "spring", stiffness: 480, damping: 34 }}
    />
  );
}

function SimpleListMenu({
  items,
}: {
  items: readonly { label: string; href: string }[];
}) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="show"
      className="min-w-[18rem] px-6 py-5"
    >
      <ul>
        {items.map((item) => (
          <motion.li key={item.label} variants={panelItemVariants}>
            <NavigationMenuLink
              href={item.href}
              className="rounded-none px-0 py-2.5 text-[15px] font-medium text-foreground/80 hover:bg-transparent hover:text-brand"
            >
              {item.label}
            </NavigationMenuLink>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProductsMenu({
  onSearch,
}: {
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const splitAt = Math.ceil(featuredProducts.length / 2);
  const leftColumn = featuredProducts.slice(0, splitAt);
  const rightColumn = featuredProducts.slice(splitAt);

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="show"
      className="flex w-[52rem] overflow-hidden rounded-[inherit] xl:w-[58rem]"
    >
      <div className="flex min-w-0 flex-1 flex-col px-7 py-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
          Featured products
        </p>

        <div className="mt-5 grid grid-cols-2 gap-x-10">
          <ul>
            {leftColumn.map((item) => (
              <motion.li key={item.label} variants={panelItemVariants}>
                <FeaturedProductLink item={item} />
              </motion.li>
            ))}
          </ul>
          <ul>
            {rightColumn.map((item) => (
              <motion.li key={item.label} variants={panelItemVariants}>
                <FeaturedProductLink item={item} />
              </motion.li>
            ))}
            <motion.li variants={panelItemVariants}>
              <NavigationMenuLink
                href="/products"
                className="rounded-none px-0 py-2.5 text-sm font-medium text-brand hover:bg-transparent hover:text-brand"
              >
                All products
                <span className="ml-1">{">"}</span>
              </NavigationMenuLink>
            </motion.li>
          </ul>
        </div>

        <form
          onSubmit={onSearch}
          className="mt-8 flex items-center gap-2.5 border-b border-border pb-2"
        >
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            name="q"
            placeholder="Search software"
            className="h-8 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </form>
      </div>

      <div className="w-[17.5rem] shrink-0 bg-muted/80 px-5 py-6 xl:w-[18.5rem]">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
          Expand what you can do
        </p>
        <div className="mt-4 space-y-1">
          {productExpandLinks.map((item) => {
            const Icon = expandIcons[item.label];
            return (
              <motion.div key={item.label} variants={panelItemVariants}>
                <NavigationMenuLink
                  href={item.href}
                  className="items-start gap-3 rounded-lg p-2.5 hover:bg-background"
                >
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs leading-4 text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                </NavigationMenuLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedProductLink({
  item,
}: {
  item: (typeof featuredProducts)[number];
}) {
  return (
    <NavigationMenuLink
      href={item.href}
      className="group flex flex-col items-start gap-0.5 rounded-none px-0 py-2.5 hover:bg-transparent"
    >
      <span className="flex items-center gap-2 text-[15px] font-medium text-foreground transition-colors group-hover:text-brand">
        {item.label}
        <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="grid grid-rows-[0fr] text-xs text-muted-foreground transition-[grid-template-rows] duration-200 group-hover:grid-rows-[1fr]">
        <span className="overflow-hidden">{item.description}</span>
      </span>
    </NavigationMenuLink>
  );
}

function CategoriesMenu() {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="show"
      className="flex w-[56rem] overflow-hidden rounded-[inherit] xl:w-[64rem]"
    >
      <div className="min-w-0 flex-1 px-6 py-6">
        <div className="flex items-end justify-between gap-4">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Software by discipline
          </p>
          <NavigationMenuLink
            href="/categories"
            className="rounded-none px-0 py-0 text-xs font-medium text-brand hover:bg-transparent hover:text-brand"
          >
            All categories
            <span className="ml-1">{">"}</span>
          </NavigationMenuLink>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {categoryNav.map((item) => {
            const Icon = categoryIcons[item.label as keyof typeof categoryIcons];
            return (
              <motion.div key={item.label} variants={panelItemVariants}>
                <div className="flex h-full flex-col rounded-xl border border-border/80 bg-muted/30 p-4 transition-colors hover:border-brand/30 hover:bg-muted/50">
                  <NavigationMenuLink
                    href={item.href}
                    className="items-start gap-3 rounded-none p-0 hover:bg-transparent"
                  >
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-brand">
                      {Icon ? <Icon className="size-4" /> : null}
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        {item.label}
                        <span className="text-[11px] font-normal tabular-nums text-muted-foreground">
                          {item.count}
                        </span>
                      </span>
                      <span className="text-xs leading-4 text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </NavigationMenuLink>

                  <ul className="mt-3 space-y-0.5 border-t border-border/80 pt-2.5">
                    {item.products.map((product) => (
                      <li key={product.label}>
                        <NavigationMenuLink
                          href={product.href}
                          className="rounded-md px-1.5 py-1.5 text-[13px] text-foreground/75 hover:bg-background hover:text-brand"
                        >
                          {product.label}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>

                  <NavigationMenuLink
                    href={item.href}
                    className="mt-auto rounded-none px-0 pt-3 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase hover:bg-transparent hover:text-brand"
                  >
                    View category
                    <ArrowRight className="ml-1 size-3.5" />
                  </NavigationMenuLink>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="w-[17.5rem] shrink-0 overflow-hidden bg-muted xl:w-[18.5rem]">
        <div className="relative h-40 w-full">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
            alt="Infrastructure skyline representing software by discipline"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
        <div className="px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Need a match
          </p>
          <p className="mt-2 text-sm leading-5 text-foreground/80">
            Not sure which catalog fits? Browse every discipline, or jump into
            the full software list.
          </p>
          <div className="mt-4 space-y-1">
            <motion.div variants={panelItemVariants}>
              <NavigationMenuLink
                href="/categories"
                className="items-center gap-2 rounded-lg p-2.5 hover:bg-background"
              >
                <LayoutGrid className="size-4 text-brand" />
                <span className="text-sm font-medium">All categories</span>
              </NavigationMenuLink>
            </motion.div>
            <motion.div variants={panelItemVariants}>
              <NavigationMenuLink
                href="/products"
                className="items-center gap-2 rounded-lg p-2.5 hover:bg-background"
              >
                <Layers className="size-4 text-brand" />
                <span className="text-sm font-medium">All products</span>
              </NavigationMenuLink>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SolutionsMenu() {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="show"
      className="flex w-[56rem] overflow-hidden xl:w-[64rem]"
    >
      <div className="w-[15rem] shrink-0 bg-muted/50 px-6 py-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
          Industries we empower
        </p>
        <ul className="mt-5">
          {solutions.map((item) => (
            <motion.li key={item.label} variants={panelItemVariants}>
              <NavigationMenuLink
                href={item.href}
                className="rounded-none px-0 py-2.5 text-[15px] font-medium text-foreground/80 hover:bg-transparent hover:text-brand"
              >
                {item.label}
              </NavigationMenuLink>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="min-w-0 flex-1 px-6 py-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
          Who we serve
        </p>
        <div className="mt-4 space-y-2">
          {whoWeServe.map((item) => {
            const Icon = whoWeServeIcons[item.label];
            return (
              <motion.div key={item.label} variants={panelItemVariants}>
                <NavigationMenuLink
                  href={item.href}
                  className="items-start gap-3 rounded-lg border border-border/80 bg-muted/40 p-3 hover:bg-muted"
                >
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs leading-4 text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                </NavigationMenuLink>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="w-[18.5rem] shrink-0 overflow-hidden bg-muted xl:w-[20rem]">
        <div className="relative h-36 w-full">
          <Image
            src={solutionFeature.image}
            alt={solutionFeature.imageAlt}
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
        <div className="px-5 py-4">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            {solutionFeature.title}
          </p>
          <ul className="mt-3">
            {solutionFeature.links.map((item, index) => {
              const Icon = featureLinkIcons[index] ?? Cpu;
              return (
                <motion.li key={item.label} variants={panelItemVariants}>
                  <NavigationMenuLink
                    href={item.href}
                    className="items-start gap-3 rounded-none border-b border-border px-0 py-3 last:border-b-0 hover:bg-transparent hover:text-brand"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm leading-5">{item.label}</span>
                  </NavigationMenuLink>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function MobileLink({
  href,
  nested = false,
  onClick,
  children,
}: {
  href: string;
  nested?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block py-2.5 text-base text-foreground/80 transition-colors hover:text-foreground",
        nested && "py-1.5 pl-1 text-sm text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}
