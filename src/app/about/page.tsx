
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Rocket, Target } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { SpaceWrapper } from "@/components/space-wrapper";

export const metadata: Metadata = {
  title: "About Us | Crop Life Care Fertilizers",
  description: "Learn about our mission, vision, and commitment to sustainable agriculture.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="bg-secondary/50 py-16 md:py-24">
        <SpaceWrapper className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">About CropLife Care Fertilizers</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Pioneering agricultural solutions for a thriving planet. We are committed to innovation, quality, and the success of farmers everywhere.
          </p>
        </SpaceWrapper>
      </section>

      <section className="py-16 md:py-24">
        <SpaceWrapper>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-headline font-bold text-primary mb-4">Our Story</h2>
              <p className="text-lg mb-4 text-foreground/80">
                Founded over three decades ago, CropLife Care Fertilizers (CLCF) began with a simple yet powerful goal: to provide farmers with superior products that enhance crop health and productivity. From a small, local operation, we have grown into a nationally recognized leader in the fertilizer industry, driven by our passion for agriculture and our dedication to our customers.
              </p>
              <p className="text-lg text-foreground/80">
                Our journey has been one of continuous learning and adaptation. We invest heavily in research and development to stay at the forefront of agricultural science, ensuring our products not only deliver exceptional results but also promote sustainable farming practices.
              </p>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image src="https://picsum.photos/600/600?grayscale" data-ai-hint="team photo" alt="CLCF Team" width={600} height={600} className="object-cover w-full h-full" />
            </div>
          </div>
        </SpaceWrapper>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <SpaceWrapper>
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                            <Target size={32} />
                        </div>
                        <CardTitle>Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>To empower farmers with innovative and effective fertilization solutions that maximize crop yield and quality, while promoting sustainable agricultural practices for a healthier planet.</p>
                    </CardContent>
                </Card>
                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                            <Rocket size={32} />
                        </div>
                        <CardTitle>Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>To be the leading partner in global agriculture, pioneering advancements that ensure food security and environmental stewardship for future generations.</p>
                    </CardContent>
                </Card>
                 <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                            <HeartHandshake size={32} />
                        </div>
                        <CardTitle>Our Values</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Integrity, Quality, Customer Success, and Sustainability are the pillars of our company. We operate with transparency and a deep respect for our customers and the environment.</p>
                    </CardContent>
                </Card>
            </div>
        </SpaceWrapper>
      </section>
    </div>
  );
}
