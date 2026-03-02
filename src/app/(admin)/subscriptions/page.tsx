import React, { Suspense } from 'react'
import { fetchAPI } from "@/lib/api"
import { SubscriptionsPayload, APISubscription } from "@/features/admin/subscriptions/types"
import { SubscriptionsList } from "@/features/admin/subscriptions/components/organisms/SubscriptionsList"
import { LoadingState } from "@/components/feedback/LoadingState"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function SubscriptionsPage() {
    let subscriptions: APISubscription[] = [];

    try {
        // Fetch subscriptions from the backend
        const response = await fetchAPI<SubscriptionsPayload>("/api/subscriptions");

        if (response?.subscriptions) {
            subscriptions = response.subscriptions;
        }

    } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        return <ErrorState message={"خطأ في تحميل بيانات الاشتراكات"} />
    }

    console.log("subscriptions: ", subscriptions);

    return (
        <Suspense fallback={<LoadingState message="جاري تحميل الاشتراكات..." />}>
            <SubscriptionsList data={subscriptions} />
        </Suspense>
    )
}