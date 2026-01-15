"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateStudentAction } from "../actions"
import { CreateStudentRequest } from "../types"

export function useUpdateStudent(studentId: string, initialData: CreateStudentRequest) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<CreateStudentRequest>(initialData)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCoursesChange = (courses: string[]) => {
        setFormData(prev => ({ ...prev, courses }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await updateStudentAction(studentId, formData)

            if (result.success) {
                toast.success("تم تحديث بيانات الطالب بنجاح")
                router.push(`/students/${studentId}`)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء تحديث بيانات الطالب")
            }
        } catch (error) {
            console.error("Failed to update student:", error)
            toast.error("حدث خطأ أثناء تحديث بيانات الطالب")
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formData,
        isSubmitting,
        handleChange,
        handleCoursesChange,
        handleSubmit
    }
}
