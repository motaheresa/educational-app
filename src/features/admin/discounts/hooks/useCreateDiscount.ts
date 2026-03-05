"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createDiscountAction } from "../actions"
import { CreateDiscountRequest, DiscountType, DiscountAppliesTo } from "../types"

export function useCreateDiscount() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<CreateDiscountRequest>({
        name: "",
        type: "PERCENTAGE",
        value: 0,
        appliesTo: "ALL",
        courseIds: [],
        maxStudents: null,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true,
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? (value === "" ? null : Number(value)) : value,
        }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCourseToggle = (courseId: string) => {
        setFormData((prev) => {
            const currentIds = prev.courseIds || []
            const newIds = currentIds.includes(courseId)
                ? currentIds.filter(id => id !== courseId)
                : [...currentIds, courseId]
            return { ...prev, courseIds: newIds }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name) {
            toast.error("يرجى إدخال اسم الخصم")
            return
        }

        if (formData.value <= 0) {
            toast.error("يرجى إدخال قيمة صحيحة للخصم")
            return
        }

        if (formData.appliesTo === "COURSE" && (!formData.courseIds || formData.courseIds.length === 0)) {
            toast.error("يرجى اختيار كورس واحد على الأقل")
            return
        }

        setIsSubmitting(true)
        try {
            const result = await createDiscountAction(formData)
            if (result.success) {
                toast.success("تم إنشاء الخصم بنجاح")
                router.push("/discounts")
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء إنشاء الخصم")
            }
        } catch (error) {
            console.error("Create discount error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formData,
        setFormData,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleCourseToggle,
        handleSubmit,
    }
}
