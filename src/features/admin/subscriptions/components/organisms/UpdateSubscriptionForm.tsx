"use client"

import { CreditCard, Save, X, Loader2, LayoutGrid, Info } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUpdateSubscription } from "../../hooks/useUpdateSubscription"
import { APISubscription } from "../../types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { AdminPageHeader } from "@/features/admin/components/organisms/UpperContentPage"

interface UpdateSubscriptionFormProps {
    id: string
    initialData: APISubscription
}

export function UpdateSubscriptionForm({ id, initialData }: UpdateSubscriptionFormProps) {
    const {
        formData,
        isSubmitting,
        handleSelectChange,
        handleSubmit
    } = useUpdateSubscription(id, initialData)

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8" dir="rtl">
            <AdminPageHeader
                title={`تعديل اشتراك: ${initialData.student.name}`}
                subtitle={`الكورس: ${initialData.course.title}`}
                breadcrumbs={[
                    { label: "الاشتراكات", href: "/subscriptions" },
                    { label: initialData.student.name, href: `/subscriptions/${id}` },
                    { label: "تعديل" }
                ]}
                actions={
                    <div className="flex items-center gap-2">
                        <Button variant="outline" type="button" asChild className="h-11 px-6 border-2">
                            <Link href={`/subscriptions/${id}`}>
                                <X className="ml-2 h-4 w-4" />
                                إلغاء
                            </Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="h-11 px-8 gap-2 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20">
                            {isSubmitting ? (
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="ml-2 h-4 w-4" />
                            )}
                            حفظ التعديلات
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Information Card (Read-only) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="border rounded-2xl bg-card shadow-sm overflow-hidden border-primary/10">
                        <div className="p-5 border-b bg-primary/5 flex items-center justify-between">
                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                <Info className="size-5" />
                                معلومات الاشتراك الحالية
                            </h4>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground">اسم الطالب</span>
                                        <span className="font-bold text-lg">{initialData.student.name}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground">الكورس</span>
                                        <span className="font-bold">{initialData.course.title}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground">المبلغ النهائي</span>
                                        <span className="font-bold text-xl text-primary">{initialData.finalPrice.toLocaleString()} ج.م</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground">تاريخ الاشتراك</span>
                                        <span className="font-medium">{new Date(initialData.startedAt).toLocaleDateString('ar-EG')}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-8 opacity-50" />

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                <Info className="size-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800 leading-relaxed">
                                    يمكنك فقط تعديل <strong>طريقة الدفع</strong> و <strong>حالة الاشتراك</strong>. لتعديل بيانات أخرى مثل المبلغ أو الطالب، يرجى حذف الاشتراك وإنشاء واحد جديد.
                                </p>
                            </div>
                        </CardContent>
                    </div>
                </div>

                {/* Sidebar: Editable Settings */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="border rounded-2xl bg-card shadow-sm overflow-hidden border-primary/10">
                        <div className="p-5 border-b bg-primary/5">
                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                <LayoutGrid className="size-5" />
                                إعدادات الاشتراك
                            </h4>
                        </div>
                        <CardContent className="p-6 space-y-8">
                            {/* Payment Method */}
                            <div className="space-y-3">
                                <Label className="text-base font-bold flex items-center gap-2">
                                    <CreditCard className="size-4 text-muted-foreground" />
                                    طريقة الدفع
                                </Label>
                                <Select
                                    value={formData.paymentMethod}
                                    onValueChange={(val) => handleSelectChange("paymentMethod", val)}
                                >
                                    <SelectTrigger className="h-12 rounded-xl focus:ring-primary">
                                        <SelectValue placeholder="اختر طريقة الدفع" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CASH">كاش (نقداً)</SelectItem>
                                        <SelectItem value="FAWRY">فوري</SelectItem>
                                        <SelectItem value="VODAFONE_CASH">فودافون كاش</SelectItem>
                                        <SelectItem value="BANK_TRANSFER">تحويل بنكي</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />

                            {/* Status */}
                            <div className="space-y-3">
                                <Label className="text-base font-bold">حالة الاشتراك</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val) => handleSelectChange("status", val)}
                                >
                                    <SelectTrigger className="h-12 rounded-xl focus:ring-primary">
                                        <SelectValue placeholder="اختر الحالة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE" className="text-emerald-600 font-bold">نشط</SelectItem>
                                        <SelectItem value="PENDING" className="text-amber-600 font-bold">قيد الانتظار</SelectItem>
                                        <SelectItem value="EXPIRED" className="text-orange-600 font-bold">منتهي</SelectItem>
                                        <SelectItem value="CANCELED" className="text-red-600 font-bold">ملغي</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </div>
                </div>
            </div>
        </form>
    )
}
