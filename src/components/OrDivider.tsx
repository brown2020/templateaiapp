// components/OrDivider.tsx
"use client";

export function OrDivider({ text = "Or continue with" }: { text?: string }) {
  return (
    <div className="my-6 relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 select-none">
          {text}
        </span>
      </div>
    </div>
  );
}
