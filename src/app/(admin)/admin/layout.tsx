"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AdminNavbar } from "@/components/admin";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <ThemeProvider>
            <AuthProvider>
                <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                        <AppSidebar />
                        <SidebarInset>
                            <AdminNavbar />
                            <main className="flex flex-1 flex-col">
                                <div className="flex flex-1 flex-col p-4">
                                    {children}
                                </div>
                            </main>
                        </SidebarInset>
                    </div>
                </SidebarProvider>
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
    );
}
