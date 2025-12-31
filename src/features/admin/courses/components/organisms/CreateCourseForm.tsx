"use client"

import { CourseDetailsCard } from "@/features/admin/courses/components/molecules/CourseDetailsCard"
import { CourseCurriculum } from "@/features/admin/courses/components/organisms/CourseCurriculum"
import { CourseImageUpload } from "@/features/admin/courses/components/molecules/CourseImageUpload"
import { CoursePublishSettings } from "@/features/admin/courses/components/organisms/CoursePublishSettings"
import { CreateCourseHeader } from "@/features/admin/courses/components/organisms/CreateCourseHeader"
import { useCreateCourse } from "@/features/admin/courses/hooks/useCreateCourse"

export function CreateCourseForm() {
    const { formData, isSubmitting, handleChange, handleSectionsChange, handleSubmit } = useCreateCourse()

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8 p-8" dir="rtl">
            <CreateCourseHeader isSubmitting={isSubmitting} />

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
        </form>
    )
}
