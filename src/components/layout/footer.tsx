
"use client";

import { Facebook, Instagram, Linkedin, Twitter, Leaf } from "lucide-react";
import Link from "next/link";
import { SpaceWrapper } from "../space-wrapper";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { motion } from "framer-motion";

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

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function Footer() {
  return (
    <motion.footer 
      className="bg-secondary/30 text-foreground relative overflow-hidden border-t"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [-100, 50],
            y: [-50, 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [100, -50],
            y: [50, -50],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      </div>

      <SpaceWrapper className="py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <motion.div variants={itemVariants} className="md:col-span-5 lg:col-span-6">
                 <div className="flex items-center space-x-2 mb-4">
                    <Image src="https://i.ibb.co/8DPGfb59/Logo-page-0001-removebg-preview.png" alt="Crop Life Care Fertilizers Logo" width={40} height={40} className="h-10 w-auto" />
                    <span className="font-bold text-xl">Crop Life Care Fertilizers</span>
                </div>
                <p className="text-muted-foreground text-base max-w-sm">
                    Pioneering agricultural solutions for a thriving planet. We are committed to innovation, quality, and the success of farmers everywhere.
                </p>
                 <div className="mt-6 flex space-x-1">
                    {socialLinks.map((link, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
                              <Link href={link.href}>
                                  <link.icon className="h-5 w-5" />
                              </Link>
                          </Button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-2">
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-3">
                    {navLinks.map((link) => (
                         <li key={link.href}>
                            <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group">
                                <span>{link.label}</span>
                                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-4 bg-gradient-to-br from-green-500/10 to-transparent p-6 rounded-2xl border border-green-500/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Leaf className="text-primary"/>
                  Join Our Mission
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Stay informed about our latest products and sustainable farming innovations.
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  <Link href="/contact">
                    Contact Our Team
                  </Link>
                </Button>
            </motion.div>
        </div>
      </SpaceWrapper>
      
      <div className="border-t bg-secondary/50 backdrop-blur-sm">
        <SpaceWrapper className="py-6 text-center text-sm text-muted-foreground">
             <p>&copy; {new Date().getFullYear()} CropLife Care Fertilizers. All Rights Reserved.</p>
        </SpaceWrapper>
      </div>
    </motion.footer>
  );
}
