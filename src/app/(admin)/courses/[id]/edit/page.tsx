import { UpdateCourseForm } from "@/features/admin/courses/components/organisms/UpdateCourseForm"
import { fetchAPI } from "@/lib/api"
import { APICourse } from "@/features/admin/courses/types/index"
import { UpdateCourseFormData } from "@/features/admin/courses/types/update"
import { notFound } from "next/navigation"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function UpdateCoursePage({ params }: { params: { id: string } }) {
    const { id } = await params

    let course: APICourse | null = null

    try {
        course = await fetchAPI<APICourse>(`/api/courses/${id}`)
    } catch (error) {
        console.error("Failed to fetch course:", error)
        return <ErrorState message="حدث خطأ أثناء جلب بيانات الكورس" />
    }

    if (!course) {
        return <ErrorState message="الكورس غير موجود" />
    }

    // Map API data to form data
    const initialData: UpdateCourseFormData = {
        title: course.title,
        description: course.description || "",
        price: course.price,
        grade: course.grade,
        subject: course.subject,
        banner: course.banner || "",
        sections: course.sections || [],
    }

    return <UpdateCourseForm courseId={id} initialData={initialData} />
}
