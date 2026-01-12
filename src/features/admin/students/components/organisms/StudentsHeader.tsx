"use client"
import { Button } from '@/components/ui/button'
import { AdminPageHeader } from '@/features/admin/components/organisms/UpperContentPage'
import { Users, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const StudentsHeader = () => {
    const currentPath = usePathname()
    const isCreateStudentPage = currentPath.includes("create")
    const activeTabStyle = "text-primary font-medium border-b-2 border-primary"
    const inactiveTabStyle = "text-muted-foreground hover:text-foreground"

    return (
        <AdminPageHeader
            title="إدارة الطلاب"
            subtitle="عرض وإدارة بيانات الطلاب المسجلين في المنصة"
            breadcrumbs={[
                { label: "الطلاب", href: "/students" },
                ...(isCreateStudentPage ? [{ label: "إضافة طالب جديد" }] : [])
            ]}
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Link href={"/students"} className={`flex items-center font-amin gap-2  rounded-none px-4 py-2 hover:bg-transparent ${isCreateStudentPage ? inactiveTabStyle : activeTabStyle}`}>
                    <Users className="size-4" />
                    إدارة الطلاب
                </Link>
                <Link href="/students/create" className={`flex items-center font-amin gap-2 rounded-none px-4 py-2 hover:bg-transparent ${!isCreateStudentPage ? inactiveTabStyle : activeTabStyle}`}>
                    <UserPlus className="size-4" />
                    إضافة طالب جديد
                </Link>
            </div>
        </AdminPageHeader>
    )
}

export default StudentsHeader
