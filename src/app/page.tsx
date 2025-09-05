import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/placeholder-data";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, HeartHandshake, Sprout, Truck } from "lucide-react";
import { SpaceWrapper } from "@/components/space-wrapper";

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white bg-black">
        <Image
          src="https://picsum.photos/1600/900"
          alt="A vibrant green field under a clear blue sky"
          data-ai-hint="green field"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-headline font-bold !text-white drop-shadow-lg">
            Nurturing Growth, Harvesting Success
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto !text-white/90 drop-shadow-md">
            Your trusted partner in agriculture, providing premium fertilizers for a bountiful future.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Explore Our Products <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/50">
        <SpaceWrapper className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Welcome to CropLife Navigator</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
            At CropLife Care Fertilizers (CLCF), we are dedicated to empowering farmers with high-quality, innovative, and sustainable fertilization solutions. Our mission is to enhance crop yield and quality, ensuring food security for generations to come.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-8">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </SpaceWrapper>
      </section>

      <section className="py-16 md:py-24">
        <SpaceWrapper>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Products</h2>
            <p className="mt-2 text-lg text-muted-foreground">Top solutions trusted by farmers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">View All Products <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </SpaceWrapper>
      </section>
      
      <section className="bg-muted/30 py-16 md:py-24">
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
