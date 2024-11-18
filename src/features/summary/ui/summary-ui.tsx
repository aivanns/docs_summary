"use client";

import { cn } from "@/shared/utils/lib/cn";

export const Summary = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      Summary Component
    </div>
  );
};