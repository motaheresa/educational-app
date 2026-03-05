"use client"

import * as React from "react"
import { Bell, Menu, LogOut, Settings, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/molecules/mode-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Mock teacher data
const teacherInfo = {
    name: "أحمد رجب",
    role: "المُدرّس",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed&backgroundColor=c0aede",
    subject: "الرياضيات",
}

// Mock notifications
const mockNotifications = [
    {
        id: "1",
        title: "اشتراك جديد",
        message: "قام الطالب يوسف محمد بالاشتراك في كورس الجبر",
        time: "منذ 5 دقائق",
        isRead: false,
        type: "subscription" as const,
    },
    {
        id: "2",
        title: "امتحان مكتمل",
        message: "أكمل 15 طالب امتحان الفصل الأول",
        time: "منذ 30 دقيقة",
        isRead: false,
        type: "exam" as const,
    },
    {
        id: "3",
        title: "كوبون مستخدم",
        message: "تم استخدام كوبون WINTER2026 بواسطة 3 طلاب",
        time: "منذ ساعة",
        isRead: true,
        type: "coupon" as const,
    },
    {
        id: "4",
        title: "طالب جديد",
        message: "تم تسجيل الطالبة مريم أحمد في المنصة",
        time: "منذ ساعتين",
        isRead: true,
        type: "student" as const,
    },
    {
        id: "5",
        title: "واجب مسلّم",
        message: "قام 8 طلاب بتسليم واجب المعادلات التفاضلية",
        time: "منذ 3 ساعات",
        isRead: true,
        type: "homework" as const,
    },
]

// Page title mapping
const pageTitles: Record<string, { title: string; subtitle: string }> = {
    "/": { title: "لوحة التحكم", subtitle: "نظرة عامة على المنصة" },
    "/exams": { title: "الامتحانات", subtitle: "إدارة الامتحانات والاختبارات" },
    "/homeworks": { title: "الواجبات", subtitle: "إدارة الواجبات المنزلية" },
    "/students": { title: "الطلاب", subtitle: "إدارة حسابات الطلاب" },
    "/courses": { title: "الكورسات", subtitle: "إدارة المحتوى التعليمي" },
    "/subscriptions": { title: "الاشتراكات", subtitle: "إدارة اشتراكات الطلاب" },
    "/coupons": { title: "الكوبونات", subtitle: "إدارة أكواد الخصم" },
    "/discounts": { title: "الخصومات", subtitle: "إدارة العروض والخصومات" },
    "/settings": { title: "الإعدادات", subtitle: "إعدادات المنصة والحساب" },
}

function getPageInfo(pathname: string) {
    // Exact match first
    if (pageTitles[pathname]) return pageTitles[pathname]
    // Then startsWith for nested routes
    const match = Object.keys(pageTitles).find(key => key !== "/" && pathname.startsWith(key))
    return match ? pageTitles[match] : pageTitles["/"]
}

export function Navbar({ className, onMenuClick }: { className?: string; onMenuClick?: () => void }) {
    const [showNotifications, setShowNotifications] = React.useState(false)
    const [showProfile, setShowProfile] = React.useState(false)
    const notifRef = React.useRef<HTMLDivElement>(null)
    const profileRef = React.useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const pageInfo = getPageInfo(pathname)

    const unreadCount = mockNotifications.filter(n => !n.isRead).length

    // Close dropdowns on outside click
    React.useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setShowNotifications(false)
            }
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setShowProfile(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <header className={cn("h-16 flex items-center justify-between px-4 md:px-6 bg-card border-b", className)} dir="rtl">
            {/* Right (RTL): Menu Toggle (Mobile) + Page Title */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={onMenuClick}
                >
                    <Menu className="size-6" />
                </Button>

                <div className="flex flex-col">
                    <h1 className="text-sm md:text-base font-black text-foreground leading-tight">{pageInfo.title}</h1>
                    <p className="text-[10px] md:text-[11px] text-muted-foreground font-medium">{pageInfo.subtitle}</p>
                </div>
            </div>

            {/* Left Side: Notifications, Dark Mode, Profile */}
            <div className="flex items-center gap-1.5 md:gap-3">
                {/* Dark Mode */}
                <div className="hidden sm:block">
                    <ModeToggle />
                </div>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative rounded-full size-9 md:size-10"
                        onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
                    >
                        <Bell className="size-[18px] md:size-5" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 size-4 md:size-[18px] bg-red-500 text-white rounded-full text-[9px] md:text-[10px] font-black flex items-center justify-center ring-2 ring-card animate-pulse">
                                {unreadCount}
                            </span>
                        )}
                    </Button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute left-0 top-full mt-2 w-80 md:w-96 bg-card border rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden" dir="rtl">
                            <div className="p-4 border-b bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black text-sm">الإشعارات</h3>
                                    {unreadCount > 0 && (
                                        <span className="text-[10px] font-bold bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                                            {unreadCount} جديد
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="max-h-[360px] overflow-y-auto divide-y">
                                {mockNotifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={cn(
                                            "p-3.5 hover:bg-muted/30 transition-colors cursor-pointer",
                                            !notif.isRead && "bg-primary/3"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={cn(
                                                "size-2 rounded-full mt-1.5 shrink-0 transition-all",
                                                !notif.isRead ? "bg-primary" : "bg-transparent"
                                            )} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-foreground">{notif.title}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.message}</p>
                                                <p className="text-[10px] text-muted-foreground/60 mt-1.5 font-medium">{notif.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 border-t bg-muted/20 text-center">
                                <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                                    عرض جميع الإشعارات
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        className="flex items-center gap-2 md:gap-2.5 py-1.5 px-1.5 md:px-3 rounded-xl hover:bg-muted/50 transition-all"
                        onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
                    >
                        <div className="size-8 md:size-9 rounded-full overflow-hidden ring-2 ring-primary/20 bg-muted">
                            <img
                                src={teacherInfo.avatar}
                                alt={teacherInfo.name}
                                className="size-full object-cover"
                            />
                        </div>
                        <div className="hidden lg:flex flex-col items-start" dir="rtl">
                            <p className="text-sm font-bold leading-tight">{teacherInfo.name}</p>
                            <p className="text-[10px] text-muted-foreground font-medium">{teacherInfo.role}</p>
                        </div>
                        <ChevronDown className={cn(
                            "hidden lg:block size-3.5 text-muted-foreground transition-transform",
                            showProfile && "rotate-180"
                        )} />
                    </button>

                    {showProfile && (
                        <div className="absolute left-0 top-full mt-2 w-56 bg-card border rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden" dir="rtl">
                            <div className="p-4 border-b bg-muted/20">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full overflow-hidden ring-2 ring-primary/20">
                                        <img src={teacherInfo.avatar} alt={teacherInfo.name} className="size-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{teacherInfo.name}</p>
                                        <p className="text-[10px] text-muted-foreground">{teacherInfo.subject} • {teacherInfo.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-1.5">
                                <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
                                    <User className="size-4" />
                                    الملف الشخصي
                                </Link>
                                <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
                                    <Settings className="size-4" />
                                    الإعدادات
                                </Link>
                                <div className="h-px bg-border my-1" />
                                <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-red-500">
                                    <LogOut className="size-4" />
                                    تسجيل الخروج
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
