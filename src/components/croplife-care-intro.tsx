
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Leaf, Sprout, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import Link from "next/link";

// Background Pattern Component
interface BGPatternProps extends React.ComponentProps<'div'> {
  variant?: 'dots' | 'grid' | 'diagonal-stripes';
  mask?: 'fade-edges' | 'fade-center' | 'none';
  size?: number;
  fill?: string;
}

const maskClasses = {
  'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
  'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
  'none': '',
};

function getBgImage(variant: string, fill: string, size: number) {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    default:
      return undefined;
  }
}

const BGPattern = ({
  variant = 'grid',
  mask = 'none',
  size = 24,
  fill = 'hsl(var(--border))',
  className,
  style,
  ...props
}: BGPatternProps) => {
  const bgSize = `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  return (
    <div
      className={cn('absolute inset-0 z-[-10] size-full', maskClasses[mask], className)}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        ...style,
      }}
      {...props}
    />
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 6 }: { children: React.ReactNode; delay?: number; duration?: number }) => {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < value) {
            return Math.min(prev + Math.ceil(value / 50), value);
          }
          clearInterval(timer);
          return value;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Main Component
const CropLifeCareIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Background Pattern */}
      <BGPattern 
        variant="dots" 
        mask="fade-edges" 
        fill="hsl(var(--muted-foreground) / 0.1)"
        size={32}
      />

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-background to-emerald-50/30 dark:from-teal-950/20 dark:via-background dark:to-emerald-950/10" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={8}>
          <div className="absolute top-20 left-10 w-16 h-16 bg-teal-500/10 rounded-full blur-xl" />
        </FloatingElement>
        <FloatingElement delay={2} duration={10}>
          <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />
        </FloatingElement>
        <FloatingElement delay={4} duration={7}>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-teal-600/10 rounded-full blur-xl" />
        </FloatingElement>
      </div>

      {/* Mouse Follow Effect */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-radial from-teal-500/5 to-transparent rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div 
          style={{ y, opacity }}
          className="max-w-6xl mx-auto"
        >
          <SectionHeader
            icon={Sprout}
            badgeLabel="Sustainable Agriculture Solutions"
            title="Welcome to CropLife Care Fertilizers"
            description="At CropLife Care Fertilizers (CLCF), we are dedicated to empowering farmers with high-quality, innovative, and sustainable fertilization solutions. Our mission is to enhance crop yield and quality, ensuring food security for generations to come."
          />
          
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { icon: Leaf, value: 95, suffix: "%", label: "Crop Yield Improvement" },
              { icon: TreePine, value: 50000, suffix: "+", label: "Farmers Served" },
              { icon: Sprout, value: 25, suffix: " Years", label: "Industry Experience" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300 group"
              >
                <FloatingElement delay={index * 0.5}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </FloatingElement>
                <div className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center"
          >
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Learn More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </motion.button>
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              Discover how we're revolutionizing sustainable agriculture
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default CropLifeCareIntro;

    