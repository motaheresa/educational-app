import React from 'react'
import SubscriptionsHeader from '@/features/admin/subscriptions/components/organisms/SubscriptionsHeader'

export default function SubscriptionsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-6">
            <SubscriptionsHeader />
            <div className="bg-card rounded-xl border shadow-sm p-6">
                {children}
            </div>
        </div>
    )
}
