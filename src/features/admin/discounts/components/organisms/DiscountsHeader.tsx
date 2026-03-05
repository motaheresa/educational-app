"use client"

import { AdminPageHeader } from "@/features/admin/components/organisms/UpperContentPage"
import { TicketPercent, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const DiscountsHeader = () => {
    const currentPath = usePathname()
    const isCreatePage = currentPath.includes("create")
    const activeTabStyle = "text-primary font-medium border-b-2 border-primary"
    const inactiveTabStyle = "text-muted-foreground hover:text-foreground"

    return (
        <AdminPageHeader
            title="إدارة الخصومات"
            subtitle="إنشاء وإدارة الخصومات والعروض الترويجية للكورسات"
            breadcrumbs={[
                { label: "الخصومات", href: "/discounts" },
                ...(isCreatePage ? [{ label: "إضافة خصم جديد" }] : [])
            ]}
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Link
                    href="/discounts"
                    className={`flex items-center font-amin gap-2 rounded-none px-4 py-3 hover:bg-transparent ${!isCreatePage ? activeTabStyle : inactiveTabStyle}`}
                >
                    <TicketPercent className="size-4" />
                    الخصومات الحالية
                </Link>
                <Link
                    href="/discounts/create"
                    className={`flex items-center font-amin gap-2 rounded-none px-4 py-3 hover:bg-transparent ${isCreatePage ? activeTabStyle : inactiveTabStyle}`}
                >
                    <Plus className="size-4" />
                    إضافة خصم جديد
                </Link>
            </div>
        </AdminPageHeader>
    )
}

export default DiscountsHeader
