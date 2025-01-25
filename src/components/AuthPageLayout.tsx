// components/AuthPageLayout.tsx
"use client";

import Link from "next/link";

interface AuthPageLayoutProps {
  title: string;
  altLinkText: string;
  altLinkHref: string;
  children: React.ReactNode;
}

export function AuthPageLayout({
  title,
  altLinkText,
  altLinkHref,
  children,
}: AuthPageLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Title & alternate link */}
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              href={altLinkHref}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {altLinkText}
            </Link>
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
