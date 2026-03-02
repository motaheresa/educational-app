"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateSubscriptionAction } from "../actions"
import { APISubscription, UpdateSubscriptionRequest } from "../types"

export function useUpdateSubscription(id: string, initialData: APISubscription) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<UpdateSubscriptionRequest>({
        paymentMethod: initialData.paymentMethod || "CASH",
        status: initialData.status || "ACTIVE",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)

        try {
            const result = await updateSubscriptionAction(id, formData)
            if (result.success) {
                toast.success("تم تحديث الاشتراك بنجاح")
                router.push(`/subscriptions/${id}`)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء تحديث الاشتراك")
            }
        } catch (error: unknown) {
            console.error("Update subscription hook error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formData,
        isSubmitting: isSubmitting,
        handleChange,
        handleSelectChange,
        handleSubmit
    }
}
