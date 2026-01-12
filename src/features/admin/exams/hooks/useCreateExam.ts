"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useCreateExam() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        examName: "",
        course: "",
        duration: "",
        questionsCount: "",
        passingScore: "",
        shuffleQuestions: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, shuffleQuestions: checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        toast.promise(new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1500)), {
            loading: 'جاري إنشاء الامتحان...',
            success: () => {
                router.push("/exams")
                return 'تم إنشاء الامتحان بنجاح'
            },
            error: 'حدث خطأ أثناء إنشاء الامتحان',
            finally: () => setIsSubmitting(false)
        })
    }

    return {
        formData,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleSwitchChange,
        handleSubmit
    }
}
