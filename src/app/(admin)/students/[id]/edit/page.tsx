import { fetchAPI } from "@/lib/api"
import { APIStudentDetails, CreateStudentRequest } from "@/features/admin/students/types"
import { APICourse } from "@/features/admin/courses/types"
import { UpdateStudentForm } from "@/features/admin/students/components/organisms/UpdateStudentForm"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function EditStudentPage({ params }: { params: { id: string } }) {
    const { id } = await params

    let student: APIStudentDetails | null = null
    const coursesPromise = fetchAPI<APICourse[]>("/api/courses").catch(() => [])

    try {
        student = await fetchAPI<APIStudentDetails>(`/api/students/${id}`)
    } catch (error) {
        console.error("Failed to fetch student:", error)
        return <ErrorState message="حدث خطأ أثناء جلب بيانات الطالب" />
    }

    if (!student) {
        return <ErrorState message="الطالب غير موجود" />
    }

    // Map API data to form data
    const initialData: CreateStudentRequest = {
        name: student.name,
        phone: student.phone,
        email: student.email,
        parentPhone: student.parentPhone || "",
        notes: student.notes || "",
        courses: student.courses.map(c => c.courseId)
    }

    return (
        <UpdateStudentForm
            studentId={id}
            initialData={initialData}
            coursesPromise={coursesPromise}
        />
    )
}
