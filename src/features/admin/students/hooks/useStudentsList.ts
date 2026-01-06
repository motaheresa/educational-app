"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useStudentsList() {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return

        setIsDeleting(true)

        // Mock delete action for now
        toast.promise(new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000)), {
            loading: 'جاري حذف الطالب...',
            success: () => {
                setDeleteId(null)
                return 'تم حذف الطالب بنجاح'
            },
            error: 'حدث خطأ أثناء حذف الطالب',
            finally: () => setIsDeleting(false)
        })
    }

    const onRowClick = (id: string) => {
        router.push(`/students/${id}`)
    }

    return {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    }
}
