import { getProducts } from "@/app/actions";
import { ProductTable } from "./product-table";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-headline">Products Management</h2>
        <p className="text-muted-foreground">Add, update, or delete products.</p>
      </div>
      
      <ProductTable products={products} />
    </div>
  );
}
