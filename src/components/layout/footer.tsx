import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { SpaceWrapper } from "../space-wrapper";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
];


export function Footer() {
  return (
    <footer className="bg-secondary/50 text-foreground">
      <SpaceWrapper className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                 <div className="flex items-center space-x-2 mb-4">
                    <Image src="https://i.ibb.co/8DPGfb59/Logo-page-0001-removebg-preview.png" alt="Crop Life Care Fertilizers Logo" width={40} height={40} className="h-10 w-auto" />
                    <span className="font-bold text-xl">Crop Life Care Fertilizers</span>
                </div>
                <p className="text-muted-foreground text-base max-w-sm">
                    Pioneering agricultural solutions for a thriving planet. We are committed to innovation, quality, and the success of farmers everywhere.
                </p>
                 <div className="mt-6 flex space-x-2">
                    {socialLinks.map((link, i) => (
                        <Button asChild key={i} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                            <Link href={link.href}>
                                <link.icon className="h-5 w-5" />
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-3">
                    {navLinks.map((link) => (
                         <li key={link.href}>
                            <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </SpaceWrapper>
      <div className="border-t bg-secondary/80">
        <SpaceWrapper className="py-6 text-center text-sm text-muted-foreground">
             <p>&copy; {new Date().getFullYear()} CropLife Care Fertilizers. All Rights Reserved.</p>
        </SpaceWrapper>
      </div>
    </footer>
  );
}
