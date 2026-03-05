"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    TicketPercent,
    Users,
    Calendar,
    ShieldCheck,
    XCircle,
    Percent,
    Banknote,
    BookOpen,
    Clock,
    Zap
} from "lucide-react"
import { APIDiscount } from "../../types"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface DiscountDetailsContentProps {
    discount: APIDiscount
}

export function DiscountDetailsContent({ discount }: DiscountDetailsContentProps) {
    const isPercentage = discount.type === "PERCENTAGE"
    const now = new Date()
    const endDate = new Date(discount.endDate)
    const startDate = new Date(discount.startDate)
    const isExpired = endDate < now
    const isNotStarted = startDate > now
    const isActive = discount.isActive && !isExpired && !isNotStarted

    const getStatusIcon = () => {
        if (isExpired) return <XCircle className="size-5 text-red-500" />
        if (isNotStarted) return <Clock className="size-5 text-amber-500" />
        if (!discount.isActive) return <Zap className="size-5 text-slate-400" />
        return <ShieldCheck className="size-5 text-emerald-500" />
    }

    const getStatusLabel = () => {
        if (isExpired) return "منتهي الصلاحية"
        if (isNotStarted) return "قيد الانتظار (لم يبدأ)"
        if (!discount.isActive) return "معطل يدوياً"
        return "نشط حالياً"
    }

    const usagePercentage = discount.maxStudents ? (discount.usedCount / discount.maxStudents) * 100 : 0

    return (
        <div className="space-y-8" dir="rtl">
            {/* Metadata Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetadataCard
                    icon={isPercentage ? <Percent className="size-5 text-blue-500" /> : <Banknote className="size-5 text-emerald-500" />}
                    label="قيمة الخصم"
                    value={`${discount.value.toLocaleString()} ${isPercentage ? "%" : "ج.م"}`}
                    bgColor={isPercentage ? "bg-blue-50" : "bg-emerald-50"}
                />
                <MetadataCard
                    icon={getStatusIcon()}
                    label="حالة العرض"
                    value={getStatusLabel()}
                    bgColor={isActive ? "bg-emerald-50" : isExpired ? "bg-red-50" : "bg-amber-50"}
                />
                <MetadataCard
                    icon={<Users className="size-5 text-purple-500" />}
                    label="إجمالي الاستخدام"
                    value={`${discount.usedCount} طالب`}
                    bgColor="bg-purple-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Configuration & Identity */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <TicketPercent className="size-5 text-primary" />
                                معلومات الخصم
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{discount.name}</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge variant="outline" className="font-bold border-primary/20 text-primary">
                                            {isPercentage ? "نسبة مئوية" : "مبلغ ثابت"}
                                        </Badge>
                                        <Badge variant="secondary" className="font-bold">
                                            {discount.appliesTo === "ALL" ? "شامل (جميع الكورسات)" : "مخصص (كورسات محددة)"}
                                        </Badge>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <InfoRow
                                        icon={<Zap className="size-4 text-muted-foreground" />}
                                        label="الحالة التشغيلية"
                                        value={discount.isActive ? "مفعل في النظام" : "معطل يدوياً"}
                                        className={discount.isActive ? "text-emerald-600 font-bold" : "text-red-500 font-bold"}
                                    />
                                    <InfoRow
                                        icon={<BookOpen className="size-4 text-muted-foreground" />}
                                        label="نطاق التطبيق"
                                        value={discount.appliesTo === "ALL" ? "جميع الكورسات" : `${discount.courseIds?.length || 0} كورس`}
                                    />
                                    <InfoRow
                                        icon={<Calendar className="size-4 text-muted-foreground" />}
                                        label="تاريخ الإنشاء"
                                        value={new Date(discount.createdAt).toLocaleDateString('ar-EG', { dateStyle: 'long' })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Usage Limits Card */}
                    <Card className="border shadow-sm overflow-hidden bg-linear-to-br from-background to-muted/20">
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Users className="size-5 text-primary" />
                                حدود الاستخدام
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-muted-foreground">عدد الطلاب المستفيدين:</span>
                                    <span className="text-2xl font-black text-primary">{discount.usedCount}</span>
                                </div>

                                {discount.maxStudents ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground font-bold">الحد الأقصى: {discount.maxStudents} طالب</span>
                                            <span className="font-black text-foreground">{Math.round(usagePercentage)}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full transition-all duration-700 shadow-inner",
                                                    usagePercentage > 90 ? "bg-red-500" : usagePercentage > 70 ? "bg-amber-500" : "bg-primary"
                                                )}
                                                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                                        <p className="text-sm font-bold text-primary">استخدام غير محدود</p>
                                        <p className="text-[10px] text-muted-foreground mt-1">لا يوجد حد أقصى لعدد الطلاب الذين يمكنهم استخدام هذا الخصم</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Validity & Dates */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Validity Period Card */}
                    <Card className="border shadow-sm">
                        <CardHeader className="bg-muted/30 border-b">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Calendar className="size-5 text-primary" />
                                فترة الصلاحية والتواريخ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm text-muted-foreground font-bold">تاريخ البدء الفعلي</span>
                                        <div className="flex items-center gap-3 p-3 rounded-xl border bg-slate-50">
                                            <span className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-emerald-600">
                                                <Calendar className="size-5" />
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-black text-foreground">{startDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold">
                                                    <Clock className="size-3" />
                                                    {startDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm text-muted-foreground font-bold">تاريخ انتهاء الصلاحية</span>
                                        <div className={cn(
                                            "flex items-center gap-3 p-3 rounded-xl border shadow-sm",
                                            isExpired ? "bg-red-50 border-red-200" : "bg-white"
                                        )}>
                                            <span className={cn(
                                                "p-2 rounded-lg bg-white border shadow-sm",
                                                isExpired ? "text-red-600 border-red-200" : "text-blue-600 border-slate-200"
                                            )}>
                                                <Calendar className="size-5" />
                                            </span>
                                            <div className="flex flex-col">
                                                <span className={cn(
                                                    "text-lg font-black",
                                                    isExpired ? "text-red-700" : "text-foreground"
                                                )}>{endDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold">
                                                    <Clock className="size-3" />
                                                    {endDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center text-center space-y-4 p-8 rounded-2xl bg-muted/20 border-2 border-dashed border-muted">
                                    <div className={cn(
                                        "size-20 rounded-full flex items-center justify-center shadow-lg",
                                        isActive ? "bg-emerald-500 scale-110 ring-4 ring-emerald-500/20" : isExpired ? "bg-red-500" : "bg-amber-500"
                                    )}>
                                        {isActive ? <ShieldCheck className="size-10 text-white" /> : isExpired ? <XCircle className="size-10 text-white" /> : <Clock className="size-10 text-white" />}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-foreground">{getStatusLabel()}</h4>
                                        <p className="text-sm text-muted-foreground font-medium mt-1">
                                            {isActive ? "الخصم متاح حالياً للطلاب في التطبيق" : isExpired ? "هذا العرض انتهى ولا يمكن استخدامه" : "سيبدأ تفعيل العرض في التاريخ المحدد"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Applied Courses Card (Conditional) */}
                    {discount.appliesTo === "COURSE" && (
                        <Card className="border shadow-sm">
                            <CardHeader className="bg-muted/30 border-b">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <BookOpen className="size-5 text-primary" />
                                    الكورسات المشمولة بالخصم
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(discount.courseIds || []).length > 0 ? (
                                        discount.courseIds.map((courseId) => (
                                            <div key={courseId} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors shadow-sm">
                                                <div className="size-8 rounded bg-primary/10 flex items-center justify-center">
                                                    <BookOpen className="size-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-bold text-foreground">معرف الكورس: {courseId}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full p-6 text-center text-muted-foreground bg-muted/30 rounded-xl border-2 border-dashed">
                                            لم يتم ربط أي كورسات محددة بعد.
                                        </div>
                                    )}
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-4 font-medium italic">
                                    * تذكير: يتم تصفية الكورسات المتاحة في تطبيق الطالب بناءً على هذه القائمة فقط.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

function MetadataCard({ icon, label, value, bgColor }: { icon: React.ReactNode, label: string, value: string, bgColor: string }) {
    return (
        <div className={cn("p-6 rounded-xl border flex items-center gap-4 bg-card shadow-sm hover:shadow-md transition-shadow")}>
            <div className={cn("p-3 rounded-xl", bgColor)}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground font-bold">{label}</p>
                <p className="text-lg font-black text-foreground">{value}</p>
            </div>
        </div>
    )
}

function InfoRow({ icon, label, value, className }: { icon?: React.ReactNode, label: string, value: React.ReactNode, className?: string }) {
    return (
        <div className="flex items-center justify-between py-1.5 border-b border-muted last:border-0">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm text-muted-foreground font-medium">{label}:</span>
            </div>
            <span className={cn("text-sm font-bold", className)}>
                {value}
            </span>
        </div>
    )
}
