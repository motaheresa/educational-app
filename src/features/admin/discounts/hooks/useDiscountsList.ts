"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteDiscountAction } from "../actions"

export function useDiscountsList() {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return

        setIsDeleting(true)
        try {
            const result = await deleteDiscountAction(deleteId)
            if (result.success) {
                toast.success("تم حذف الخصم بنجاح")
                setDeleteId(null)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الخصم")
            }
        } catch (error) {
            console.error("Delete discount error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsDeleting(false)
        }
    }

    const onRowClick = (id: string) => {
        router.push(`/discounts/${id}`)
    }

    return {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    }
}
