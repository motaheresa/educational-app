"use client"

import { Button } from '@/components/ui/button'
import { AdminPageHeader } from '@/features/admin/components/organisms/UpperContentPage'
import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function ExamsHeader() {
    const currentPath = usePathname()
    const isCreatePage = currentPath.includes("create")
    const activeTabStyle = "text-primary font-medium border-b-2 border-primary"
    const inactiveTabStyle = "text-muted-foreground hover:text-foreground"

    return (
        <AdminPageHeader
            title="إدارة الامتحانات"
            subtitle="عرض وإدارة الامتحانات الرسمية ومتابعة أداء ودرجات الطلاب"
            breadcrumbs={[
                { label: "الامتحانات", href: "/exams" },
                ...(isCreatePage ? [{ label: "إنشاء امتحان جديد" }] : [])
            ]}
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Link href={"/exams"} className={`flex items-center font-amin gap-2 rounded-none px-4 py-2 hover:bg-transparent ${!isCreatePage ? activeTabStyle : inactiveTabStyle}`}>
                    <FileText className="size-4" />
                    إدارة الامتحانات
                </Link>
                <Link href="/exams/create" className={`flex items-center font-amin gap-2 rounded-none px-4 py-2 hover:bg-transparent ${isCreatePage ? activeTabStyle : inactiveTabStyle}`}>
                    <Plus className="size-4" />
                    إنشاء امتحان جديد
                </Link>
            </div>
        </AdminPageHeader>
    )
}
