
import React, { Suspense } from 'react'
import { StudentsList } from '@/features/admin/students/components/organisms/StudentsList'
import { StudentsPayload, UIStudent } from '@/features/admin/students/types'
import { fetchAPI } from "@/lib/api"
import { LoadingState } from "@/components/feedback/LoadingState"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function StudentsPage() {
    let students: UIStudent[] = [];

    try {
        // fetchAPI returns the data payload (T) directly
        const payload = await fetchAPI<StudentsPayload>("/api/students");

        // fetchAPI already verifies success, so we just check the payload structure
        if (payload?.data) {
            students = payload.data;
        }

    } catch (error) {
        console.error("Failed to fetch students:", error);
        return <ErrorState message={"خطأ في تحميل بيانات الطلاب"} />
    }

    return (
        <Suspense fallback={<LoadingState message="جاري تحميل الطلاب..." />}>
            <StudentsList data={students} />
        </Suspense>
    )
}
