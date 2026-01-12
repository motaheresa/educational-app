import React from 'react'
import StudentsHeader from '@/features/admin/students/components/organisms/StudentsHeader'
import { StudentsList } from '@/features/admin/students/components/organisms/StudentsList'
import { UIStudent } from '@/features/admin/students/types'

const mockStudents: UIStudent[] = [
    {
        id: "1",
        name: "عمر خالد",
        email: "student@email.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
        phone: "+20 123 456 7890",
        enrolledCourses: ["الرياضيات", "الفيزياء"],
        registrationDate: "10 أكتوبر 2023",
        status: "active"
    },
    {
        id: "2",
        name: "سارة محمد",
        email: "sara.m@email.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
        phone: "+20 100 987 6543",
        enrolledCourses: ["الفيزياء 101"],
        registrationDate: "15 سبتمبر 2023",
        status: "blocked" // Placeholder for high-risk / restricted
    },
    {
        id: "3",
        name: "كريم أحمد",
        email: "karim.dev@email.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
        phone: "+20 112 334 5566",
        enrolledCourses: ["الكيمياء", "الرياضيات", "أحياء"],
        registrationDate: "1 أغسطس 2023",
        status: "active"
    },
    {
        id: "4",
        name: "يوسف علي",
        email: "yousef@email.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yousef",
        phone: "+20 155 777 8888",
        enrolledCourses: ["الكيمياء"],
        registrationDate: "20 أكتوبر 2023",
        status: "inactive"
    },
    {
        id: "5",
        name: "منى سعيد",
        email: "mona.s@email.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mona",
        phone: "+20 102 345 6789",
        enrolledCourses: ["اللغة العربية"],
        registrationDate: "5 نوفمبر 2023",
        status: "active"
    }
]

const StudentsPage = () => {
    return (
        <StudentsList data={mockStudents} />
    )
}

export default StudentsPage
