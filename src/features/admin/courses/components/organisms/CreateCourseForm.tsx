"use client"

import Link from "next/link"
import { Save, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseDetailsCard } from "@/features/admin/courses/components/molecules/CourseDetailsCard"
import { CourseCurriculum } from "@/features/admin/courses/components/organisms/CourseCurriculum"
import { CourseImageUpload } from "@/features/admin/courses/components/molecules/CourseImageUpload"
import { CoursePublishSettings } from "@/features/admin/courses/components/organisms/CoursePublishSettings"
import { useCreateCourse } from "@/features/admin/courses/hooks/useCreateCourse"

export function CreateCourseForm() {
    const { formData, isSubmitting, handleChange, handleSectionsChange, handleSubmit } = useCreateCourse()

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8 p-8" dir="rtl">

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-8 lg:col-span-2 order-2 lg:order-1">
                    <CourseDetailsCard
                        title={formData.title}
                        description={formData.description}
                        onChange={handleChange}
                    />
                    <CourseCurriculum
                        sections={formData.sections}
                        onChange={handleSectionsChange}
                    />
                </div>

                {/* Sidebar */}
                <div className="space-y-8 lg:col-span-1 order-1 lg:order-2">
                    <CourseImageUpload
                        banner={formData.banner}
                        onChange={handleChange}
                    />
                    <CoursePublishSettings
                        price={formData.price}
                        grade={formData.grade}
                        subject={formData.subject}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Action Buttons (Moved to bottom) */}
            <div className="flex flex-row-reverse gap-4 mt-10 border-t pt-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0 z-10 p-4 rounded-t-xl border-x border-b shadow-sm lg:static lg:border-0 lg:shadow-none lg:p-0">
                <Button type="submit" className="h-11 px-8 gap-2 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Save className="size-4" />
                    )}
                    حفظ الكورس
                </Button>
                <Button variant="outline" type="button" className="h-11 px-8 text-muted-foreground" asChild>
                    <Link href="/courses">إلغاء</Link>
                </Button>
            </div>
        </form>
    )
}
