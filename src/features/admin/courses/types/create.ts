export interface Lesson {
    id: string
    title: string
    type: "VIDEO" | "FILE"
    order: number
}

export interface Section {
    id: string
    title: string
    description: string
    order: number
    lessons: Lesson[]
}

export interface CreateCourseFormData {
    title: string
    description: string
    price: number
    grade: string
    subject: string
    banner: string
    sections: Section[]
}

export interface CreateCourseFormProps {
    onSubmit: (data: CreateCourseFormData) => Promise<void>
    isSubmitting: boolean
}
