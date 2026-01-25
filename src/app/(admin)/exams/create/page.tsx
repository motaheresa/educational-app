import { fetchAPI } from "@/lib/api"
import { CreateExamForm } from "@/features/admin/exams/components/organisms/CreateExamForm"
import { APICourse } from "@/features/admin/courses/types"
import { Metadata } from "next"
import { ErrorState } from "@/components/feedback/ErrorState"

export const metadata: Metadata = {
    title: "إنشاء امتحان جديد",
    description: "أضف امتحاناً جديداً لطلابك وقم بإعداد الأسئلة والاختيارات",
}

export default async function CreateExamPage() {
    try {
        const response = await fetchAPI("/api/courses") as APICourse[]
        const courses = response || []

        return (
            <div className="mx-auto max-w-7xl p-8" dir="rtl">
                <CreateExamForm courses={courses} />
            </div>
        )
    } catch (error) {
        console.error("Failed to fetch courses:", error)
        return (
            <ErrorState
                title="حدث خطأ أثناء تحميل الكورسات"
                message="لا يمكننا تحميل قائمة الكورسات حالياً، يرجى المحاولة مرة أخرى."
            />
        )
    }
}
