import { Suspense } from "react";
import { FloatingContact } from "@/components/home-page/floating-contact";
import { ProductsCatalog } from "./products-catalog";
import { ProductsHero } from "./products-hero";

export function ProductsPage() {
  return (
    <>
      <main>
        <ProductsHero />
        <Suspense fallback={<CatalogFallback />}>
          <ProductsCatalog />
        </Suspense>
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
