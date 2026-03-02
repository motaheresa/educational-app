import { fetchAPI } from "@/lib/api"
import { APISubscriptionDetails } from "@/features/admin/subscriptions/types"
import { ErrorState } from "@/components/feedback/ErrorState"
import { UpdateSubscriptionForm } from "@/features/admin/subscriptions/components/organisms/UpdateSubscriptionForm"

export default async function EditSubscriptionPage({ params }: { params: { id: string } }) {
    const { id } = await params

    try {
        const response = await fetchAPI<APISubscriptionDetails>(`/api/subscriptions/${id}`)

        if (!response?.subscription) {
            return (
                <div className="p-6" dir="rtl">
                    <ErrorState
                        title="الاشتراك غير موجود"
                        message="عذراً، لم نتمكن من العثور على بيانات هذا الاشتراك لتعديلها."
                    />
                </div>
            )
        }

        return (
            <div className="p-4 md:p-8" dir="rtl">
                <UpdateSubscriptionForm id={id} initialData={response.subscription} />
            </div>
        )
    } catch (error: unknown) {
        console.error("Failed to fetch subscription for editing:", error);
        return (
            <div className="p-6" dir="rtl">
                <ErrorState
                    title="حدث خطأ أثناء تحميل البيانات"
                    message="لا يمكننا الوصول إلى بيانات الاشتراك حالياً. يرجى المحاولة مرة أخرى لاحقاً."
                />
            </div>
        )
    }
}
