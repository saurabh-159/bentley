"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Box,
  Building2,
  Droplets,
  LayoutGrid,
  List,
  Route,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  catalog,
  categoryCount,
  categoryPath,
  featuredCount,
  filterCatalog,
  industries,
  industryCount,
  productCategories,
  productsInCategory,
  vendorCount,
  vendors,
  workflowCount,
  workflows,
  type CatalogProduct,
  type Industry,
  type ProductCategory,
  type SortKey,
  type Vendor,
  type Workflow,
} from "@/lib/catalog";

const categoryIcons = {
  "Structural analysis and detailing": Building2,
  "Civil and transportation": Route,
  "Water and construction": Droplets,
  "CAD and MEP": Box,
} as const;

const sortLabels: Record<SortKey, string> = {
  az: "Alphabetical (A-Z)",
  za: "Alphabetical (Z-A)",
  featured: "Featured first",
};

const filterSectionTitle = "text-[15px] font-semibold tracking-normal";
const filterSectionCount =
  "ml-1.5 text-[11px] font-medium tracking-normal text-muted-foreground";

const easeOut = [0.22, 1, 0.36, 1] as const;

function toggleValue<T extends string>(list: T[], value: T) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function ProductsCatalog({
  lockedCategory,
}: {
  lockedCategory?: ProductCategory;
} = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const catalogPath = lockedCategory
    ? categoryPath(lockedCategory)
    : "/products";
  const scopedCatalog = lockedCategory
    ? productsInCategory(lockedCategory)
    : catalog;
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    lockedCategory ? [lockedCategory] : []
  );
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);
  const [selectedWorkflows, setSelectedWorkflows] = useState<Workflow[]>([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("az");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (lockedCategory) {
      setSelectedCategories([lockedCategory]);
    }
  }, [lockedCategory]);

  const visible = useMemo(
    () =>
      filterCatalog({
        query,
        selectedIndustries,
        selectedCategories,
        selectedVendors,
        selectedWorkflows,
        featuredOnly,
        sort,
      }),
    [
      query,
      selectedIndustries,
      selectedCategories,
      selectedVendors,
      selectedWorkflows,
      featuredOnly,
      sort,
    ]
  );

  const activeFilterCount =
    selectedIndustries.length +
    selectedCategories.filter((category) => category !== lockedCategory).length +
    selectedVendors.length +
    selectedWorkflows.length +
    (featuredOnly ? 1 : 0) +
    (query.trim() ? 1 : 0);

  function clearFilters() {
    setSelectedIndustries([]);
    setSelectedCategories(lockedCategory ? [lockedCategory] : []);
    setSelectedVendors([]);
    setSelectedWorkflows([]);
    setFeaturedOnly(false);
    setQuery("");
    if (searchParams.get("q")) {
      router.replace(catalogPath);
    }
  }

  const filterProps = {
    selectedIndustries,
    selectedCategories,
    selectedVendors,
    selectedWorkflows,
    featuredOnly,
    onIndustryChange: (industry: Industry) =>
      setSelectedIndustries((current) => toggleValue(current, industry)),
    onCategoryChange: (category: ProductCategory) => {
      if (lockedCategory) return;
      setSelectedCategories((current) => toggleValue(current, category));
    },
    onVendorChange: (vendor: Vendor) =>
      setSelectedVendors((current) => toggleValue(current, vendor)),
    onWorkflowChange: (workflow: Workflow) =>
      setSelectedWorkflows((current) => toggleValue(current, workflow)),
    onFeaturedChange: () => setFeaturedOnly((current) => !current),
    onClear: clearFilters,
    activeCount: activeFilterCount,
    scopeCategory: lockedCategory,
    hideCategories: !!lockedCategory,
  };

  return (
    <section className="border-t border-border bg-muted/40">
      <div className="mx-auto w-full max-w-[92rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="lg:grid lg:grid-cols-[18.5rem_minmax(0,1fr)] lg:gap-7 xl:grid-cols-[19.5rem_minmax(0,1fr)] xl:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <FilterPanel idPrefix="desktop" {...filterProps} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="rounded-2xl border border-border bg-background p-2 sm:p-2.5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                    <SheetTrigger
                      render={
                        <Button
                          variant="outline"
                          className="h-12 rounded-xl px-3 lg:hidden"
                        />
                      }
                    >
                      <SlidersHorizontal className="size-4" />
                      Filters
                      {activeFilterCount > 0 ? (
                        <span className="ml-1 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-semibold text-brand-foreground">
                          {activeFilterCount}
                        </span>
                      ) : null}
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full p-0 sm:max-w-sm">
                      <SheetHeader className="border-b border-border">
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                          Narrow the catalog by industry and category.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="overflow-y-auto p-4">
                        <FilterPanel idPrefix="mobile" {...filterProps} />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex rounded-xl border border-border bg-muted/40 p-1">
                    <button
                      type="button"
                      aria-pressed={view === "grid"}
                      aria-label="Grid view"
                      onClick={() => setView("grid")}
                      className={cn(
                        "grid size-10 place-items-center rounded-lg transition-colors",
                        view === "grid"
                          ? "bg-foreground text-background shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <LayoutGrid className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-pressed={view === "list"}
                      aria-label="List view"
                      onClick={() => setView("list")}
                      className={cn(
                        "grid size-10 place-items-center rounded-lg transition-colors",
                        view === "list"
                          ? "bg-foreground text-background shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <List className="size-4" />
                    </button>
                  </div>
                </div>

                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="min-w-0 flex-1"
                >
                  <div className="flex h-12 items-center gap-1 rounded-xl border border-border bg-muted/30 pl-3.5 pr-1.5 transition-[border-color,box-shadow,background-color] focus-within:border-brand focus-within:bg-background focus-within:shadow-[0_0_0_3px_color-mix(in_oklch,var(--brand)_18%,transparent)]">
                    <Search className="size-4 shrink-0 text-muted-foreground" />
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search products"
                      aria-label="Search products"
                      className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
                    />
                    {query ? (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <X className="size-3.5" />
                      </button>
                    ) : null}
                    <button
                      type="submit"
                      className="h-9 shrink-0 rounded-lg bg-brand px-4 text-xs font-semibold tracking-[0.12em] text-brand-foreground uppercase transition-colors hover:bg-brand/90"
                    >
                      Search
                    </button>
                  </div>
                </form>

                <Select
                  value={sort}
                  onValueChange={(value) => {
                    if (value === "az" || value === "za" || value === "featured") {
                      setSort(value);
                    }
                  }}
                >
                  <SelectTrigger
                    size="default"
                    className="h-12 w-full min-w-[12.5rem] rounded-xl border-border bg-muted/30 sm:w-[13rem]"
                    aria-label="Sort products"
                  >
                    <SelectValue>{sortLabels[sort]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent align="end" alignItemWithTrigger={false}>
                    <SelectItem value="az">{sortLabels.az}</SelectItem>
                    <SelectItem value="za">{sortLabels.za}</SelectItem>
                    <SelectItem value="featured">{sortLabels.featured}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(selectedIndustries.length > 0 ||
              selectedCategories.length > (lockedCategory ? 1 : 0) ||
              selectedVendors.length > 0 ||
              selectedWorkflows.length > 0 ||
              featuredOnly) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {selectedIndustries.map((industry) => (
                  <FilterChip
                    key={industry}
                    label={industry}
                    onRemove={() =>
                      setSelectedIndustries((current) =>
                        current.filter((item) => item !== industry)
                      )
                    }
                  />
                ))}
                {selectedCategories
                  .filter((category) => category !== lockedCategory)
                  .map((category) => (
                  <FilterChip
                    key={category}
                    label={category}
                    onRemove={() =>
                      setSelectedCategories((current) =>
                        current.filter((item) => item !== category)
                      )
                    }
                  />
                ))}
                {selectedVendors.map((vendor) => (
                  <FilterChip
                    key={vendor}
                    label={vendor}
                    onRemove={() =>
                      setSelectedVendors((current) =>
                        current.filter((item) => item !== vendor)
                      )
                    }
                  />
                ))}
                {selectedWorkflows.map((workflow) => (
                  <FilterChip
                    key={workflow}
                    label={workflow}
                    onRemove={() =>
                      setSelectedWorkflows((current) =>
                        current.filter((item) => item !== workflow)
                      )
                    }
                  />
                ))}
                {featuredOnly ? (
                  <FilterChip
                    label="Featured"
                    onRemove={() => setFeaturedOnly(false)}
                  />
                ) : null}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-medium text-brand hover:text-brand/80"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="mt-5 flex items-end justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {visible.length} of {scopedCatalog.length}{" "}
                {visible.length === 1 ? "product" : "products"}
              </p>
            </div>

            {visible.length === 0 ? (
              <div className="mt-4 border border-dashed border-border bg-background px-6 py-16 text-center">
                <p className="font-heading text-lg font-semibold tracking-tight">
                  No products match those filters
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another search term, or clear the filters to see the full
                  catalog.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex h-10 items-center bg-brand px-5 text-xs font-semibold tracking-[0.14em] text-brand-foreground uppercase"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.ul
                  key={`${view}-${sort}-${query}-${selectedIndustries.join()}-${selectedCategories.join()}-${selectedVendors.join()}-${selectedWorkflows.join()}-${featuredOnly}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                  className={cn(
                    "mt-4 grid gap-4",
                    view === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  )}
                >
                  {visible.map((product, index) => (
                    <li key={product.slug}>
                      <ProductCard
                        product={product}
                        view={view}
                        index={index}
                        reduceMotion={!!reduceMotion}
                      />
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterPanel({
  idPrefix,
  selectedIndustries,
  selectedCategories,
  selectedVendors,
  selectedWorkflows,
  featuredOnly,
  onIndustryChange,
  onCategoryChange,
  onVendorChange,
  onWorkflowChange,
  onFeaturedChange,
  onClear,
  activeCount,
  scopeCategory,
  hideCategories,
}: {
  idPrefix: string;
  selectedIndustries: Industry[];
  selectedCategories: ProductCategory[];
  selectedVendors: Vendor[];
  selectedWorkflows: Workflow[];
  featuredOnly: boolean;
  onIndustryChange: (industry: Industry) => void;
  onCategoryChange: (category: ProductCategory) => void;
  onVendorChange: (vendor: Vendor) => void;
  onWorkflowChange: (workflow: Workflow) => void;
  onFeaturedChange: () => void;
  onClear: () => void;
  activeCount: number;
  scopeCategory?: ProductCategory;
  hideCategories?: boolean;
}) {
  const visibleIndustries = industries.filter(
    (industry) => industryCount(industry, scopeCategory) > 0
  );
  const visibleVendors = vendors.filter(
    (vendor) => vendorCount(vendor, scopeCategory) > 0
  );
  const visibleWorkflows = workflows.filter(
    (workflow) => workflowCount(workflow, scopeCategory) > 0
  );
  const productTotal = scopeCategory
    ? categoryCount(scopeCategory)
    : catalog.length;

  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-background shadow-[0_12px_32px_-24px_rgba(15,15,15,0.45)]">
      <span aria-hidden className="block h-[3px] bg-brand" />
      <div className="flex items-center justify-between gap-3 border-b border-black/8 px-4 py-3.5">
        <p className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <SlidersHorizontal className="size-4 text-brand" />
          Filters
        </p>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] font-semibold tracking-[0.14em] text-brand uppercase"
          >
            Reset
          </button>
        ) : (
          <span className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {productTotal}
          </span>
        )}
      </div>

      <div className="px-3 pb-3">
        <Accordion
          multiple
          defaultValue={
            hideCategories
              ? ["industries", "vendors"]
              : ["industries", "categories", "vendors"]
          }
          className="mt-1"
        >
          <AccordionItem value="industries" className="border-black/8">
            <AccordionTrigger className="rounded-none px-1 py-3 hover:no-underline">
              <span className={filterSectionTitle}>
                Industries
                <span className={filterSectionCount}>
                  ({selectedIndustries.length})
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <ul className="space-y-0.5">
                {visibleIndustries.map((industry) => (
                  <li key={industry}>
                    <FilterCheckbox
                      id={`${idPrefix}-industry-${industry}`}
                      label={industry}
                      count={industryCount(industry, scopeCategory)}
                      checked={selectedIndustries.includes(industry)}
                      onChange={() => onIndustryChange(industry)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {hideCategories ? null : (
            <AccordionItem value="categories" className="border-black/8">
              <AccordionTrigger className="rounded-none px-1 py-3 hover:no-underline">
                <span className={filterSectionTitle}>
                  Categories
                  <span className={filterSectionCount}>
                    ({selectedCategories.length})
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <ul className="space-y-0.5">
                  {productCategories.map((category) => (
                    <li key={category}>
                      <FilterCheckbox
                        id={`${idPrefix}-category-${category}`}
                        label={category}
                        count={categoryCount(category)}
                        checked={selectedCategories.includes(category)}
                        onChange={() => onCategoryChange(category)}
                      />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="vendors" className="border-black/8">
            <AccordionTrigger className="rounded-none px-1 py-3 hover:no-underline">
              <span className={filterSectionTitle}>
                Vendors
                <span className={filterSectionCount}>
                  ({selectedVendors.length})
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <ul className="space-y-0.5">
                {visibleVendors.map((vendor) => (
                  <li key={vendor}>
                    <FilterCheckbox
                      id={`${idPrefix}-vendor-${vendor}`}
                      label={vendor}
                      count={vendorCount(vendor, scopeCategory)}
                      checked={selectedVendors.includes(vendor)}
                      onChange={() => onVendorChange(vendor)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="workflows" className="border-black/8">
            <AccordionTrigger className="rounded-none px-1 py-3 hover:no-underline">
              <span className={filterSectionTitle}>
                Workflows
                <span className={filterSectionCount}>
                  ({selectedWorkflows.length})
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <ul className="space-y-0.5">
                {visibleWorkflows.map((workflow) => (
                  <li key={workflow}>
                    <FilterCheckbox
                      id={`${idPrefix}-workflow-${workflow}`}
                      label={workflow}
                      count={workflowCount(workflow, scopeCategory)}
                      checked={selectedWorkflows.includes(workflow)}
                      onChange={() => onWorkflowChange(workflow)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="offers" className="border-b-0">
            <AccordionTrigger className="rounded-none px-1 py-3 hover:no-underline">
              <span className={filterSectionTitle}>
                Offers
                <span className={filterSectionCount}>
                  ({featuredOnly ? 1 : 0})
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <FilterCheckbox
                id={`${idPrefix}-featured`}
                label="Featured products"
                count={featuredCount(scopeCategory)}
                checked={featuredOnly}
                onChange={onFeaturedChange}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function FilterCheckbox({
  id,
  label,
  count,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 px-2 py-2 text-[15px] leading-5 transition-colors",
        checked ? "bg-brand/5" : "hover:bg-muted"
      )}
    >
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <span
        className={cn(
          "min-w-0 flex-1 leading-5",
          checked ? "font-medium text-foreground" : "text-foreground/80"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "min-w-6 px-1.5 py-0.5 text-center text-[10px] leading-none tabular-nums",
          checked
            ? "bg-brand text-brand-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {count}
      </span>
    </label>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-background py-1 pr-1 pl-2.5 text-xs">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="grid size-5 place-items-center text-muted-foreground hover:text-foreground"
      >
        <X className="size-3" />
      </button>
    </span>
  );
}

function ProductCard({
  product,
  view,
  index,
  reduceMotion,
}: {
  product: CatalogProduct;
  view: "grid" | "list";
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = categoryIcons[product.category];
  const isList = view === "list";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04, ease: easeOut }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={cn(
        "group flex h-full rounded-2xl border border-border bg-background p-4 text-foreground",
        "shadow-[0_14px_36px_-28px_rgba(15,15,15,0.45)] transition-[border-color,box-shadow] duration-300",
        "hover:border-brand/40 hover:shadow-[0_22px_44px_-26px_rgba(15,15,15,0.5)]",
        isList ? "flex-col sm:flex-row sm:items-stretch sm:gap-5 sm:p-5" : "flex-col"
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          "relative overflow-hidden rounded-xl bg-muted",
          isList
            ? "aspect-[16/10] sm:aspect-auto sm:w-[16.5rem] sm:shrink-0 lg:w-[18.5rem]"
            : "aspect-[16/10]"
        )}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes={
            isList
              ? "(max-width: 640px) 100vw, 300px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className={cn(
            "object-cover transition-[opacity,transform] duration-700 ease-out",
            reduceMotion ? "" : "group-hover:scale-105 group-hover:opacity-0"
          )}
        />
        {reduceMotion ? null : (
          <Image
            src={product.hoverImage}
            alt=""
            fill
            sizes={
              isList
                ? "(max-width: 640px) 100vw, 300px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover opacity-0 scale-[1.08] transition-[opacity,transform] duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
        )}
        {product.featured ? (
          <span className="absolute top-3 left-3 z-10 rounded-md bg-brand px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-brand-foreground uppercase">
            Featured
          </span>
        ) : null}
      </Link>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          isList ? "mt-5 sm:mt-0 sm:py-1" : "mt-5"
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href={categoryPath(product.category)}
            aria-label={product.category}
            className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-muted text-brand transition-colors hover:border-brand/40 hover:bg-brand/5"
          >
            <Icon className="size-4" aria-hidden />
          </Link>
          <h2 className="min-w-0 font-heading text-lg font-bold tracking-tight uppercase sm:text-xl">
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors hover:text-brand"
            >
              {product.name}
            </Link>
          </h2>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">Starting at</p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-heading text-[1.65rem] leading-none font-bold tracking-tight sm:text-3xl">
            {product.price}
          </span>
          <span className="text-sm text-muted-foreground">INR</span>
        </p>

        <div className="mt-5 h-px bg-border" aria-hidden />

        <p className="mt-5 text-[15px] leading-6 text-foreground/80">
          {product.line}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-auto sm:pt-6">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-4 py-3 text-center text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-muted"
          >
            View product details
          </Link>
          <Link
            href="/#contact"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-4 py-3 text-center text-sm font-bold text-brand-foreground transition-colors hover:bg-brand/90"
          >
            Purchase {product.name} &gt;&gt;
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
