"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProductForm } from "./product-form";
import { useRouter } from "next/navigation";
import type { IProduct } from "@/models/Product";

type Product = IProduct & { id: string };

function EditProductDialog({ product }: { product: Product }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="w-full text-left">Edit</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <ProductForm product={product} onFormSubmit={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

export function ProductTable({ initialProducts }: { initialProducts: Product[] }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
        router.refresh();
      } else {
        const result = await response.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Failed to delete product.",
        });
      }
    });
  };

  return (
    <>
    <div className="flex justify-end">
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <ProductForm onFormSubmit={() => setAddModalOpen(false)}/>
            </DialogContent>
        </Dialog>
    </div>
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden md:table-cell">Featured</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt={product.title}
                  data-ai-hint="fertilizer bag"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={product.image}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className="hidden md:table-cell">
                {product.featured && <Badge>Yes</Badge>}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <EditProductDialog product={product} />
                    </DropdownMenuItem>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-destructive focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the product.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(product.id)} disabled={isPending}>
                                    {isPending ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </>
  );
}
