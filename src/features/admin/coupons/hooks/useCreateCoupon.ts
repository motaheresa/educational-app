"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createCouponAction } from "../actions"
import { CreateCouponRequest, CouponType } from "../types"

export function useCreateCoupon() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<CreateCouponRequest>({
        code: "",
        type: "FIXED",
        value: 0,
        maxUsage: 0,
        maxUsagePerStudent: 1,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 7 days
        isActive: true,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }))
    }

    const handleTypeChange = (value: CouponType) => {
        setFormData(prev => ({ ...prev, type: value }))
    }

    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setFormData(prev => ({ ...prev, code: result }));
        toast.success("تم توليد كود جديد");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.code || formData.value <= 0) {
            toast.error("يرجى إكمال البيانات بشكل صحيح")
            return
        }

        setIsSubmitting(true)
        try {
            const result = await createCouponAction({
                ...formData,
                expiresAt: new Date(formData.expiresAt).toISOString()
            })

            if (result.success) {
                toast.success("تم إنشاء الكوبون بنجاح")
                router.push("/coupons")
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء إنشاء الكوبون")
            }
        } catch (error: unknown) {
            console.error("Create coupon error:", error)
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
        generateCode,
        handleSubmit,
        setFormData
    }
}
