
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, LucideProps } from "lucide-react";
import { AnimatedContainer } from "@/components/animated-container";

interface SectionHeaderProps {
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  badgeLabel: string;
  title: string;
  description: string;
}

export function SectionHeader({ icon: Icon = Sparkles, badgeLabel, title, description }: SectionHeaderProps) {
  return (
    <AnimatedContainer className="text-center mb-16">
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-4 h-4" />
        {badgeLabel}
      </motion.div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
        {title}
      </h2>
      
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    </AnimatedContainer>
  );
}
