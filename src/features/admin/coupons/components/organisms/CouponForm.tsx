"use client"

import { Ticket, Percent, Save, X, Loader2, Calendar, Users, Info, Activity } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useCreateCoupon } from "../../hooks/useCreateCoupon"
import { AdminPageHeader } from "@/features/admin/components/organisms/UpperContentPage"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function CouponForm() {
    const {
        formData,
        isSubmitting,
        handleChange,
        handleTypeChange,
        generateCode,
        handleSubmit,
        setFormData
    } = useCreateCoupon()

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8" dir="rtl">
            <AdminPageHeader
                title="إنشاء كوبون جديد"
                subtitle="أدخل تفاصيل الكود والخصم وشروط الاستخدام لنشره للطلاب"
                breadcrumbs={[
                    { label: "الكوبونات", href: "/coupons" },
                    { label: "إضافة كوبون جديد" }
                ]}
                actions={
                    <div className="flex items-center gap-2">
                        <Button variant="outline" type="button" asChild className="h-11 px-6 border-2">
                            <Link href="/coupons">
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
                            حفظ الكوبون
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="border rounded-2xl bg-card shadow-sm overflow-hidden border-primary/10">
                        <div className="p-5 border-b bg-primary/5 flex items-center justify-between">
                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                <Info className="size-5" />
                                الإعدادات الأساسية
                            </h4>
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
                                {/* Type Selection */}
                                <div className="space-y-3">
                                    <Label className="text-base font-bold">نوع الخصم</Label>
                                    <div className="grid grid-cols-2 gap-3 p-1.5 bg-muted rounded-xl border">
                                        <button
                                            type="button"
                                            onClick={() => handleTypeChange("FIXED")}
                                            className={`flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-lg transition-all ${formData.type === "FIXED" ? "bg-background text-primary shadow-sm ring-1 ring-primary/20" : "text-muted-foreground hover:bg-background/50"}`}
                                        >
                                            <Ticket className="size-6" />
                                            <span className="text-xs font-bold">مبلغ ثابت</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleTypeChange("PERCENTAGE")}
                                            className={`flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-lg transition-all ${formData.type === "PERCENTAGE" ? "bg-background text-primary shadow-sm ring-1 ring-primary/20" : "text-muted-foreground hover:bg-background/50"}`}
                                        >
                                            <Percent className="size-6" />
                                            <span className="text-xs font-bold">نسبة مئوية</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Value Field */}
                                <div className="space-y-3">
                                    <Label htmlFor="value" className="text-base font-bold">
                                        قيمة الخصم
                                    </Label>
                                    <div className="relative group">
                                        <Input
                                            id="value"
                                            name="value"
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.value || ""}
                                            onChange={handleChange}
                                            className="h-14 text-2xl font-black text-center rounded-xl bg-muted/30 focus:bg-background transition-all border-2 focus:border-primary pl-16 pr-4"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg text-muted-foreground">
                                            {formData.type === "PERCENTAGE" ? "%" : "ج.م"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </div>

                    <div className="border rounded-2xl bg-card shadow-sm overflow-hidden border-primary/10">
                        <div className="p-5 border-b bg-primary/5">
                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                <Users className="size-5" />
                                حدود الاستخدام
                            </h4>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label htmlFor="maxUsage" className="text-sm font-bold opacity-80">أقصى عدد للاستخدام الكلي</Label>
                                    <Input
                                        id="maxUsage"
                                        name="maxUsage"
                                        type="number"
                                        value={formData.maxUsage || ""}
                                        onChange={handleChange}
                                        className="h-12 rounded-xl"
                                        placeholder="0"
                                    />
                                    <p className="text-[10px] text-muted-foreground">0 تعني استخدام غير محدود</p>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="maxUsagePerStudent" className="text-sm font-bold opacity-80">مرات الاستخدام لكل طالب</Label>
                                    <Input
                                        id="maxUsagePerStudent"
                                        name="maxUsagePerStudent"
                                        type="number"
                                        value={formData.maxUsagePerStudent || ""}
                                        onChange={handleChange}
                                        className="h-12 rounded-xl"
                                        placeholder="1"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="border rounded-2xl bg-card shadow-sm overflow-hidden border-primary/10">
                        <div className="p-5 border-b bg-primary/5">
                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                <Calendar className="size-5" />
                                النشر والصلاحية
                            </h4>
                        </div>
                        <CardContent className="p-6 space-y-8">
                            {/* Expiry Date */}
                            <div className="space-y-3">
                                <Label htmlFor="expiresAt" className="text-base font-bold flex items-center gap-2">
                                    تاريخ انتهاء الصلاحية
                                </Label>
                                <Input
                                    id="expiresAt"
                                    name="expiresAt"
                                    type="date"
                                    value={formData.expiresAt}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl focus:ring-primary text-right"
                                />
                            </div>

                            <Separator />

                            {/* Active Status */}
                            <div className="flex items-center justify-between p-2 rounded-xl bg-muted/30">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-bold flex items-center gap-2">
                                        حالة الكوبون
                                    </Label>
                                    <p className="text-xs text-muted-foreground">تفعيل الكوبون فور إنشائه</p>
                                </div>
                                <Switch
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => setFormData(f => ({ ...f, isActive: checked }))}
                                />
                            </div>
                        </CardContent>
                    </div>

                    {/* Summary Preview */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center space-y-4">
                        <p className="text-sm text-muted-foreground">معاينة الخصم</p>
                        <div className="space-y-1">
                            {formData.code ? (
                                <h3 className="text-2xl font-black tracking-widest text-primary uppercase">{formData.code}</h3>
                            ) : (
                                <h3 className="text-2xl font-black text-muted-foreground italic">كود الخصم</h3>
                            )}
                            <div className="text-xl font-bold">
                                {formData.value || 0} {formData.type === "PERCENTAGE" ? "%" : "ج.م"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
