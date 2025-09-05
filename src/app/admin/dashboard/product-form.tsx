"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addProduct, updateProduct, type FormState } from "@/app/actions";
import type { Product } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function SubmitButton({ isEdit }: { isEdit: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Product" : "Add Product")}
        </Button>
    );
}

export function ProductForm({ product }: { product?: Product }) {
    const isEdit = !!product;
    const action = isEdit ? updateProduct : addProduct;
    const [state, formAction] = useFormState(action, { message: "", success: false });
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        if (state.message) {
            toast({
                variant: state.success ? "default" : "destructive",
                title: state.success ? "Success" : "Error",
                description: state.message,
            });
        }
        if (state.success && !isEdit) {
           router.push('/admin/dashboard');
        }
    }, [state, toast, router, isEdit]);

    return (
        <Card>
            <form action={formAction}>
                <CardContent className="space-y-6 pt-6">
                    {isEdit && <input type="hidden" name="id" value={product.id} />}
                    {isEdit && <input type="hidden" name="image" value={product.image} />}
                    
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={product?.title} />
                        {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title.join(", ")}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={product?.description} />
                         {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description.join(", ")}</p>}
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" name="price" defaultValue={product?.price} />
                         {state.errors?.price && <p className="text-sm text-destructive">{state.errors.price.join(", ")}</p>}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox id="featured" name="featured" defaultChecked={product?.featured} />
                        <Label htmlFor="featured">Featured Product</Label>
                    </div>

                    {isEdit && product.image && (
                         <div className="space-y-2">
                            <Label>Current Image</Label>
                            <Image src={product.image} alt={product.title} width={150} height={100} className="rounded-md border" />
                            <p className="text-xs text-muted-foreground">Image uploading is not implemented in this demo. The existing image will be retained.</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <SubmitButton isEdit={isEdit} />
                </CardFooter>
            </form>
        </Card>
    );
}
