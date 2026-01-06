import { useState, FormEvent, useEffect } from "react"
import { toast } from "sonner"
import { updateCourseAction } from "@/features/admin/courses/actions"
import { UpdateCourseFormData } from "@/features/admin/courses/types/update"
import { Section } from "@/features/admin/courses/types/create"

function getChangedFields(initial: UpdateCourseFormData, current: UpdateCourseFormData): Partial<UpdateCourseFormData> {
    const changes: Partial<UpdateCourseFormData> = {}

    // Compare each field
    if (initial.title !== current.title) changes.title = current.title
    if (initial.description !== current.description) changes.description = current.description
    if (initial.price !== current.price) changes.price = current.price
    if (initial.grade !== current.grade) changes.grade = current.grade
    if (initial.subject !== current.subject) changes.subject = current.subject
    if (initial.banner !== current.banner) changes.banner = current.banner

    // Deep compare sections 🔌
    if (JSON.stringify(initial.sections) !== JSON.stringify(current.sections)) {
        changes.sections = current.sections
    }

    return changes
}

export function useUpdateCourse(courseId: string, initialData: UpdateCourseFormData) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<UpdateCourseFormData>(initialData)

    useEffect(() => {
        setFormData(initialData)
    }, [initialData])

    const handleChange = (field: keyof UpdateCourseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSectionsChange = (sections: Section[]) => {
        setFormData(prev => ({ ...prev, sections }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Get only changed fields
            const changedFields = getChangedFields(initialData, formData)

            // Check if there are any changes
            if (Object.keys(changedFields).length === 0) {
                toast.info("لا توجد تغييرات لحفظها")
                setIsSubmitting(false)
                return
            }

            console.log("Sending only changed fields:", changedFields)

            const result = await updateCourseAction(courseId, changedFields)

            if (result.success) {
                toast.success("تم تحديث الكورس بنجاح")
                window.location.href = "/courses"
            } else {
                toast.error(result.error || "حدث خطأ أثناء تحديث الكورس")
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
