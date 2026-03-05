"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateDiscountAction } from "../actions"
import { CreateDiscountRequest, APIDiscount } from "../types"

export function useUpdateDiscount(id: string, initialData: APIDiscount) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Format dates to YYYY-MM-DD for input[type="date"]
    const formatDateForInput = (dateString: string) => {
        if (!dateString) return ""
        return new Date(dateString).toISOString().split('T')[0]
    }

    const [formData, setFormData] = useState<CreateDiscountRequest>({
        name: initialData.name || "",
        type: initialData.type || "PERCENTAGE",
        value: initialData.value || 0,
        appliesTo: initialData.appliesTo || "ALL",
        courseIds: initialData.courseIds || [],
        maxStudents: initialData.maxStudents || null,
        startDate: formatDateForInput(initialData.startDate),
        endDate: formatDateForInput(initialData.endDate),
        isActive: initialData.isActive ?? true,
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

    const handleSelectChange = (name: keyof CreateDiscountRequest, value: any) => {
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
            const result = await updateDiscountAction(id, formData)
            if (result.success) {
                toast.success("تم تحديث الخصم بنجاح")
                router.push(`/discounts/${id}`)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء تحديث الخصم")
            }
        } catch (error) {
            console.error("Update discount error:", error)
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
