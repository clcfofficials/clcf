import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SpaceWrapperProps {
  children: ReactNode;
  className?: string;
}

export function SpaceWrapper({ children, className }: SpaceWrapperProps) {
  return (
    <div className={cn("container mx-auto px-4", className)}>
      {children}
    </div>
  );
}
