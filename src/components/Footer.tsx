"use client";

import { footerMenuItems } from "@/appConfig";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Footer() {
  const { user } = useAuth();

  const menuItems = footerMenuItems.filter((item) => {
    if (item.show === "everyone") return true;
    if (item.show === "guest_only") return !user;
    if (item.show === "user_only") return user;
    if (item.show === "admin_only") return false; // Add admin check if needed
    return false;
  });

  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center items-center space-x-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-600 hover:text-blue-600 text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
