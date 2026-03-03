import { Suspense } from "react"
import { fetchAPI } from "@/lib/api"
import { APICoupon } from "@/features/admin/coupons/types"
import { CouponsList } from "@/features/admin/coupons/components/organisms/CouponsList"
import { ErrorState } from "@/components/feedback/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"

export default async function CouponsPage() {
    let coupons: APICoupon[] = []
    let isError = false

    try {
        const response = await fetchAPI<APICoupon[]>("/api/coupons")

        if (Array.isArray(response)) {
            coupons = response
        } else if (response && typeof response === 'object' && 'coupons' in response) {
            // @ts-ignore
            coupons = response.coupons
        }
    } catch (error) {
        console.error("Failed to fetch coupons:", error)
        isError = true
    }

    if (isError) {
        return (
            <div className="p-6">
                <ErrorState
                    title="حدث خطأ في تحميل الكوبونات"
                    message="عذراً، لم نتمكن من جلب قائمة الكوبونات في الوقت الحالي. يرجى المحاولة مرة أخرى."
                />
            </div>
        )
    }

    return (
        <Suspense fallback={<CouponsSkeleton />}>
            <CouponsList data={coupons} />
        </Suspense>
    )
}

function CouponsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
    )
}
