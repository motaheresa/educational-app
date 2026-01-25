"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { fetchAPI } from "@/lib/api"
import { deleteExamAction } from "../actions"

export function useExamsList() {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return

        setIsDeleting(true)

        try {
            const result = await deleteExamAction(deleteId)

            if (result.success) {
                toast.success("تم حذف الامتحان بنجاح")
                setDeleteId(null)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الامتحان")
            }
        } catch (error: any) {
            console.error("Failed to delete exam:", error)
            toast.error("حدث خطأ غير متوقع")
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
