import { Suspense } from "react"
import { fetchAPI } from "@/lib/api"
import { APICoupon } from "@/features/admin/coupons/types"
import { CouponDetailsHeader } from "@/features/admin/coupons/components/organisms/CouponDetailsHeader"
import { CouponDetailsContent } from "@/features/admin/coupons/components/organisms/CouponDetailsContent"
import { ErrorState } from "@/components/feedback/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"

export default async function CouponDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params
    let coupon: APICoupon | null = null
    let isError = false

    try {
        coupon = await fetchAPI<APICoupon>(`/api/coupons/${id}`)
    } catch (error) {
        console.error("Failed to fetch coupon details:", error)
        isError = true
    }

    if (isError) {
        return (
            <div className="p-6">
                <ErrorState
                    title="حدث خطأ في تحميل بيانات الكوبون"
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
                    message="عذراً، لم نتمكن من العثور على بيانات هذا الكوبون."
                />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <CouponDetailsHeader
                id={coupon.id}
                code={coupon.code}
                type={coupon.type}
                value={coupon.value}
            />
            <Suspense fallback={<CouponDetailsSkeleton />}>
                <CouponDetailsContent coupon={coupon} />
            </Suspense>
        </div>
    )
}

function CouponDetailsSkeleton() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Skeleton className="h-[400px] w-full rounded-xl lg:col-span-1" />
                <Skeleton className="h-[400px] w-full rounded-xl lg:col-span-2" />
            </div>
        </div>
    )
}
