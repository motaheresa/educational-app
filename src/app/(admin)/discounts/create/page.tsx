import { Suspense } from "react"
import { fetchAPI } from "@/lib/api"
import { APICourse } from "@/features/admin/courses/types"
import { DiscountForm } from "@/features/admin/discounts/components/organisms/DiscountForm"
import { LoadingState } from "@/components/feedback/LoadingState"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function CreateDiscountPage() {
    let courses: APICourse[] = []
    let isError = false

    try {
        const coursesResponse = await fetchAPI<APICourse[]>("/api/courses")

        if (Array.isArray(coursesResponse)) {
            courses = coursesResponse
        }
    } catch (error) {
        console.error("Failed to fetch courses for discount creation:", error)
        isError = true
    }

    if (isError) {
        return (
            <ErrorState
                title="حدث خطأ في تحميل البيانات"
                message="عذراً، لم نتمكن من جلب قائمة الكورسات اللازمة لإنشاء الخصم. يرجى المحاولة مرة أخرى."
            />
        )
    }

    return (
        <Suspense fallback={<LoadingState message="جاري تجهيز نموذج الخصم..." />}>
            <DiscountForm courses={courses} />
        </Suspense>
    )
}
