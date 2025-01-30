// components/OrDivider.tsx
"use client";

import { cn } from "@/lib/utils";

export function OrDivider({ text = "Or continue with", className }: { text?: string, className?: string }) {
  return (
    <div className="my-6 relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className={cn("px-2 bg-white dark:bg-background text-gray-500 dark:text-gray-400 select-none", className)}>
          {text}
        </span>
      </div>
    </div>
  );
}
