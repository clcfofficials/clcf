
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
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex items-center cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90dvh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <ProductForm product={product} onFormSubmit={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

function DeleteProductAlert({ id, onConfirm, isPending }: { id: string, onConfirm: (id: string) => void, isPending: boolean }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    className="w-full text-left flex items-center text-destructive focus:text-destructive cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
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
                    <AlertDialogAction onClick={() => onConfirm(id)} disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
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
                <Button 
                  size="lg" 
                  className="relative group overflow-hidden px-8 py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                    <div className="absolute inset-0 w-0 bg-white/20 opacity-50 group-hover:w-full transition-all duration-500 ease-out"></div>
                    <span className="relative flex items-center">
                      <PlusCircle className="mr-2 h-5 w-5" /> Add Product
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90dvh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <ProductForm onFormSubmit={() => setAddModalOpen(false)}/>
            </DialogContent>
        </Dialog>
    </div>
    <div className="border rounded-lg bg-card shadow-sm mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
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
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
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
                    <EditProductDialog product={product} />
                    <DropdownMenuSeparator />
                    <DeleteProductAlert id={product.id} onConfirm={handleDelete} isPending={isPending} />
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
