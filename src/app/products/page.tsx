import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/placeholder-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Products | CropLife Navigator",
  description: "Browse our full range of high-quality fertilizers.",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Products</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive range of fertilizers, designed to meet the diverse needs of modern agriculture.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
