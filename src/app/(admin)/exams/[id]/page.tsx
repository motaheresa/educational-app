import { fetchAPI } from "@/lib/api"
import { APIExam } from "@/features/admin/exams/types"
import { ExamDetailsHeader } from "@/features/admin/exams/components/organisms/ExamDetailsHeader"
import { ExamDetailsContent } from "@/features/admin/exams/components/organisms/ExamDetailsContent"
import { ErrorState } from "@/components/feedback/ErrorState"
import { Metadata } from "next"

interface ExamDetailsPageProps {
    params: { id: string }
}

export async function generateMetadata({ params }: ExamDetailsPageProps): Promise<Metadata> {
    try {
        const data:  APIExam  = await fetchAPI(`/api/assignments/${params.id}`)
        return {
            title: `امتحان: ${data.title}`,
        }
    } catch {
        return { title: "تفاصيل الامتحان" }
    }
}

export default async function ExamDetailsPage({ params }: ExamDetailsPageProps) {
    const { id } = await params

    try {
        const data: APIExam = await fetchAPI(`/api/assignments/${id}`)
        const exam = data

        if (!exam) {
            return (
                <ErrorState
                    title="الامتحان غير موجود"
                    message="عذراً، لم نتمكن من العثور على بيانات هذا الامتحان."
                />
            )
        }

        return (
            <div className="mx-auto max-w-7xl p-8 space-y-8" dir="rtl">
                <ExamDetailsHeader
                    id={exam.id}
                    title={exam.title}
                    courseTitle={exam.section?.title} // Or fetch course title if available in larger scope
                />
                <ExamDetailsContent exam={exam} />
            </div>
        )
    } catch (error) {
        console.error("Failed to fetch exam details:", error)
        return (
            <ErrorState
                title="حدث خطأ أثناء تحميل البيانات"
                message="لا يمكننا الوصول إلى بيانات الامتحان حالياً. يرجى المحاولة مرة أخرى لاحقاً."
            />
        )
    }
}
