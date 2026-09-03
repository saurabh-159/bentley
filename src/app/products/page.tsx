import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page/products-page";

export const metadata: Metadata = {
  title: "Products | Synergic Information Solutions",
  description:
    "Browse Bentley Systems, BricsCAD, GstarCAD, and AX3000 MEP — four technology foundations licensed and supported in India.",
};

export default function ProductsRoute() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <ProductsPage />
    </div>
  );
}
