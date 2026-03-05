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
    GraduationCap,
    X,
    Ticket,
    TicketPercent
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/molecules/mode-toggle"

const navItems = [
    {
        title: "الرئيسية",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "الامتحانات",
        href: "/exams",
        icon: FileText,
    },
    {
        title: "الواجبات",
        href: "/homeworks",
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
        title: "الكوبونات",
        href: "/coupons",
        icon: Ticket,
    },
    {
        title: "الخصومات",
        href: "/discounts",
        icon: TicketPercent,
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
                <span className="text-xl font-bold bg-linear-to-l from-primary to-purple-400 bg-clip-text text-transparent">
                    منصتي<span className="text-foreground">.برو</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-1 px-3">
                {navItems.map((item) => {
                    const isActive = item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
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

            {/* Teacher Profile Card */}
            <div className="px-3 mt-auto space-y-3">
                <div className="bg-sidebar-accent/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="size-10 rounded-full overflow-hidden ring-2 ring-primary/20 bg-muted shrink-0">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed&backgroundColor=c0aede"
                                alt="أحمد رجب"
                                className="size-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-sm text-foreground truncate">أحمد رجب</h3>
                            <p className="text-[10px] text-muted-foreground font-medium">المُدرّس • الرياضيات</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs font-bold rounded-lg" asChild>
                            <Link href="/settings">
                                <Settings className="ml-1.5 size-3.5" />
                                الإعدادات
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Mobile Dark Mode Toggle */}
                <div className="md:hidden flex items-center justify-between px-4 py-2 bg-sidebar-accent/30 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">الوضع الليلي</span>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}
