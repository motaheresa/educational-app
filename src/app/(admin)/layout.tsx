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
        <div className="flex min-h-screen bg-muted/20" >
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Sticky on Right (Desktop) / Fixed Overlay (Mobile) */}
            <aside className={cn(
                "fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-in-out md:sticky md:h-screen md:top-0 md:translate-x-0 w-64",
                sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
            )}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Navbar */}
                <Navbar onMenuClick={() => setSidebarOpen(true)} />

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-8 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
