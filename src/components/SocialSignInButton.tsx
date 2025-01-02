// components/SocialSignInButton.tsx
"use client";

import { ButtonHTMLAttributes } from "react";

interface SocialSignInButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  providerName: string;
  providerIcon?: React.ReactNode;
}

export function SocialSignInButton({
  loading,
  providerName,
  providerIcon,
  children,
  ...props
}: SocialSignInButtonProps) {
  return (
    <button
      {...props}
      disabled={loading}
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none"
    >
      {providerIcon && <span className="h-5 w-5 mr-2">{providerIcon}</span>}
      {loading ? `Signing in with ${providerName}...` : children}
    </button>
  );
}
