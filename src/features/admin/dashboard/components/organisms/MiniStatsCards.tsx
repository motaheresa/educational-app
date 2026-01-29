import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, UserPlus, Tag, BookOpen, GraduationCap } from "lucide-react"
import { DashboardStats } from "../../types"

interface MiniStatsCardsProps {
    stats: DashboardStats
}

export const MiniStatsCards = ({ stats }: MiniStatsCardsProps) => {
    const cardData = [
        {
            title: "المشتركين الجدد",
            value: stats.newSubscriptions,
            icon: Users,
            color: "text-pink-500",
            bg: "bg-pink-500/10"
        },
        {
            title: "إجمالي الإيرادات",
            value: stats.totalRevenue,
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "طلاب هذا الشهر",
            value: stats.studentsThisMonth,
            icon: UserPlus,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10"
        },
        {
            title: "الاشتراكات النشطة",
            value: stats.activeSubscriptions,
            icon: Tag,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "الكورسات النشطة",
            value: stats.activeCourses,
            icon: BookOpen,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
        {
            title: "إجمالي الطلاب",
            value: stats.totalStudents,
            icon: GraduationCap,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cardData.map((card, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className={`p-3 rounded-xl ${card.bg} ${card.color} mb-3`}>
                            <card.icon className="size-6" />
                        </div>
                        <div className="text-3xl font-bold mb-1">{card.value.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">{card.title}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
