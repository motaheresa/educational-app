"use client"

import { CourseDetailsCard } from "@/features/admin/courses/components/molecules/CourseDetailsCard"
import { CourseCurriculum } from "@/features/admin/courses/components/organisms/CourseCurriculum"
import { CourseImageUpload } from "@/features/admin/courses/components/molecules/CourseImageUpload"
import { CoursePublishSettings } from "@/features/admin/courses/components/organisms/CoursePublishSettings"
import { UpdateCourseHeader } from "@/features/admin/courses/components/organisms/UpdateCourseHeader"
import { useUpdateCourse } from "@/features/admin/courses/hooks/useUpdateCourse"
import { UpdateCourseFormData } from "@/features/admin/courses/types/update"

interface UpdateCourseFormProps {
    courseId: string
    initialData: UpdateCourseFormData
}

export function UpdateCourseForm({ courseId, initialData }: UpdateCourseFormProps) {
    const { formData, isSubmitting, handleChange, handleSectionsChange, handleSubmit } = useUpdateCourse(courseId, initialData)

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8 p-8" dir="rtl">
            <UpdateCourseHeader isSubmitting={isSubmitting} />

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
