import { ProductCard } from "@/components/product-card";
import type { Metadata } from "next";
import { SpaceWrapper } from "@/components/space-wrapper";
import type { IProduct } from "@/models/Product";
import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Product = IProduct & { _id: string };

async function getProducts(): Promise<Product[]> {
  noStore();
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`);
  if (!res.ok) {
    console.error("Failed to fetch products");
    return [];
  }
  return res.json();
}

export const metadata: Metadata = {
  title: "Our Products | Crop Life Care Fertilizers",
  description: "Browse our full range of high-quality fertilizers.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="py-16 md:py-24">
      <SpaceWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Products</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of fertilizers, designed to meet the diverse needs of modern agriculture.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={{...product, id: product._id.toString()}} />
          ))}
        </div>
      </SpaceWrapper>
    </section>
  );
}
