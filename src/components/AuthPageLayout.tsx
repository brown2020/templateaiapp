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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Title & alternate link */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href={altLinkHref}
              className="font-medium text-blue-600 hover:text-blue-500"
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
