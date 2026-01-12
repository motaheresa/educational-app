"use client"

import { User, Phone, Mail, FileText, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useCreateStudent } from "@/features/admin/students/hooks/useCreateStudent"
import { FormInput } from "@/components/molecules/FormInput"
import { FormSelect } from "@/components/molecules/FormSelect"
import { FormTextarea } from "@/components/molecules/FormTextarea"

export function CreateStudentForm() {
    const { formData, isSubmitting, handleChange, handleCoursesChange, handleSubmit } = useCreateStudent()

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-6">
                {/* Form Card */}
                <CardHeader className="p-0!">
                    <CardTitle className="text-xl font-bold">بيانات الطالب</CardTitle>
                    <CardDescription>يرجى ملء جميع الحقول المطلوبة لإضافة الطالب الجديد</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Student Name */}
                        <FormInput
                            id="name"
                            name="name"
                            label="اسم الطالب"
                            placeholder="الاسم الكامل"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            icon={User}
                        />

                        {/* Phone Number */}
                        <FormInput
                            id="phone"
                            name="phone"
                            label="رقم الهاتف"
                            placeholder="01xxxxxxxxx"
                            className="text-right"
                            dir="ltr"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            icon={Phone}
                        />

                        {/* Email Address */}
                        <FormInput
                            id="email"
                            name="email"
                            label="البريد الإلكتروني"
                            type="email"
                            placeholder="example@email.com"
                            dir="ltr"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            icon={Mail}
                        />

                        {/* Enrolled Courses */}
                        <FormSelect
                            label="الكورسات المشترك بها"
                            placeholder="اختر كورس أو أكثر..."
                            value={formData.enrolledCourses[0] || ""}
                            onValueChange={(val) => handleCoursesChange([val])}
                            options={[
                                { value: "الرياضيات", label: "الرياضيات" },
                                { value: "الفيزياء", label: "الفيزياء" },
                                { value: "الكيمياء", label: "الكيمياء" }
                            ]}
                            icon={FileText}
                        />

                        {/* Additional Notes */}
                        <FormTextarea
                            id="notes"
                            name="notes"
                            label="ملاحظات إضافية (اختياري)"
                            placeholder="أضف أي ملاحظات خاصة بالطالب هنا..."
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row-reverse gap-4 mt-10">
                        <Button type="submit" className="h-11 px-8 gap-2 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Save className="size-4" />
                            )}
                            حفظ الطالب
                        </Button>
                        <Button variant="outline" type="button" className="h-11 px-8 text-muted-foreground" asChild>
                            <Link href="/students">إلغاء</Link>
                        </Button>
                    </div>
                </CardContent>
            </div>
        </form>
    )
}
