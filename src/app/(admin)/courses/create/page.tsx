import Link from "next/link"
import { ArrowLeft, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/features/admin/components/molecules/PageHeader"

import { CourseDetailsCard } from "@/features/admin/courses/components/CourseDetailsCard"
import { CourseCurriculum } from "@/features/admin/courses/components/CourseCurriculum"
import { CourseImageUpload } from "@/features/admin/courses/components/CourseImageUpload"
import { CoursePublishSettings } from "@/features/admin/courses/components/CoursePublishSettings"

export default function AddCoursePage() {
    return (
        <div className="container mx-auto max-w-7xl space-y-8 p-8" dir="rtl">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/courses" className="hover:text-primary transition-colors">إدارة الكورسات</Link>
                        <span>/</span>
                        <span className="text-foreground">إنشاء كورس جديد</span>
                    </div>
                    <PageHeader
                        title="إنشاء كورس جديد"
                        subtitle="قم بإضافة تفاصيل الكورس، المحتوى، والمرفقات التعليمية"
                        className="mb-0"
                    />
                </div>
                <div className="flex items-center gap-2 mt-auto pb-2">
                    <Button variant="outline" asChild>
                        <Link href="/courses">
                            <X className="ml-2 h-4 w-4" />
                            إلغاء
                        </Link>
                    </Button>
                    <Button>
                        <Save className="ml-2 h-4 w-4" />
                        حفظ الكورس
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-8 lg:col-span-2 order-2 lg:order-1">
                    {/* Course Details */}
                    <CourseDetailsCard />

                    {/* Course Curriculum */}
                    <CourseCurriculum />
                </div>

                {/* Sidebar */}
                <div className="space-y-8 lg:col-span-1 order-1 lg:order-2">
                    {/* Course Image */}
                    <CourseImageUpload />

                    {/* Publishing Settings */}
                    <CoursePublishSettings />
                </div>
            </div>
        </div>
    )
}
