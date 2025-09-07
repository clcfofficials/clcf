
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
  Globe
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Grid Pattern Component
function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<'svg'> & { 
  width: number; 
  height: number; 
  x: string; 
  y: string; 
  squares?: number[][] 
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

// Feature Card Component
type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
  feature: FeatureType;
};

function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const [pattern, setPattern] = useState<number[][] | undefined>(undefined);

  useEffect(() => {
    setPattern(genRandomPattern());
  }, []);

  return (
    <motion.div 
      className={cn('relative overflow-hidden p-6 group cursor-pointer h-full', className)} 
      {...props}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="from-green-500/10 to-green-600/5 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100 group-hover:opacity-150 transition-opacity duration-300">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={pattern}
            className="fill-green-500/10 stroke-green-500/30 absolute inset-0 h-full w-full mix-blend-overlay group-hover:fill-green-500/20 group-hover:stroke-green-500/40 transition-all duration-300"
          />
        </div>
      </div>
      
      <motion.div
        className="relative z-10"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="text-green-600 dark:text-green-400 size-8 mb-4 bg-green-100 dark:bg-green-900/30 p-2 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <feature.icon className="w-full h-full" strokeWidth={1.5} aria-hidden />
        </motion.div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
          {feature.title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
          {feature.description}
        </p>
        
        <motion.div
          className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span className="flex items-center gap-1">
            Learn more <ArrowRight className="w-3 h-3" />
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Animated Container Component
type ViewAnimationProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
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

// Floating Elements Component
function FloatingElements() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-500/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-green-400/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-green-500/40"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-6 h-6 rounded-full bg-green-400/30"
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </>
  );
}

// Main Why Choose Us Component
export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const features = [
    {
      title: 'Lightning Fast Performance',
      icon: Zap,
      description: 'Experience blazing-fast speeds with our optimized infrastructure and cutting-edge technology stack.',
    },
    {
      title: 'Enterprise Security',
      icon: Shield,
      description: 'Bank-level security protocols protect your data with end-to-end encryption and advanced threat detection.',
    },
    {
      title: 'Expert Support Team',
      icon: Users,
      description: '24/7 dedicated support from our team of experts who are always ready to help you succeed.',
    },
    {
      title: 'Award-Winning Platform',
      icon: Award,
      description: 'Recognized by industry leaders and trusted by thousands of businesses worldwide.',
    },
    {
      title: 'Proven Track Record',
      icon: TrendingUp,
      description: '99.9% uptime guarantee with a proven track record of reliability and performance.',
    },
    {
      title: 'Global Reach',
      icon: Globe,
      description: 'Serve customers worldwide with our global infrastructure and multi-region deployment.',
    },
  ];

  const stats = [
    { value: '10M+', label: 'Active Users', icon: Users },
    { value: '99.9%', label: 'Uptime', icon: CheckCircle },
    { value: '150+', label: 'Countries', icon: Globe },
    { value: '24/7', label: 'Support', icon: Clock },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 bg-background overflow-hidden"
    >
      <FloatingElements />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-green-100/30 dark:from-green-950/20 dark:via-transparent dark:to-green-900/10"
        style={{ y: y1 }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <AnimatedContainer className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
            Why Choose Us
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
            Built for Excellence
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of businesses trust us to power their growth. 
            From cutting-edge technology to world-class support, we deliver excellence at every step.
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-green-200/50 dark:border-green-800/30 bg-card/50 backdrop-blur-sm hover:border-green-300 dark:hover:border-green-700 transition-all duration-300">
                  <FeatureCard feature={feature} className="border-0 bg-transparent p-0" />
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.5}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.7}>
          <motion.div
            className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-xl mb-8 text-green-100">
                Join thousands of satisfied customers and experience the difference today.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedContainer>
      </div>
    </section>
  );
}

    
