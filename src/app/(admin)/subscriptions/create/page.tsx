import { Suspense } from "react"
import { fetchAPI } from "@/lib/api"
import { APIStudent, APIStudentsResponse } from "@/features/admin/students/types"
import { APICourse } from "@/features/admin/courses/types"
import { CreateSubscriptionForm } from "@/features/admin/subscriptions/components/organisms/CreateSubscriptionForm"
import { LoadingState } from "@/components/feedback/LoadingState"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function CreateSubscriptionPage() {
    let students: APIStudent[] = []
    let courses: APICourse[] = []
    let isError = false

    try {
        // Fetch students and courses in parallel
        const [studentsResponse, coursesResponse] = await Promise.all([
            fetchAPI<APIStudentsResponse>("/api/students"),
            fetchAPI<APICourse[]>("/api/courses")
        ])

        if (studentsResponse?.data?.data) {
            students = studentsResponse.data.data
        }

        if (Array.isArray(coursesResponse)) {
            courses = coursesResponse
        }
    } catch (error) {
        console.error("Failed to fetch data for subscription creation:", error)
        isError = true
    }

    if (isError) {
        return (
            <div className="p-6">
                <ErrorState 
                    title="حدث خطأ في تحميل البيانات"
                    message="عذراً، لم نتمكن من جلب قائمة الطلاب أو الكورسات اللازمة لإنشاء الاشتراك. يرجى المحاولة مرة أخرى." 
                />
            </div>
        )
    }

    return (
        <Suspense fallback={<LoadingState message="جاري تجهيز نموذج الاشتراك..." />}>
            <CreateSubscriptionForm students={students} courses={courses} />
        </Suspense>
    )
}
