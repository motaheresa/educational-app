import { Lesson, Section } from "./create"

export interface UpdateCourseFormData {
    title: string
    description: string
    price: number
    grade: string
    subject: string
    banner: string
    sections: Section[]
}

export interface UpdateCourseFormProps {
    courseId: string
    initialData: UpdateCourseFormData
}
