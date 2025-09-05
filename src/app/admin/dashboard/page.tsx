import { ProductTable } from "./product-table";
import type { Product } from "@/lib/placeholder-data";

async function getProducts(): Promise<Product[]> {
    // Using fetch to get data from our API endpoint
    // The URL needs to be absolute for server-side fetching.
    // We'll add a NEXT_PUBLIC_URL environment variable for this.
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, { cache: 'no-store' });

    if(!res.ok) {
        // In a real app, you'd want to handle this error more gracefully.
        console.error("Failed to fetch products", res.status, res.statusText);
        return [];
    }

    return res.json();
}


export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-headline">Products Management</h2>
        <p className="text-muted-foreground">Add, update, or delete products.</p>
      </div>
      
      <ProductTable initialProducts={products} />
    </div>
  );
}
