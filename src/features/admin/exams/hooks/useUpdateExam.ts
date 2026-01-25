"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateExamAction } from "../actions"
import { CreateExamRequest, CreateExamQuestion, CreateExamOption, APIExam } from "../types"

export function useUpdateExam(id: string, initialData: APIExam) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<CreateExamRequest>({
        title: initialData.title || "",
        duration: initialData.duration || 30,
        passDegree: initialData.passDegree || 50,
        totalDegree: initialData.totalDegree || 100,
        courseId: initialData.courseId || "",
        sectionId: initialData.sectionId || "",
        questionsCount: initialData.questionsCount || 0,
        questions: initialData.questions?.map(q => ({
            type: q.type,
            header: { text: q.header.text },
            degree: q.degree,
            options: q.options.map(o => ({
                text: o.text,
                isCorrect: o.isCorrect
            }))
        })) || []
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duration' || name === 'passDegree' || name === 'totalDegree' ? Number(value) : value
        }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Question Management
    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    type: "MCQ",
                    header: { text: "" },
                    degree: 1,
                    options: [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false }
                    ]
                }
            ]
        }))
    }

    const removeQuestion = (index: number) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }))
    }

    const updateQuestion = (index: number, updates: Partial<CreateExamQuestion>) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === index ? { ...q, ...updates } : q)
        }))
    }

    const updateQuestionHeader = (index: number, text: string) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === index ? { ...q, header: { ...q.header, text } } : q)
        }))
    }

    // Option Management
    const addOption = (qIndex: number) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === qIndex ? {
                ...q,
                options: [...q.options, { text: "", isCorrect: false }]
            } : q)
        }))
    }

    const removeOption = (qIndex: number, oIndex: number) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === qIndex ? {
                ...q,
                options: q.options.filter((_, j) => j !== oIndex)
            } : q)
        }))
    }

    const updateOption = (qIndex: number, oIndex: number, updates: Partial<CreateExamOption>) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === qIndex ? {
                ...q,
                options: q.options.map((o, j) => {
                    if (j === oIndex) return { ...o, ...updates }
                    if (updates.isCorrect && q.type === "MCQ") return { ...o, isCorrect: false }
                    return o
                })
            } : q)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.courseId || !formData.sectionId) {
            toast.error("يرجى ملء جميع الحقول الأساسية")
            return
        }

        if (formData.questions.length === 0) {
            toast.error("يرجى إضافة سؤال واحد على الأقل")
            return
        }

        setIsSubmitting(true)

        try {
            const payload = {
                ...formData,
                questionsCount: formData.questions.length
            }
            const result = await updateExamAction(id, payload)
            if (result.success) {
                toast.success("تم تحديث الامتحان بنجاح")
                router.push(`/exams/${id}`)
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء تحديث الامتحان")
            }
        } catch (error: any) {
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
        addQuestion,
        removeQuestion,
        updateQuestion,
        updateQuestionHeader,
        addOption,
        removeOption,
        updateOption,
        handleSubmit
    }
}
