import type { Metadata } from "next";
import { CategoriesPage } from "@/components/categories-page/categories-page";

export const metadata: Metadata = {
  title: "Categories | Synergic Information Solutions",
  description:
    "Browse engineering software by discipline — structural analysis, civil and transportation, water and construction, and CAD and MEP.",
};

export default function CategoriesRoute() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <CategoriesPage />
    </div>
  );
}
