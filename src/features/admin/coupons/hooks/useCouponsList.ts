"use client"

import { useState } from "react"
import { toast } from "sonner"
import { deleteCouponAction } from "../actions"

export function useCouponsList() {
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return

        setIsDeleting(true)
        try {
            const result = await deleteCouponAction(deleteId)
            if (result.success) {
                toast.success("تم حذف الكوبون بنجاح")
                setDeleteId(null)
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الكوبون")
            }
        } catch (error: unknown) {
            console.error("Delete coupon error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsDeleting(false)
        }
    }

    return {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete
    }
}
