"use client"

import * as React from "react"
import { Bell, Search, ChevronDown, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ModeToggle } from "@/components/molecules/mode-toggle"

export function Navbar({ className, onMenuClick }: { className?: string; onMenuClick?: () => void }) {
    return (
        <header className={cn("h-16 flex items-center justify-between px-4 md:px-6 bg-card border-b", className)}>
            {/* Right: Menu Toggle (Mobile only) */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onMenuClick}
            >
                <Menu className="size-6" />
            </Button>

            {/* Center: Search */}
            <div className="flex-1 px-4 md:px-12">
                <div className="relative max-w-md mx-auto md:mx-0">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="ابحث عن طالب، كورس..."
                        className="w-full bg-muted/30 border-none shadow-none focus-visible:ring-1 focus-visible:bg-background rounded-full pl-4 pr-10 text-right h-10 transition-all font-medium text-sm md:text-base"
                    />
                </div>
            </div>

            {/* Left Side: Profile & Notifications */}
            <div className="flex items-center justify-end gap-2 md:gap-4">
                <div className="hidden sm:block">
                    <ModeToggle />
                </div>

                {/* Profile */}
                <div className="flex items-center gap-2 md:gap-3">
                    <Button variant="ghost" size="icon" className="rounded-full overflow-hidden size-8 md:size-10 bg-muted">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed&backgroundColor=c0aede"
                            alt="User"
                            className="size-full object-cover"
                        />
                    </Button>
                    <div className="hidden lg:flex flex-col items-start gap-0.5">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-bold">محمد أحمد</p>
                            <ChevronDown className="size-3 text-muted-foreground" />
                        </div>
                        <p className="text-xs font-semibold font-amin text-foreground">المستر</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
