"use client"

import { useState } from "react"
import { toast } from "sonner"
import { toggleDiscountStatusAction } from "../actions"

export function useToggleDiscount(id: string, initialStatus: boolean) {
    const [isActive, setIsActive] = useState(initialStatus)
    const [isLoading, setIsLoading] = useState(false)

    const toggleStatus = async (checked: boolean) => {
        setIsLoading(true)
        // Optimistic update
        setIsActive(checked)

        try {
            const result = await toggleDiscountStatusAction(id, checked)
            if (!result.success) {
                // Rollback if failed
                setIsActive(!checked)
                toast.error(result.error || "حدث خطأ أثناء تغيير حالة الخصم")
            } else {
                toast.success(checked ? "تم تفعيل الخصم بنجاح" : "تم تعطيل الخصم بنجاح")
            }
        } catch (error) {
            setIsActive(!checked)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isActive,
        isLoading,
        toggleStatus
    }
}
