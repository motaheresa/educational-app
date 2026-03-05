"use client"

import { TicketPercent, Percent, Save, X, Loader2, Calendar, Users, Info, Banknote, BookOpen, Check } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useCreateDiscount } from "../../hooks/useCreateDiscount"
import { AdminPageHeader } from "@/features/admin/components/organisms/UpperContentPage"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { APICourse } from "@/features/admin/courses/types"
import { cn } from "@/lib/utils"

interface DiscountFormProps {
    courses: APICourse[]
}

export function DiscountForm({ courses }: DiscountFormProps) {
    const {
        formData,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleCourseToggle,
        handleSubmit,
        setFormData
    } = useCreateDiscount()

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8" dir="rtl">
            <AdminPageHeader
                title="إنشاء خصم جديد"
                subtitle="أدخل تفاصيل الخصم وفترة الصلاحية لتطبيقه على الكورسات"
                breadcrumbs={[
                    { label: "الخصومات", href: "/discounts" },
                    { label: "إضافة خصم جديد" }
                ]}
                actions={
                    <div className="flex items-center gap-2">
                        <Button variant="outline" type="button" asChild className="h-11 px-6 border-2 font-bold rounded-xl">
                            <Link href="/discounts">
                                <X className="ml-2 h-4 w-4" />
                                إلغاء
                            </Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="h-11 px-8 gap-2 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20 font-bold rounded-xl">
                            {isSubmitting ? (
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="ml-2 h-4 w-4" />
                            )}
                            حفظ الخصم
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
                            {/* Name Field */}
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-base font-bold flex items-center gap-2">
                                    اسم الخصم (العنوان)
                                </Label>
                                <div className="relative group">
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="مثال: خصم العام الجديد"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="h-14 text-lg font-bold rounded-xl bg-muted/30 focus:bg-background transition-all border-2 focus:border-primary pr-12"
                                    />
                                    <TicketPercent className="absolute right-4 top-1/2 -translate-y-1/2 size-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Type Selection */}
                                <div className="space-y-3">
                                    <Label className="text-base font-bold">نوع الخصم</Label>
                                    <div className="grid grid-cols-2 gap-3 p-1.5 bg-muted rounded-xl border">
                                        <button
                                            type="button"
                                            onClick={() => handleSelectChange("type", "FIXED")}
                                            className={cn(
                                                "flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-lg transition-all",
                                                formData.type === "FIXED" ? "bg-background text-primary shadow-sm ring-1 ring-primary/20" : "text-muted-foreground hover:bg-background/50"
                                            )}
                                        >
                                            <Banknote className="size-6" />
                                            <span className="text-xs font-bold">مبلغ ثابت</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSelectChange("type", "PERCENTAGE")}
                                            className={cn(
                                                "flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-lg transition-all",
                                                formData.type === "PERCENTAGE" ? "bg-background text-primary shadow-sm ring-1 ring-primary/20" : "text-muted-foreground hover:bg-background/50"
                                            )}
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

                    {/* Applicability Section */}
                    <div className="border rounded-2xl bg-card shadow-sm overflow-hidden border-primary/10">
                        <div className="p-5 border-b bg-primary/5">
                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                <BookOpen className="size-5" />
                                كورس الخصم
                            </h4>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-3">
                                <Label className="text-base font-bold">تطبيق الخصم على</Label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-xl hover:bg-muted/50 transition-colors flex-1">
                                        <input
                                            type="radio"
                                            className="accent-primary size-4"
                                            checked={formData.appliesTo === "ALL"}
                                            onChange={() => handleSelectChange("appliesTo", "ALL")}
                                        />
                                        <span className="text-sm font-bold">جميع الكورسات</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-xl hover:bg-muted/50 transition-colors flex-1">
                                        <input
                                            type="radio"
                                            className="accent-primary size-4"
                                            checked={formData.appliesTo === "COURSE"}
                                            onChange={() => handleSelectChange("appliesTo", "COURSE")}
                                        />
                                        <span className="text-sm font-bold">كورسات محددة</span>
                                    </label>
                                </div>
                            </div>

                            {formData.appliesTo === "COURSE" && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Separator />
                                    <Label className="text-sm font-bold opacity-80">اختر الكورسات المستهدفة</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-1 pr-3">
                                        {courses.map((course) => {
                                            const isSelected = formData.courseIds?.includes(course.id)
                                            return (
                                                <div
                                                    key={course.id}
                                                    onClick={() => handleCourseToggle(course.id)}
                                                    className={cn(
                                                        "flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all",
                                                        isSelected ? "border-primary bg-primary/5" : "border-muted hover:border-primary/30"
                                                    )}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold truncate max-w-[180px]">{course.title}</span>
                                                        <span className="text-[10px] text-muted-foreground">{course.grade} - {course.subject}</span>
                                                    </div>
                                                    {isSelected && <Check className="size-4 text-primary" />}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </div>

                    {/* Limits Section */}
                    <div className="border rounded-2xl bg-card shadow-sm overflow-hidden border-primary/10">
                        <div className="p-5 border-b bg-primary/5">
                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                <Users className="size-5" />
                                حدود الاستخدام
                            </h4>
                        </div>
                        <CardContent className="p-8">
                            <div className="space-y-3">
                                <Label htmlFor="maxStudents" className="text-sm font-bold opacity-80">أقصى عدد للطلاب المستفيدين</Label>
                                <Input
                                    id="maxStudents"
                                    name="maxStudents"
                                    type="number"
                                    value={formData.maxStudents || ""}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl"
                                    placeholder="0"
                                />
                                <p className="text-[10px] text-muted-foreground mr-1">اتركه فارغاً أو 0 لاستخدام غير محدود</p>
                            </div>
                        </CardContent>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="border rounded-2xl bg-card shadow-sm overflow-hidden border-primary/10 sticky top-6">
                        <div className="p-5 border-b bg-primary/5">
                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                <Calendar className="size-5" />
                                فترة الصلاحية
                            </h4>
                        </div>
                        <CardContent className="p-6 space-y-8">
                            {/* Start Date */}
                            <div className="space-y-3">
                                <Label htmlFor="startDate" className="text-sm font-bold">تاريخ البدء</Label>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl focus:ring-primary text-right"
                                />
                            </div>

                            {/* End Date */}
                            <div className="space-y-3">
                                <Label htmlFor="endDate" className="text-sm font-bold">تاريخ الانتهاء</Label>
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl focus:ring-primary text-right"
                                />
                            </div>

                            <Separator />

                            {/* Active Status */}
                            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-dashed">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-bold">حالة الخصم</Label>
                                    <p className="text-[10px] text-muted-foreground">تفعيل الخصم فوراً</p>
                                </div>
                                <Switch
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => setFormData(f => ({ ...f, isActive: checked }))}
                                />
                            </div>
                        </CardContent>
                    </div>

                    {/* Summary Preview */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-4 animate-pulse-slow">
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">ملخص الخصم</p>
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-emerald-800">{formData.name || "اسم الخصم"}</h3>
                            <div className="text-3xl font-black text-emerald-600">
                                {formData.value || 0} {formData.type === "PERCENTAGE" ? "%" : "ج.م"}
                            </div>
                        </div>
                        <div className="text-[10px] text-emerald-600/70 font-medium">
                            {formData.appliesTo === "ALL" ? "يطبق على جميع الكورسات" : `يطبق على ${formData.courseIds?.length || 0} كورس`}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
