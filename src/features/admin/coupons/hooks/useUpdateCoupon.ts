"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateCouponAction } from "../actions"
import { APICoupon, UpdateCouponRequest, CouponType } from "../types"

export function useUpdateCoupon(id: string, initialData: APICoupon) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<UpdateCouponRequest>({
        code: initialData.code || "",
        type: initialData.type || "FIXED",
        value: initialData.value || 0,
        maxUsage: initialData.maxUsage || 0,
        maxUsagePerStudent: initialData.maxUsagePerStudent || 0,
        isActive: initialData.isActive ?? true,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }))
    }

    const handleTypeChange = (value: CouponType) => {
        setFormData(prev => ({ ...prev, type: value }))
    }

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }))
    }

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let result = ''
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setFormData(prev => ({ ...prev, code: result }))
        toast.info("تم توليد كود جديد")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await updateCouponAction(id, formData)
            if (result.success) {
                toast.success("تم تحديث الكوبون بنجاح")
                router.push(`/coupons/${id}`)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء تحديث الكوبون")
            }
        } catch (error: unknown) {
            console.error("Update coupon hook error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formData,
        isSubmitting,
        handleChange,
        handleTypeChange,
        handleSwitchChange,
        generateCode,
        handleSubmit
    }
}
