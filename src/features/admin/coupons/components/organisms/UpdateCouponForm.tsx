"use client"

import { Ticket, Percent, Save, X, Loader2, Calendar, Users, Info, Activity } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { APICoupon } from "../../types"
import { useUpdateCoupon } from "../../hooks/useUpdateCoupon"
import { AdminPageHeader } from "@/features/admin/components/organisms/UpperContentPage"
import { cn } from "@/lib/utils"

interface UpdateCouponFormProps {
    coupon: APICoupon
}

export function UpdateCouponForm({ coupon }: UpdateCouponFormProps) {
    const {
        formData,
        isSubmitting,
        handleChange,
        handleTypeChange,
        handleSwitchChange,
        generateCode,
        handleSubmit
    } = useUpdateCoupon(coupon.id, coupon)

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8" dir="rtl">
            <AdminPageHeader
                title={`تعديل الكوبون: ${coupon.code}`}
                subtitle="تحديث تفاصيل الكود أو الخصم أو حدود الاستخدام"
                breadcrumbs={[
                    { label: "الكوبونات", href: "/coupons" },
                    { label: coupon.code, href: `/coupons/${coupon.id}` },
                    { label: "تعديل" }
                ]}
                actions={
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 px-6 rounded-xl border-2 hover:bg-muted/50 transition-all font-bold"
                            onClick={() => window.history.back()}
                        >
                            <X className="ml-2 size-4" />
                            إلغاء
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all font-bold"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="ml-2 size-4 animate-spin" />
                                    جاري الحفظ...
                                </>
                            ) : (
                                <>
                                    <Save className="ml-2 size-4" />
                                    حفظ التغييرات
                                </>
                            )}
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Settings Card */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card rounded-2xl border-2 shadow-sm overflow-hidden border-primary/5">
                        <div className="bg-muted/30 p-4 border-b border-primary/5 flex items-center gap-2">
                            <Ticket className="size-5 text-primary" />
                            <h3 className="font-bold text-lg">إعدادات الكوبون الأساسية</h3>
                        </div>
                        <CardContent className="p-8 space-y-8">
                            {/* Code Field */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="code" className="text-base font-bold flex items-center gap-2">
                                        كود الخصم (Code)
                                    </Label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={generateCode}
                                        className="text-primary hover:text-primary/80 h-8 gap-1.5 font-bold"
                                    >
                                        <Activity className="size-3.5" />
                                        توليد تلقائي
                                    </Button>
                                </div>
                                <div className="relative group">
                                    <Input
                                        id="code"
                                        name="code"
                                        placeholder="مثال: RAMADAN2024"
                                        value={formData.code}
                                        onChange={handleChange}
                                        className="h-14 text-xl font-black tracking-widest uppercase text-center rounded-xl bg-muted/30 focus:bg-background transition-all border-2 focus:border-primary pr-12"
                                    />
                                    <Ticket className="absolute right-4 top-1/2 -translate-y-1/2 size-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                </div>
                                <p className="text-xs text-muted-foreground mr-1">هذا هو الكود الذي سيدخله الطالب عند الدفع</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Type Selector */}
                                <div className="space-y-4">
                                    <Label className="text-base font-bold">نوع الخصم</Label>
                                    <div className="grid grid-cols-2 gap-3 p-1.5 bg-muted/30 rounded-xl border-2">
                                        <button
                                            type="button"
                                            onClick={() => handleTypeChange("FIXED")}
                                            className={cn(
                                                "flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all",
                                                formData.type === "FIXED"
                                                    ? "bg-background text-primary shadow-sm border"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <Ticket className="size-4" />
                                            مبلغ ثابت
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleTypeChange("PERCENTAGE")}
                                            className={cn(
                                                "flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all",
                                                formData.type === "PERCENTAGE"
                                                    ? "bg-background text-primary shadow-sm border"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <Percent className="size-4" />
                                            نسبة مئوية
                                        </button>
                                    </div>
                                </div>

                                {/* Value Field */}
                                <div className="space-y-4">
                                    <Label htmlFor="value" className="text-base font-bold">قيمة الخصم</Label>
                                    <div className="relative group">
                                        <Input
                                            id="value"
                                            name="value"
                                            type="number"
                                            placeholder="0"
                                            value={formData.value}
                                            onChange={handleChange}
                                            className="h-14 text-xl font-bold pr-12 rounded-xl bg-muted/30 focus:bg-background transition-all border-2 focus:border-primary"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors">
                                            {formData.type === "FIXED" ? "ج.م" : "%"}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mr-1">المبلغ الذي سيتم خصمه من إجمالي العملية</p>
                                </div>
                            </div>
                        </CardContent>
                    </div>

                    <div className="bg-card rounded-2xl border-2 shadow-sm overflow-hidden border-primary/5">
                        <div className="bg-muted/30 p-4 border-b border-primary/5 flex items-center gap-2">
                            <Info className="size-5 text-primary" />
                            <h3 className="font-bold text-lg">شروط الاستخدام والقيود</h3>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label htmlFor="maxUsage" className="text-base font-bold flex items-center gap-2">
                                        إجمالي مرات الاستخدام
                                    </Label>
                                    <div className="relative group">
                                        <Input
                                            id="maxUsage"
                                            name="maxUsage"
                                            type="number"
                                            placeholder="مثال: 50"
                                            value={formData.maxUsage}
                                            onChange={handleChange}
                                            className="h-14 font-bold pr-12 rounded-xl bg-muted/30 border-2"
                                        />
                                        <Users className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">أقصى عدد من الطلاب يمكنهم استخدام هذا الكوبون</p>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="maxUsagePerStudent" className="text-base font-bold flex items-center gap-2">
                                        الاستخدام لكل طالب
                                    </Label>
                                    <div className="relative group">
                                        <Input
                                            id="maxUsagePerStudent"
                                            name="maxUsagePerStudent"
                                            type="number"
                                            placeholder="مثال: 1"
                                            value={formData.maxUsagePerStudent}
                                            onChange={handleChange}
                                            className="h-14 font-bold pr-12 rounded-xl bg-muted/30 border-2"
                                        />
                                        <Users className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">عدد المرات التي يمكن للطالب الواحد فيها استخدام الكود</p>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </div>

                {/* Sidebar Card */}
                <div className="space-y-8">
                    <div className="bg-card rounded-2xl border-2 shadow-sm overflow-hidden border-primary/5">
                        <div className="bg-muted/30 p-4 border-b border-primary/5">
                            <h3 className="font-bold text-lg">الحالة والجوانب الأمنية</h3>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border-2 border-dashed transition-all hover:bg-muted/30 group">
                                <div className="space-y-1">
                                    <Label htmlFor="isActive" className="font-black text-base transition-colors group-hover:text-primary">تفعيل الكوبون</Label>
                                    <p className="text-xs text-muted-foreground">السماح للطلاب باستخدامه الآن</p>
                                </div>
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                                    // className="data-[state=checked]:bg-primary"
                                />
                            </div>

                            <Separator />

                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <Info className="size-4" />
                                    ملاحظات التعديل
                                </div>
                                <ul className="text-[10px] text-muted-foreground space-y-1.5 pr-1">
                                    <li className="flex items-start gap-1.5">• لا يمكن تعديل تاريخ الانتهاء من هنا</li>
                                    <li className="flex items-start gap-1.5">• تغيير كود الخصم سيعطل الكود القديم فوراً</li>
                                    <li className="flex items-start gap-1.5">• تأكد من قيمة الخصم قبل الحفظ</li>
                                </ul>
                            </div>
                        </CardContent>
                    </div>
                </div>
            </div>
        </form>
    )
}

function Separator() {
    return <div className="h-px w-full bg-border" />
}
