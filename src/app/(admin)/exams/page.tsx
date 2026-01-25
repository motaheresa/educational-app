import { fetchAPI } from "@/lib/api"
import { APIExam } from "@/features/admin/exams/types"
import { ExamsList } from "@/features/admin/exams/components/organisms/ExamsList"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function ExamsPage() {
    try {
        const data: APIExam[] = await fetchAPI("/api/assignments")
        const exams = data || []

        return (
            <div className="space-y-6">
                <ExamsList data={exams} />
            </div>
        )
    } catch (error) {
        console.error("Failed to fetch exams:", error)
        return (
            <ErrorState
                title="حدث خطأ أثناء تحميل الامتحانات"
                message="لا يمكننا الوصول إلى بيانات الامتحانات حالياً. يرجى المحاولة مرة أخرى لاحقاً."
            />
        )
    }
}
