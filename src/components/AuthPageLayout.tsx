"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { GalleryVerticalEnd } from "lucide-react"
import { appConfig } from "@/appConfig"

interface AuthPageLayoutProps {
  title: string
  altLinkText: string
  altLinkHref: string
  children: React.ReactNode
}

export function AuthPageLayout({ title, altLinkText, altLinkHref, children }: AuthPageLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex justify-center mb-6 lg:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {appConfig.title}
          </Link>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
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
      </div>
      <div className="relative hidden lg:block bg-muted">
        <Image
          src="/assets/auth-bg.jpg"
          // src="/assets/auth-bg2.avif"
          alt="Auth background"
          objectFit="fill"
          fill
          className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  )
}
