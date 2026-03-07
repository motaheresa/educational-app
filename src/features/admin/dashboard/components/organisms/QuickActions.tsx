import React from 'react'
import Link from "next/link"
import { UserPlus, BookOpen, FileText, Ticket, TicketPercent, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const quickActions = [
    {
        title: "إضافة طالب",
        description: "تسجيل طالب جديد",
        icon: UserPlus,
        href: "/students/create",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "إنشاء كورس",
        description: "كورس تعليمي جديد",
        icon: BookOpen,
        href: "/courses/create",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "إنشاء امتحان",
        description: "إضافة امتحان جديد",
        icon: FileText,
        href: "/exams/create",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "إنشاء كوبون",
        description: "كود خصم جديد",
        icon: Ticket,
        href: "/coupons/create",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        title: "إنشاء خصم",
        description: "عرض خصم جديد",
        icon: TicketPercent,
        href: "/discounts/create",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
    },
]

export const QuickActions = () => {
    return (
        <div className="bg-card rounded-2xl border shadow-sm p-5 h-full" dir="rtl">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-foreground">إجراءات سريعة</h3>
                <Plus className="size-4 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
                {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                        <Link
                            key={index}
                            href={action.href}
                            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-muted/40 hover:shadow-sm"
                        >
                            <div className={cn("size-9 rounded-lg flex items-center justify-center shrink-0", action.bg)}>
                                <Icon className={cn("size-4", action.color)} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{action.title}</p>
                                <p className="text-[10px] text-muted-foreground">{action.description}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
