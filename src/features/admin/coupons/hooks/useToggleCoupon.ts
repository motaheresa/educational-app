"use client"

import { useState } from "react"
import { toast } from "sonner"
import { toggleCouponStatusAction } from "../actions"

export function useToggleCoupon(id: string, initialStatus: boolean) {
    const [isActive, setIsActive] = useState(initialStatus)
    const [isLoading, setIsLoading] = useState(false)

    const toggleStatus = async () => {
        setIsLoading(true)
        try {
            const newStatus = !isActive
            const result = await toggleCouponStatusAction(id, newStatus)
            if (result.success) {
                setIsActive(newStatus)
                toast.success(newStatus ? "تم تفعيل الكوبون" : "تم إيقاف الكوبون")
            } else {
                toast.error(result.error || "حدث خطأ أثناء تغيير حالة الكوبون")
            }
        } catch (error: unknown) {
            console.error("Toggle coupon status error:", error)
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
