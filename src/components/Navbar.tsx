"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, User, Sparkles, LayoutDashboard, Shield } from "lucide-react";
import { appConfig } from "@/appConfig";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ROUTES } from "@/utils/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, metadata, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className="flex items-center gap-2 p-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
      onClick={() => setIsSheetOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <>
      {/* Spacer div to prevent content overlap */}
      {/* <div className={`${isScrolled ? "h-0" : "h-16"} w-full`}></div> */}
      <div className={`h-16 w-full`}></div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "top-4 left-4 right-4 mx-auto max-w-8xl rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-gray-900"
          }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-8xl">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
              >
                {appConfig.title}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-1">
              {user ? (
                <>
                  <NavLink href="/feature">
                    <Sparkles className="h-4 w-4" />
                    Feature
                  </NavLink>
                  <NavLink href={ROUTES.DASHBOARD}>
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </NavLink>
                  {isAdmin && (
                    <NavLink href={ROUTES.ADMIN_DASHBOARD}>
                      <Shield className="h-4 w-4" />
                      Admin
                    </NavLink>
                  )}
                  <NavLink href="/profile">
                    {metadata?.photoURL ? (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={metadata.photoURL} alt="Profile" />
                        <AvatarFallback>
                          {metadata.displayName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    Profile
                  </NavLink>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="ghost">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="default">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
              <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex items-center gap-2">
              <ThemeToggle />
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-background">
                  <SheetTitle>
                    {appConfig.title}
                  </SheetTitle>
                  <div className="flex flex-col space-y-2 mt-8 bg-background">
                    {user ? (
                      <>
                        <MobileNavLink href="/feature">
                          <Sparkles className="h-4 w-4" />
                          Feature
                        </MobileNavLink>
                        <MobileNavLink href={ROUTES.DASHBOARD}>
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </MobileNavLink>
                        {isAdmin && (
                          <MobileNavLink href={ROUTES.ADMIN_DASHBOARD}>
                            <Shield className="h-4 w-4" />
                            Admin
                          </MobileNavLink>
                        )}
                        <MobileNavLink href="/profile">
                          <User className="h-4 w-4" />
                          Profile
                        </MobileNavLink>
                      </>
                    ) : (
                      <>
                        <Button className="mt-2" variant="outline">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button className="mt-2" variant="default">
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
