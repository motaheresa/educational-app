"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { fetchAPI } from "@/lib/api"

export function useExamsList() {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return

        setIsDeleting(true)

        try {
            // Note: Assuming endpoint is /api/assignments/[id] for consistency
            await fetchAPI(`/api/assignments/${deleteId}`, {
                method: "DELETE"
            })

            toast.success("تم حذف الامتحان بنجاح")
            setDeleteId(null)
            router.refresh()
        } catch (error: any) {
            console.error("Failed to delete exam:", error)
            toast.error("حدث خطأ أثناء حذف الامتحان")
        } finally {
            setIsDeleting(false)
        }
    }

    const onRowClick = (id: string) => {
        router.push(`/exams/${id}`)
    }

    return {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    }
}
