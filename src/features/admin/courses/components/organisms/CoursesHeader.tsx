"use client"

import { Button } from '@/components/ui/button'
import { AdminPageHeader } from '@/features/admin/components/organisms/UpperContentPage'
import { BookOpen, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function CoursesHeader() {
    const currentPath = usePathname()
    const isCreatePage = currentPath.includes("create")
    const activeTabStyle = "text-primary font-medium border-b-2 border-primary"
    const inactiveTabStyle = "text-muted-foreground hover:text-foreground"

    return (
        <AdminPageHeader
            title="إدارة الكورسات"
            subtitle="عرض وإدارة الكورسات التعليمية والمحتوى المتاح للطلاب"
            breadcrumbs={[
                { label: "إدارة الكورسات", href: "/courses" },
                ...(isCreatePage ? [{ label: "إنشاء كورس جديد" }] : [])
            ]}
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Link href={"/courses"} className={`flex items-center font-amin gap-2 rounded-none px-4 py-2 hover:bg-transparent ${!isCreatePage ? activeTabStyle : inactiveTabStyle}`}>
                    <BookOpen className="size-4" />
                    إدارة الكورسات
                </Link>
                <Link href="/courses/create" className={`flex items-center font-amin gap-2 rounded-none px-4 py-2 hover:bg-transparent ${isCreatePage ? activeTabStyle : inactiveTabStyle}`}>
                    <Plus className="size-4" />
                    إنشاء كورس جديد
                </Link>
            </div>
        </AdminPageHeader>
    )
}
