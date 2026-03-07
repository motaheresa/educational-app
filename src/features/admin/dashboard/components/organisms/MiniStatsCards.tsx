"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, UserPlus, CreditCard, BookOpen, GraduationCap, TrendingUp, TrendingDown } from "lucide-react"
import { DashboardStats } from "../../types"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MiniStatsCardsProps {
    stats: DashboardStats
}

export const MiniStatsCards = ({ stats }: MiniStatsCardsProps) => {
    const cardData = [
        {
            title: "إجمالي الطلاب",
            value: stats.totalStudents,
            icon: GraduationCap,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            borderColor: "border-r-purple-500",
            trend: { value: 12, isUp: true },
            href: "/students",
        },
        {
            title: "إجمالي الإيرادات",
            value: stats.totalRevenue,
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            borderColor: "border-r-emerald-500",
            trend: { value: 8, isUp: true },
            href: "/subscriptions",
            suffix: " ج.م"
        },
        {
            title: "الاشتراكات النشطة",
            value: stats.activeSubscriptions,
            icon: CreditCard,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            borderColor: "border-r-blue-500",
            trend: { value: 5, isUp: true },
            href: "/subscriptions",
        },
        {
            title: "طلاب هذا الشهر",
            value: stats.studentsThisMonth,
            icon: UserPlus,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            borderColor: "border-r-cyan-500",
            trend: { value: 3, isUp: false },
            href: "/students",
        },
        {
            title: "المشتركين الجدد",
            value: stats.newSubscriptions,
            icon: Users,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            borderColor: "border-r-pink-500",
            trend: { value: 15, isUp: true },
            href: "/subscriptions",
        },
        {
            title: "الكورسات النشطة",
            value: stats.activeCourses,
            icon: BookOpen,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            borderColor: "border-r-orange-500",
            trend: { value: 0, isUp: true },
            href: "/courses",
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4" dir="rtl">
            {cardData.map((card, index) => (
                <Link key={index} href={card.href}>
                    <Card className={cn(
                        "border-none shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border-r-[3px]",
                        card.borderColor
                    )}>
                        <CardContent className="p-4 md:p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className={cn("p-2 rounded-lg", card.bg, card.color)}>
                                    <card.icon className="size-4" />
                                </div>
                                {card.trend.value > 0 && (
                                    <div className={cn(
                                        "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                                        card.trend.isUp
                                            ? "text-emerald-600 bg-emerald-500/10"
                                            : "text-red-500 bg-red-500/10"
                                    )}>
                                        {card.trend.isUp
                                            ? <TrendingUp className="size-3" />
                                            : <TrendingDown className="size-3" />
                                        }
                                        {card.trend.value}%
                                    </div>
                                )}
                            </div>
                            <div className="text-xl md:text-2xl font-black mb-0.5 group-hover:text-primary transition-colors">
                                {card.value.toLocaleString()}{card.suffix || ""}
                            </div>
                            <p className="text-[10px] md:text-xs text-muted-foreground font-medium">{card.title}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
