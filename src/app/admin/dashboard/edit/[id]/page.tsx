import { getProduct } from "@/app/actions";
import { ProductForm } from "../../product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
         <Button asChild variant="outline" size="icon">
            <Link href="/admin/dashboard">
                <ArrowLeft />
                <span className="sr-only">Back to Dashboard</span>
            </Link>
        </Button>
        <div>
            <h2 className="text-3xl font-bold font-headline">Edit Product</h2>
            <p className="text-muted-foreground">Update the details for "{product.title}".</p>
        </div>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
