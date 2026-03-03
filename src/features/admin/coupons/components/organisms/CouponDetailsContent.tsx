"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Ticket,
    Percent,
    Calendar,
    ShieldCheck,
    XCircle,
    Users,
    Activity,
    Clock,
    UserCheck,
    Lock
} from "lucide-react"
import { APICoupon } from "../../types"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface CouponDetailsContentProps {
    coupon: APICoupon
}

export function CouponDetailsContent({ coupon }: CouponDetailsContentProps) {
    const isExpired = new Date(coupon.expiresAt) < new Date()

    const getStatusIcon = () => {
        if (!coupon.isActive) return <XCircle className="size-5 text-slate-400" />
        if (isExpired) return <Clock className="size-5 text-red-500" />
        return <ShieldCheck className="size-5 text-emerald-500" />
    }

    const getStatusLabel = () => {
        if (!coupon.isActive) return "معطل"
        if (isExpired) return "منتهي الصلاحية"
        return "نشط"
    }

    return (
        <div className="space-y-8" dir="rtl">
            {/* Metadata Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetadataCard
                    icon={coupon.type === "PERCENTAGE" ? <Percent className="size-5 text-blue-500" /> : <Ticket className="size-5 text-emerald-500" />}
                    label="قيمة الخصم"
                    value={`${coupon.value.toLocaleString()}${coupon.type === "PERCENTAGE" ? "%" : " ج.م"}`}
                    bgColor={coupon.type === "PERCENTAGE" ? "bg-blue-50" : "bg-emerald-50"}
                />
                <MetadataCard
                    icon={getStatusIcon()}
                    label="حالة الكوبون"
                    value={getStatusLabel()}
                    bgColor={!coupon.isActive ? "bg-slate-50" : isExpired ? "bg-red-50" : "bg-emerald-50"}
                />
                <MetadataCard
                    icon={<Users className="size-5 text-purple-500" />}
                    label="إجمالي الاستخدام"
                    value={`${coupon.usedCount} / ${coupon.maxUsage || "∞"}`}
                    bgColor="bg-purple-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Coupon Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Activity className="size-5 text-primary" />
                                معلومات الكوبون
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <div className="flex flex-col items-center text-center space-y-4 mb-6">
                                <div className="p-4 rounded-2xl bg-primary/5 border-2 border-dashed border-primary/20">
                                    <h3 className="text-3xl font-black tracking-widest text-primary uppercase">{coupon.code}</h3>
                                </div>
                                <Badge variant="outline" className="font-bold">
                                    {coupon.type === "PERCENTAGE" ? "نسبة مئوية" : "مبلغ ثابت"}
                                </Badge>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                                <InfoRow
                                    icon={<Calendar className="size-4 text-muted-foreground" />}
                                    label="تاريخ الإنشاء"
                                    value={new Date(coupon.createdAt).toLocaleDateString('ar-EG')}
                                />
                                <InfoRow
                                    icon={<Clock className="size-4 text-muted-foreground" />}
                                    label="تاريخ الانتهاء"
                                    value={new Date(coupon.expiresAt).toLocaleDateString('ar-EG')}
                                    className={isExpired ? "text-red-500 line-through" : ""}
                                />
                                <InfoRow
                                    icon={<UserCheck className="size-4 text-muted-foreground" />}
                                    label="الاستخدام لكل طالب"
                                    value={`${coupon.maxUsagePerStudent} مرات`}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Statistics or Usage */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border shadow-sm">
                        <CardHeader className="bg-muted/30 border-b">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Activity className="size-5 text-primary" />
                                إحصائيات الاستخدام
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h5 className="font-bold text-sm text-muted-foreground border-r-2 border-primary pr-2 mb-4">كفاءة الكوبون</h5>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm font-medium">
                                            <span>نسبة الاستهلاك</span>
                                            <span>{Math.round((coupon.usedCount / (coupon.maxUsage || 1)) * 100)}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min((coupon.usedCount / (coupon.maxUsage || 1)) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                                        <Lock className="size-5 text-blue-500 mt-0.5" />
                                        <p className="text-xs text-blue-700 leading-relaxed font-medium">
                                            تم ضبط هذا الكوبون ليكون متاحاً لعدد <strong>{coupon.maxUsage || "غير محدود"}</strong> من المرات، مع حد أقصى <strong>{coupon.maxUsagePerStudent}</strong> لكل طالب.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="font-bold text-sm text-muted-foreground border-r-2 border-primary pr-2 mb-4">سجل العمليات</h5>
                                    <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-center p-4">
                                        <Users className="size-8 text-muted-foreground/30 mb-2" />
                                        <p className="text-sm text-muted-foreground italic">سيتم عرض قائمة الطلاب الذين استخدموا الكوبون قريباً</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function MetadataCard({ icon, label, value, bgColor }: { icon: React.ReactNode, label: string, value: string, bgColor: string }) {
    return (
        <div className={cn("p-6 rounded-xl border flex items-center gap-4 bg-card shadow-sm")}>
            <div className={cn("p-3 rounded-lg", bgColor)}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground font-medium">{label}</p>
                <p className="text-lg font-bold">{value}</p>
            </div>
        </div>
    )
}

function InfoRow({ icon, label, value, className }: { icon?: React.ReactNode, label: string, value: React.ReactNode, className?: string }) {
    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm text-muted-foreground">{label}:</span>
            </div>
            <span className={cn("font-medium", className)}>
                {value}
            </span>
        </div>
    )
}
