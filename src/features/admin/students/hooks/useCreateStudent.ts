"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useCreateStudent() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        enrolledCourses: [] as string[],
        notes: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCoursesChange = (courses: string[]) => {
        setFormData(prev => ({ ...prev, enrolledCourses: courses }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        toast.promise(new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1500)), {
            loading: 'جاري حفظ بيانات الطالب...',
            success: () => {
                router.push("/students")
                return 'تم إضافة الطالب بنجاح'
            },
            error: 'حدث خطأ أثناء إضافة الطالب',
            finally: () => setIsSubmitting(false)
        })
    }

    return {
        formData,
        isSubmitting,
        handleChange,
        handleCoursesChange,
        handleSubmit
    }
}
