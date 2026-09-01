import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page/products-page";

export const metadata: Metadata = {
  title: "Products | Synergic Information Solutions",
  description:
    "Browse STAAD.Pro, OpenRoads, SYNCHRO, WaterGEMS, BricsCAD, and more engineering software licensed and supported in India.",
};

export default function ProductsRoute() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <ProductsPage />
    </div>
  );
}
