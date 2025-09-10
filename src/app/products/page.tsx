
import { unstable_noStore as noStore } from 'next/cache';
import { ProductGrid } from './product-grid';
import type { IProduct } from "@/models/Product";

type Product = IProduct & { _id: string; id: string; };

async function getProducts(): Promise<Product[]> {
  noStore();
  const url = new URL('/api/products', process.env.NEXT_PUBLIC_URL);
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Failed to fetch products");
    return [];
  }
  const data = await res.json();
  // Ensure each product has a string 'id'
  return data.map((p: any) => ({ ...p, id: p._id.toString() }));
}


export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="min-h-screen bg-background">
      <ProductGrid initialProducts={products} />
    </div>
  )
}
