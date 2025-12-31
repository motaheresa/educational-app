import { useState, FormEvent } from "react"
import { toast } from "sonner"
import { createCourseAction } from "@/features/admin/courses/actions"
import { CreateCourseFormData, Section } from "@/features/admin/courses/types/create"

export function useCreateCourse() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<CreateCourseFormData>({
        title: "",
        description: "",
        price: 0,
        grade: "",
        subject: "",
        banner: "",
        sections: [],
    })

    const handleChange = (field: keyof CreateCourseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSectionsChange = (sections: Section[]) => {
        setFormData(prev => ({ ...prev, sections }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await createCourseAction(formData)

            if (result.success) {
                toast.success("تم إنشاء الكورس بنجاح")
                window.location.href = "/courses"
            } else {
                toast.error(result.error || "حدث خطأ أثناء إنشاء الكورس")
            }
        } catch (error) {
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formData,
        isSubmitting,
        handleChange,
        handleSectionsChange,
        handleSubmit,
    }
}
