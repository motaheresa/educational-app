import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createStudentAction } from "../actions"
import { CreateStudentRequest } from "../types"

export function useCreateStudent() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        parentPhone: "",
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

        const payload: CreateStudentRequest = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            parentPhone: formData.parentPhone,
            notes: formData.notes,
            courses: formData.enrolledCourses
        }

        try {
            const result = await createStudentAction(payload)

            if (result.success) {
                toast.success('تم إضافة الطالب بنجاح')
                router.push("/students")
                router.refresh()
            } else {
                toast.error(result.error || 'حدث خطأ أثناء إضافة الطالب')
            }
        } catch (error: any) {
            toast.error(error.message || 'حدث خطأ أثناء إضافة الطالب')
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
