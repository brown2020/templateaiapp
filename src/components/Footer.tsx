"use client";

import { appConfig, footerMenuItems } from "@/appConfig";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  const menuItems = footerMenuItems.filter((item) => {
    if (item.show === "everyone") return true;
    if (item.show === "guest_only") return !user;
    if (item.show === "user_only") return user;
    if (item.show === "admin_only") return false;
    return false;
  });

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ];

  const productLinks = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press Kit", href: "/press" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest updates, features, and
              news.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[240px] dark:bg-slate-900 dark:border-slate-700 dark:text-gray-100"
              />
              <Button>Subscribe</Button>
            </div>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="dark:border-slate-800" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>
              © {currentYear} {appConfig.title}. All rights reserved.
            </span>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">•</span>
              <Link
                href="https://github.com/yourusername/yourrepo"
                className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                Proudly Open Source
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4 sm:mt-0">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
