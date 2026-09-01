import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDetail } from "@/components/categories-page/category-detail";
import {
  categoryMeta,
  getCategoryBySlug,
  productCategories,
} from "@/lib/catalog";

type CategoryParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productCategories.map((category) => ({
    slug: categoryMeta[category].slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryParams): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: "Category | Synergic Information Solutions" };
  }
  const meta = categoryMeta[category];
  return {
    title: `${category} | Synergic Information Solutions`,
    description: meta.description,
  };
}

export default async function CategoryDetailRoute({ params }: CategoryParams) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <CategoryDetail category={category} />
    </div>
  );
}
