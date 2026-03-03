import { fetchAPI } from "@/lib/api"
import { APICoupon } from "@/features/admin/coupons/types"
import { UpdateCouponForm } from "@/features/admin/coupons/components/organisms/UpdateCouponForm"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function EditCouponPage({ params }: { params: { id: string } }) {
    const { id } = await params
    let coupon: APICoupon | null = null
    let isError = false

    try {
        coupon = await fetchAPI<APICoupon>(`/api/coupons/${id}`)
    } catch (error) {
        console.error("Failed to fetch coupon for editing:", error)
        isError = true
    }

    if (isError) {
        return (
            <div className="p-6">
                <ErrorState
                    title="حدث خطأ في تحميل الكوبون"
                    message="عذراً، لم نتمكن من جلب بيانات الكوبون في الوقت الحالي. يرجى المحاولة مرة أخرى."
                />
            </div>
        )
    }

    if (!coupon) {
        return (
            <div className="p-6">
                <ErrorState
                    title="الكوبون غير موجود"
                    message="عذراً، لم نتمكن من العثور على بيانات هذا الكوبون لتعديله."
                />
            </div>
        )
    }

    return (
        <UpdateCouponForm coupon={coupon} />
    )
}
