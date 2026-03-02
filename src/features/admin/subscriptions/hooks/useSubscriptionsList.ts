"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteSubscriptionAction } from "../actions"

export function useSubscriptionsList() {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return

        setIsDeleting(true)

        try {
            const result = await deleteSubscriptionAction(deleteId)

            if (result.success) {
                toast.success("تم حذف الاشتراك بنجاح")
                setDeleteId(null)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الاشتراك")
            }
        } catch (error) {
            console.error("Failed to delete subscription:", error)
            toast.error("حدث خطأ أثناء حذف الاشتراك")
        } finally {
            setIsDeleting(false)
        }
    }

    const onRowClick = (id: string) => {
        router.push(`/subscriptions/${id}`)
    }

    return {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    }
}
