"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    CreditCard,
    User,
    BookOpen,
    Calendar,
    ShieldCheck,
    XCircle,
    Phone,
    Mail,
    Banknote
} from "lucide-react"
import { APISubscription } from "../../types"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface SubscriptionDetailsContentProps {
    subscription: APISubscription
}

export function SubscriptionDetailsContent({ subscription }: SubscriptionDetailsContentProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return <ShieldCheck className="size-5 text-emerald-500" />
            case "CANCELED":
                return <XCircle className="size-5 text-red-500" />
            default:
                return <Calendar className="size-5 text-amber-500" />
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "نشط"
            case "CANCELED":
                return "ملغي"
            case "PENDING":
                return "قيد التنفيذ"
            default:
                return status
        }
    }

    return (
        <div className="space-y-8" dir="rtl">
            {/* Metadata Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetadataCard
                    icon={<Banknote className="size-5 text-blue-500" />}
                    label="المبلغ المدفوع"
                    value={`${subscription.finalPrice.toLocaleString()} ج.م`}
                    bgColor="bg-blue-50"
                />
                <MetadataCard
                    icon={getStatusIcon(subscription.status)}
                    label="حالة الاشتراك"
                    value={getStatusLabel(subscription.status)}
                    bgColor={subscription.status === "ACTIVE" ? "bg-emerald-50" : "bg-amber-50"}
                />
                <MetadataCard
                    icon={<Calendar className="size-5 text-purple-500" />}
                    label="تاريخ البدء"
                    value={new Date(subscription.startedAt).toLocaleDateString('ar-EG')}
                    bgColor="bg-purple-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Student Profile */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <User className="size-5 text-primary" />
                                ملف الطالب
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center space-y-4 mb-6">
                                <Avatar className="size-24 border-4 border-background shadow-sm">
                                    <AvatarImage src={subscription.student.image} alt={subscription.student.name} />
                                    <AvatarFallback className="text-xl bg-primary/10 text-primary uppercase">
                                        {subscription.student.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold">{subscription.student.name}</h3>
                                    <Badge variant="outline" className="mt-1">
                                        {subscription.student.grade} ثانوية عامة
                                    </Badge>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                                <InfoRow
                                    icon={<Phone className="size-4 text-muted-foreground" />}
                                    label="رقم الهاتف"
                                    value={subscription.student.phone}
                                    dir="ltr"
                                />
                                <InfoRow
                                    icon={<Mail className="size-4 text-muted-foreground" />}
                                    label="البريد الإلكتروني"
                                    value={subscription.student.email}
                                />
                                <InfoRow
                                    icon={<User className="size-4 text-muted-foreground" />}
                                    label="هاتف ولي الأمر"
                                    value={subscription.student.parentPhone}
                                    dir="ltr"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Course & Payment Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Course Card */}
                    <Card className="border shadow-sm">
                        <CardHeader className="bg-muted/30 border-b">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <BookOpen className="size-5 text-primary" />
                                تفاصيل الكورس
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <div className="size-20 rounded-xl overflow-hidden border relative">
                                    <Image
                                        src={subscription.course.banner}
                                        alt={subscription.course.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <h4 className="text-lg font-bold">{subscription.course.title}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {subscription.course.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge variant="secondary" className="text-[10px]">{subscription.course.subject}</Badge>
                                        <Badge variant="secondary" className="text-[10px]">{subscription.course.grade}</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Details */}
                    <Card className="border shadow-sm">
                        <CardHeader className="bg-muted/30 border-b">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <CreditCard className="size-5 text-primary" />
                                تفاصيل الدفع والفوترة
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h5 className="font-bold text-sm text-muted-foreground border-r-2 border-primary pr-2 mb-4">بيانات السعر</h5>
                                    <InfoRow label="السعر الأصلي" value={`${subscription.priceBeforeDiscount.toLocaleString()} ج.م`} />
                                    <InfoRow label="قيمة الخصم" value={`${subscription.discountAmount.toLocaleString()} ج.م`} className="text-red-500" />
                                    <InfoRow label="الإجمالي المدفوع" value={`${subscription.finalPrice.toLocaleString()} ج.م`} className="text-lg font-bold text-primary" />
                                </div>
                                <div className="space-y-4">
                                    <h5 className="font-bold text-sm text-muted-foreground border-r-2 border-primary pr-2 mb-4">بيانات العملية</h5>
                                    <InfoRow label="طريقة الدفع" value={subscription.paymentMethod} />
                                    <InfoRow label="تاريخ الانتهاء" value={subscription.endsAt ? new Date(subscription.endsAt).toLocaleDateString('ar-EG') : "غير محدد"} />
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
                <p className="text-sm text-muted-foreground font-amin!">{label}</p>
                <p className="text-lg font-bold">{value}</p>
            </div>
        </div>
    )
}

function InfoRow({ icon, label, value, className, dir }: { icon?: React.ReactNode, label: string, value: React.ReactNode, className?: string, dir?: "ltr" | "rtl" }) {
    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm text-muted-foreground">{label}:</span>
            </div>
            <span className={cn("font-medium", className)} dir={dir}>
                {value}
            </span>
        </div>
    )
}
