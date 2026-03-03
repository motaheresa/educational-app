"use client"
import { AdminPageHeader } from '@/features/admin/components/organisms/UpperContentPage'
import { Ticket, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const CouponsHeader = () => {
    const currentPath = usePathname()
    const isCreatePage = currentPath.includes("create")
    const activeTabStyle = "text-primary font-medium border-b-2 border-primary"
    const inactiveTabStyle = "text-muted-foreground hover:text-foreground"

    return (
        <AdminPageHeader
            title="إدارة الكوبونات"
            subtitle="إنشاء وإدارة أكواد الخصم للطلاب وتتبع استخدامها"
            breadcrumbs={[
                { label: "الكوبونات", href: "/coupons" },
                ...(isCreatePage ? [{ label: "إضافة كوبون جديد" }] : [])
            ]}
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Link href={"/coupons"} className={`flex items-center font-amin gap-2 rounded-none px-4 py-3 hover:bg-transparent ${isCreatePage ? inactiveTabStyle : activeTabStyle}`}>
                    <Ticket className="size-4" />
                    الكوبونات الحالية
                </Link>
                <Link href="/coupons/create" className={`flex items-center font-amin gap-2 rounded-none px-4 py-3 hover:bg-transparent ${!isCreatePage ? inactiveTabStyle : activeTabStyle}`}>
                    <Plus className="size-4" />
                    إضافة كوبون جديد
                </Link>
            </div>
        </AdminPageHeader>
    )
}

export default CouponsHeader
