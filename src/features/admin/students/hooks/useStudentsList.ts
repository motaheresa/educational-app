"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteStudentAction } from "../actions"

export function useStudentsList() {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return

        setIsDeleting(true)

        try {
            const result = await deleteStudentAction(deleteId)

            if (result.success) {
                toast.success("تم حذف الطالب بنجاح")
                setDeleteId(null)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الطالب")
            }
        } catch (error) {
            console.error("Failed to delete student:", error)
            toast.error("حدث خطأ أثناء حذف الطالب")
        } finally {
            setIsDeleting(false)
        }
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
