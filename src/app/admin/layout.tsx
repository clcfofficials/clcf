
"use client";

import { SpaceWrapper } from "@/components/space-wrapper";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-green-50/20 via-background to-emerald-50/10 min-h-[calc(100vh-4rem)] pt-16 dark:from-green-950/20 dark:to-emerald-950/10">
      
      <section className="relative overflow-hidden border-b bg-background/80 backdrop-blur-sm shadow-sm">
         <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={{ opacity: 0.1, scale: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-0 left-0 w-96 h-96 rounded-full bg-green-500 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 0.1, scale: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-500 blur-3xl"
          />
        </div>
        <SpaceWrapper className="py-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-6">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Admin Area
                </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              CLCF Admin Panel
            </h1>
            <p className="text-lg text-muted-foreground mt-3">Manage your products and store settings.</p>
          </motion.div>
        </SpaceWrapper>
      </section>

      <SpaceWrapper className="py-8">
        {children}
      </SpaceWrapper>
    </div>
  );
}
