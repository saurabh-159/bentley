import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FloatingContact } from "@/components/home-page/floating-contact";
import { ProductDetail } from "@/components/products-page/product-detail";
import { catalog, getProduct, getRelatedProducts } from "@/lib/catalog";

type ProductParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalog.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductParams): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Product | Synergic Information Solutions" };
  }
  return {
    title: `${product.name} | Synergic Information Solutions`,
    description: product.description,
  };
}

export default async function ProductDetailRoute({ params }: ProductParams) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <ProductDetail
        key={product.slug}
        product={product}
        related={getRelatedProducts(slug)}
      />
      <FloatingContact />
    </div>
  );
}
