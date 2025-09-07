import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, HeartHandshake, Sprout, Truck } from "lucide-react";
import { SpaceWrapper } from "@/components/space-wrapper";
import type { IProduct } from "@/models/Product";
import { unstable_noStore as noStore } from "next/cache";
import { HeroSection } from "@/components/hero-section";
import CropLifeCareIntro from "@/components/croplife-care-intro";

type Product = IProduct & { _id: string };

async function getProducts(): Promise<Product[]> {
  noStore();
  const url = new URL('/api/products', process.env.NEXT_PUBLIC_URL);
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Failed to fetch products");
    return [];
  }
  return res.json();
}

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter(p => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col">
      <HeroSection />
      
      <CropLifeCareIntro />

      <section className="py-16 md:py-24">
        <SpaceWrapper>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Products</h2>
            <p className="mt-2 text-lg text-muted-foreground">Top solutions trusted by farmers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={{...product, id: product._id.toString()}} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">View All Products <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </SpaceWrapper>
      </section>
      
      <section className="py-16 md:py-24 bg-muted/30">
        <SpaceWrapper>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose Us?</h2>
                <p className="mt-2 text-lg text-muted-foreground">Your success is our mission.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                            <Sprout size={32} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Quality & Innovation</CardTitle>
                        <CardDescription className="mt-2">
                            Our products are formulated with the highest quality ingredients and backed by scientific research to ensure maximum effectiveness.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                            <HeartHandshake size={32} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Unwavering Trust</CardTitle>
                        <CardDescription className="mt-2">
                            With decades of experience, we have built a legacy of trust and reliability with farmers across the nation.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                            <Truck size={32} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Expert Support</CardTitle>
                        <CardDescription className="mt-2">
                           Our team of agronomists is always ready to provide expert advice and support to help you achieve the best results.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </SpaceWrapper>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <SpaceWrapper className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Boost Your Yields?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Get in touch with our experts today to find the perfect fertilizer solution for your farm.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link href="/contact">Contact Us Now</Link>
          </Button>
        </SpaceWrapper>
      </section>
    </div>
  );
}
