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
    TicketPercent,
    LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/molecules/mode-toggle"

const navItems = [
    {
        title: "الرئيسية",
        href: "/",
        icon: LayoutDashboard,
        badge: null,
    },
    {
        title: "الامتحانات",
        href: "/exams",
        icon: FileText,
        badge: 3,
    },
    {
        title: "الواجبات",
        href: "/homeworks",
        icon: HelpCircle,
        badge: null,
    },
    {
        title: "الطلاب",
        href: "/students",
        icon: Users,
        badge: 5,
    },
    {
        title: "الكورسات",
        href: "/courses",
        icon: BookOpen,
        badge: null,
    },
    {
        title: "الاشتراكات",
        href: "/subscriptions",
        icon: CreditCard,
        badge: 2,
    },
    {
        title: "الكوبونات",
        href: "/coupons",
        icon: Ticket,
        badge: null,
    },
    {
        title: "الخصومات",
        href: "/discounts",
        icon: TicketPercent,
        badge: null,
    },
    {
        title: "الإعدادات",
        href: "/settings",
        icon: Settings,
        badge: null,
    },
]

export function Sidebar({ className, onClose }: { className?: string; onClose?: () => void }) {
    const pathname = usePathname()

    return (
        <div className={cn("flex flex-col h-full bg-sidebar border-l border-sidebar-border/50 w-72 relative", className)}>
            {/* Close button for mobile */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-3 md:hidden"
                onClick={onClose}
            >
                <X className="size-5" />
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border/30">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="size-5" />
                </div>
                <span className="text-xl font-black bg-linear-to-l from-primary to-purple-400 bg-clip-text text-transparent">
                    منصتي<span className="text-foreground">.برو</span>
                </span>
            </div>

            {/* Online Status */}
            <div className="px-4 py-3 mx-4 mt-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2.5">
                    <span className="relative flex size-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">12 طالب متصل الآن</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-0.5 px-3 mt-5 overflow-y-auto">
                <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider px-3 mb-2">القائمة الرئيسية</p>
                {navItems.map((item) => {
                    const isActive = item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={cn("size-[18px]", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                                {item.title}
                            </div>
                            {item.badge && !isActive && (
                                <span className="size-5 flex items-center justify-center rounded-md bg-primary/10 text-primary text-[10px] font-black">
                                    {item.badge}
                                </span>
                            )}
                            {item.badge && isActive && (
                                <span className="size-5 flex items-center justify-center rounded-md bg-white/20 text-primary-foreground text-[10px] font-black">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom: Teacher + Logout */}
            <div className="px-4 pb-4 pt-3 space-y-2 border-t border-sidebar-border/30">
                {/* Teacher Profile */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/40">
                    <div className="size-10 rounded-full overflow-hidden ring-2 ring-primary/20 bg-muted shrink-0">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed&backgroundColor=c0aede"
                            alt="أحمد رجب"
                            className="size-full object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-foreground truncate">أحمد رجب</p>
                        <p className="text-[10px] text-muted-foreground font-medium">المُدرّس • الرياضيات</p>
                    </div>
                    <div className="relative flex size-2.5">
                        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                    </div>
                </div>

                {/* Logout */}
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-muted-foreground hover:text-red-500">
                    <LogOut className="size-3.5" />
                    تسجيل الخروج
                </button>

                {/* Mobile Dark Mode Toggle */}
                <div className="md:hidden flex items-center justify-between px-4 py-2.5 bg-sidebar-accent/30 rounded-xl">
                    <span className="text-xs font-medium text-muted-foreground">الوضع الليلي</span>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}
