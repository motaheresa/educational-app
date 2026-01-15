import { fetchAPI } from "@/lib/api"
import { APICourse } from "@/features/admin/courses/types"
import { CreateStudentForm } from "@/features/admin/students/components/organisms/CreateStudentForm"

export default function CreateStudentPage() {
    const coursesPromise = fetchAPI<APICourse[]>("/api/courses").catch(() => [])

    return (
        <CreateStudentForm coursesPromise={coursesPromise} />
    )
}
