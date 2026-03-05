"use client"

import DiscountsHeader from "@/features/admin/discounts/components/organisms/DiscountsHeader"
import { ReactNode } from "react"

export default function DiscountsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-6">
            <DiscountsHeader />
            <div className="bg-card rounded-xl border shadow-sm p-6 overflow-hidden">
                {children}
            </div>
        </div>
    )
}
