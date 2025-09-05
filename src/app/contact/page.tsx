import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { SpaceWrapper } from "@/components/space-wrapper";

export const metadata: Metadata = {
  title: "Contact Us | CropLife Navigator",
  description: "Get in touch with us for inquiries, support, or to place an order.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-secondary/50 py-16 md:py-24">
        <SpaceWrapper className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Reach out to us with any questions or to discuss your needs.
          </p>
        </SpaceWrapper>
      </section>

      <section className="py-16 md:py-24">
        <SpaceWrapper>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Send us a message</h2>
                <p className="text-muted-foreground mb-6">Our team will get back to you as soon as possible.</p>
                <ContactForm />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-headline mb-6">Our Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-muted-foreground">123 Green Valley Rd, Harvestville, AG 45678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">(123) 456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">contact@croplifenavigator.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SpaceWrapper>
      </section>
    </div>
  );
}
