"use client"

import { Suspense } from "react"
import { User, Phone, Mail, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useUpdateStudent } from "@/features/admin/students/hooks/useUpdateStudent"
import { FormInput } from "@/components/molecules/FormInput"
import { FormTextarea } from "@/components/molecules/FormTextarea"
import { APICourse } from "@/features/admin/courses/types"
import { CreateStudentRequest } from "@/features/admin/students/types"
import { CourseSelectField, CourseSelectSkeleton } from "../molecules/CourseSelectField"
import { StudentFormHeader } from "./StudentFormHeader"

interface UpdateStudentFormProps {
    studentId: string
    initialData: CreateStudentRequest
    coursesPromise: Promise<APICourse[]>
}

export function UpdateStudentForm({ studentId, initialData, coursesPromise }: UpdateStudentFormProps) {
    const {
        formData,
        isSubmitting,
        handleChange,
        handleCoursesChange,
        handleSubmit
    } = useUpdateStudent(studentId, initialData)

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8" dir="rtl">
            <StudentFormHeader
                title="تعديل بيانات الطالب"
                subtitle="قم بتحديث تفاصيل الطالب والكورسات المشترك بها"
                isSubmitting={isSubmitting}
                backHref={`/students/${studentId}`}
                saveLabel="تحديث الطالب"
            />

            <div className="flex flex-col gap-6">
                <CardContent className="p-8 border rounded-xl bg-card">
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

                        {/* Parent Phone Number */}
                        <FormInput
                            id="parentPhone"
                            name="parentPhone"
                            label="رقم ولي الأمر"
                            placeholder="01xxxxxxxxx"
                            dir="ltr"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            required
                            icon={Phone}
                        />

                        {/* Enrolled Courses - Granular Suspense */}
                        <Suspense fallback={<CourseSelectSkeleton />}>
                            <CourseSelectField
                                promise={coursesPromise}
                                value={formData.courses}
                                onChange={handleCoursesChange}
                            />
                        </Suspense>

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
                </CardContent>
            </div>
        </form>
    )
}
