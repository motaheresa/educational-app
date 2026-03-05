"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createSubscriptionAction } from "../actions"
import { CreateSubscriptionRequest } from "../types"
import { APICourse } from "@/features/admin/courses/types"

export function useCreateSubscription() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<CreateSubscriptionRequest>({
        studentId: "",
        courseId: "",
        paymentMethod: "CASH",
    })

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = (name: keyof CreateSubscriptionRequest, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.studentId || !formData.courseId) {
            toast.error("يرجى اختيار الطالب والكورس")
            return
        }

        setIsSubmitting(true)
        try {
            const result = await createSubscriptionAction(formData)

            if (result.success) {
                toast.success("تم إنشاء الاشتراك بنجاح")
                router.push("/subscriptions")
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء إنشاء الاشتراك")
            }
        } catch (error: unknown) {
            console.error("Create subscription error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formData,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleSubmit,
        setFormData
    }
}
