
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionHeader } from './section-header';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const faqData = [
  {
    question: "What types of fertilizers do you offer?",
    answer: "We offer a comprehensive range of products including fungicides, insecticides, plant growth regulators, and specialized herbicides. Each category is designed to meet specific agricultural needs for various crops and conditions."
  },
  {
    question: "Are your products organic and eco-friendly?",
    answer: "Yes, sustainability is at the core of our mission. Many of our products are 100% organic and all are formulated to be eco-friendly, ensuring they are safe for the soil, environment, and beneficial insects while maximizing crop health."
  },
  {
    question: "How do I choose the right fertilizer for my crops?",
    answer: "Our expert agronomists are here to help. You can contact our support team with details about your crop type, soil condition, and goals. We also provide detailed product descriptions and usage guides to help you make an informed decision."
  },
  {
    question: "Do you provide support for farmers?",
    answer: "Absolutely. We offer 24/7 agronomist support to all our customers. Whether you have questions about application, soil health, or pest control, our team of experts is ready to provide guidance and ensure you get the best results."
  },
  {
    question: "Where can I buy your products?",
    answer: "Our products are available through a global network of authorized distributors. Please visit our 'Contact Us' page to get in touch with our sales team, who can connect you with a distributor in your region."
  }
];

export function FAQSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-green-50/20 dark:to-green-950/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full"></div>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
            <SectionHeader
                icon={HelpCircle}
                badgeLabel="We're Here to Help"
                title="Frequently Asked Questions"
                description="Have questions? We've got answers. Explore our FAQ section to find the information you need about our products and services."
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full"
            >
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqData.map((faq, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <AccordionItem value={`item-${index}`} className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10">
                                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-lg hover:no-underline text-foreground/80 hover:text-primary transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16 text-center"
            >
                <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Our team is ready to provide you with the answers you need. Reach out to us for personalized support.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group">
                    <Link href="/contact">
                        Contact Us
                        <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </motion.div>
        </div>
    </section>
  );
}
