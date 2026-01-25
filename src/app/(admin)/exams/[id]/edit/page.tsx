import { fetchAPI } from "@/lib/api"
import { UpdateExamForm } from "@/features/admin/exams/components/organisms/UpdateExamForm"
import { APICourse } from "@/features/admin/courses/types"
import { APIExam } from "@/features/admin/exams/types"
import { ErrorState } from "@/components/feedback/ErrorState"
import { Metadata } from "next"

interface UpdateExamPageProps {
    params: { id: string }
}

export const metadata: Metadata = {
    title: "تعديل الامتحان",
    description: "قم بتعديل بيانات الامتحان والأسئلة",
}

export default async function UpdateExamPage({ params }: UpdateExamPageProps) {
    const { id } = await params

    try {
        const [examRes, coursesRes] = await Promise.all([
            fetchAPI(`/api/assignments/${id}`) as Promise<APIExam>,
            fetchAPI("/api/courses") as Promise<APICourse[]>
        ])

        if (!examRes) {
            return (
                <ErrorState
                    title="الامتحان غير موجود"
                    message="عذراً، لم نتمكن من العثور على بيانات هذا الامتحان لتعديله."
                />
            )
        }

        return (
            <div className="mx-auto max-w-7xl p-8" dir="rtl">
                <UpdateExamForm id={id} initialData={examRes} courses={coursesRes} />
            </div>
        )
    } catch (error) {
        console.error("Failed to fetch update data:", error)
        return (
            <ErrorState
                title="حدث خطأ أثناء تحميل البيانات"
                message="لا يمكننا تحميل بيانات التعديل حالياً، يرجى المحاولة مرة أخرى لاحقاً."
            />
        )
    }
}
