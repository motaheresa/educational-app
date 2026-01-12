import React from 'react'
import { ExamsHeader } from '@/features/admin/exams/components/organisms/ExamsHeader'

export default function ExamsLayout({
    children,
    modal
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-6">
            <ExamsHeader />
            <div className="bg-card rounded-xl border shadow-sm p-6">
                {children}
            </div>
            {modal}
        </div>
    )
}
