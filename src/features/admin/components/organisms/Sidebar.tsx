"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    FileText,
    HelpCircle,
    Users,
    BookOpen,
    CreditCard,
    Settings,
    Plus,
    GraduationCap,
    X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
    {
        title: "الرئيسية",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "الامتحانات",
        href: "/exams",
        icon: FileText,
    },
    {
        title: "الكويزات",
        href: "/quizzes",
        icon: HelpCircle,
    },
    {
        title: "الطلاب",
        href: "/students",
        icon: Users,
    },
    {
        title: "الكورسات",
        href: "/courses",
        icon: BookOpen,
    },
    {
        title: "الاشتراكات",
        href: "/subscriptions",
        icon: CreditCard,
    },
    {
        title: "الإعدادات",
        href: "/settings",
        icon: Settings,
    },
]

export function Sidebar({ className, onClose }: { className?: string; onClose?: () => void }) {
    const pathname = usePathname()

    return (
        <div className={cn("flex flex-col h-full bg-sidebar border-l border-sidebar-border w-64 py-6 relative", className)}>
            {/* Close button for mobile */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-2 md:hidden"
                onClick={onClose}
            >
                <X className="size-5" />
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-2 px-6 mb-10">
                <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                    <GraduationCap className="size-5" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-l from-primary to-purple-400 bg-clip-text text-transparent">
                    منصتي<span className="text-foreground">.برو</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-1 px-3">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                        >
                            <Icon className={cn("size-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            {/* New Student Widget */}
            <div className="px-3 mt-auto">
                <div className="bg-sidebar-accent/50 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-3">
                        <div className="size-10 bg-card rounded-full flex items-center justify-center shadow-sm">
                            <Plus className="size-5 text-secondary" />
                        </div>
                    </div>
                    <h3 className="font-bold text-foreground mb-1">طالب جديد</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                        إضافة طالب جديد إلى المنصة بسرعة
                    </p>
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/20">
                        إضافة الآن
                    </Button>
                </div>
            </div>
        </div>
    )
}
