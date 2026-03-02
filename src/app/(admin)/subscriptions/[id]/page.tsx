import { fetchAPI } from "@/lib/api"
import { APISubscriptionDetails, APISubscription } from "@/features/admin/subscriptions/types"
import { ErrorState } from "@/components/feedback/ErrorState"
import { SubscriptionDetailsHeader } from "@/features/admin/subscriptions/components/organisms/SubscriptionDetailsHeader"
import { SubscriptionDetailsContent } from "@/features/admin/subscriptions/components/organisms/SubscriptionDetailsContent"

export default async function SubscriptionDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params

    let subscriptionData: APISubscription | null = null

    try {
        const response = await fetchAPI<APISubscriptionDetails>(`/api/subscriptions/${id}`)

        if (response?.subscription) {
            subscriptionData = response.subscription
        }
    } catch (error: unknown) {
        console.error("Failed to fetch subscription details:", error);
        return (
            <div className="p-6" dir="rtl">
                <ErrorState
                    title="حدث خطأ أثناء تحميل البيانات"
                    message="لا يمكننا الوصول إلى بيانات الاشتراك حالياً. يرجى المحاولة مرة أخرى لاحقاً."
                />
            </div>
        )
    }

    if (!subscriptionData) {
        return (
            <div className="p-6" dir="rtl">
                <ErrorState
                    title="الاشتراك غير موجود"
                    message="عذراً، لم نتمكن من العثور على بيانات هذا الاشتراك."
                />
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl p-8 space-y-8" dir="rtl">
            <SubscriptionDetailsHeader
                id={subscriptionData.id}
                studentName={subscriptionData.student.name}
                courseTitle={subscriptionData.course.title}
            />
            <SubscriptionDetailsContent subscription={subscriptionData} />
        </div>
    )
}
