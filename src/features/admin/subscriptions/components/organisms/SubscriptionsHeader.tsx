"use client"
import { AdminPageHeader } from '@/features/admin/components/organisms/UpperContentPage'
import { CreditCard, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SubscriptionsHeader = () => {
    const currentPath = usePathname()
    const isCreateSubscriptionPage = currentPath.includes("create")
    const activeTabStyle = "text-primary font-medium border-b-2 border-primary"
    const inactiveTabStyle = "text-muted-foreground hover:text-foreground"

    return (
        <AdminPageHeader
            title="إدارة الاشتراكات"
            subtitle="متابعة الاشتراكات النشطة، المدفوعات والطلاب المنضمين حديثاً"
            breadcrumbs={[
                { label: "الاشتراكات", href: "/subscriptions" },
                ...(isCreateSubscriptionPage ? [{ label: "إضافة اشتراك جديد" }] : [])
            ]}
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Link href={"/subscriptions"} className={`flex items-center font-amin gap-2 rounded-none px-4 py-3 hover:bg-transparent ${isCreateSubscriptionPage ? inactiveTabStyle : activeTabStyle}`}>
                    <CreditCard className="size-4" />
                    الاشتراكات الحالية
                </Link>
                <Link href="/subscriptions/create" className={`flex items-center font-amin gap-2 rounded-none px-4 py-3 hover:bg-transparent ${!isCreateSubscriptionPage ? inactiveTabStyle : activeTabStyle}`}>
                    <Plus className="size-4" />
                    إضافة اشتراك جديد
                </Link>
            </div>
        </AdminPageHeader>
    )
}

export default SubscriptionsHeader
