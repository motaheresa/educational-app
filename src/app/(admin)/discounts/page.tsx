import React, { Suspense } from 'react'
import { fetchAPI } from "@/lib/api"
import { APIDiscount } from "@/features/admin/discounts/types"
import { DiscountsList } from "@/features/admin/discounts/components/organisms/DiscountsList"
import { LoadingState } from "@/components/feedback/LoadingState"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function DiscountsPage() {
    let discounts: APIDiscount[] = [];

    try {
        const responseData = await fetchAPI<APIDiscount[]>("/api/discounts");

        if (Array.isArray(responseData)) {
            discounts = responseData.sort((a, b) => {
                if (a.isActive === b.isActive) {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
                return a.isActive ? -1 : 1;
            });
        }

    } catch (error) {
        console.error("Failed to fetch discounts:", error);
        return (
            <ErrorState
                title="خطأ في تحميل الخصومات"
                message="عذراً، لم نتمكن من جلب قائمة الخصومات في الوقت الحالي. يرجى المحاولة مرة أخرى."
            />
        )
    }

    return (
        <Suspense fallback={<LoadingState message="جاري تحميل الخصومات..." />}>
            <DiscountsList data={discounts} />
        </Suspense>
    )
}
