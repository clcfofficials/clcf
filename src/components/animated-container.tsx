
"use client";

import React from "react";
import { motion } from "framer-motion";

type ViewAnimationProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
