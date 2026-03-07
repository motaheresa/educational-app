"use client"

import * as React from "react"
import { Sidebar } from "@/features/admin/components/organisms/Sidebar";
import { Navbar } from "@/features/admin/components/organisms/Navbar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    return (
        <div className="flex min-h-screen bg-muted/40" dir="rtl">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar — right side in RTL */}
            <aside className={cn(
                "fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-in-out",
                "md:sticky md:h-screen md:top-0 md:translate-x-0",
                "w-72",
                sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
            )}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Sticky Navbar */}
                <div className="sticky top-0 z-30">
                    <Navbar onMenuClick={() => setSidebarOpen(true)} />
                </div>

                {/* Page Content — subtle warm-tinted background */}
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-gradient-to-b from-background to-muted/30">
                    {children}
                </div>
            </main>
        </div>
    );
}
