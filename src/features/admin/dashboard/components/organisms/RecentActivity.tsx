import React from 'react'
import { CreditCard, FileText, GraduationCap, BookOpen, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const mockActivity = [
    {
        id: "1",
        title: "اشتراك جديد",
        description: "الطالب يوسف محمد اشترك في كورس الجبر المتقدم",
        time: "منذ 5 دقائق",
        icon: CreditCard,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        id: "2",
        title: "امتحان مكتمل",
        description: "أكمل 15 طالب امتحان نهاية الفصل الأول",
        time: "منذ 30 دقيقة",
        icon: FileText,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        id: "3",
        title: "طالب جديد",
        description: "تم تسجيل الطالبة مريم أحمد في المنصة",
        time: "منذ ساعة",
        icon: GraduationCap,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        id: "4",
        title: "واجب مسلّم",
        description: "قام 8 طلاب بتسليم واجب المعادلات التفاضلية",
        time: "منذ ساعتين",
        icon: BookOpen,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        id: "5",
        title: "اشتراكات متعددة",
        description: "تم تفعيل 5 اشتراكات جديدة في كورسات مختلفة",
        time: "منذ 3 ساعات",
        icon: Users,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
    },
]

export const RecentActivity = () => {
    return (
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden h-full" dir="rtl">
            <div className="p-5 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-foreground">آخر النشاطات</h3>
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">اليوم</span>
                </div>
            </div>
            <div className="divide-y">
                {mockActivity.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div key={item.id} className="flex items-start gap-3 p-4 hover:bg-muted/20 transition-colors">
                            <div className="flex flex-col items-center gap-1 pt-0.5">
                                <div className={cn("size-8 rounded-lg flex items-center justify-center shrink-0", item.bg)}>
                                    <Icon className={cn("size-4", item.color)} />
                                </div>
                                {index < mockActivity.length - 1 && (
                                    <div className="w-px h-6 bg-border" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-bold text-foreground">{item.title}</p>
                                    <p className="text-[10px] text-muted-foreground/60 font-medium whitespace-nowrap shrink-0">{item.time}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
