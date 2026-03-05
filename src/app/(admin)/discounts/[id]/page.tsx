import { fetchAPI } from "@/lib/api"
import { APIDiscount } from "@/features/admin/discounts/types"
import { ErrorState } from "@/components/feedback/ErrorState"
import { DiscountDetailsHeader } from "@/features/admin/discounts/components/organisms/DiscountDetailsHeader"
import { DiscountDetailsContent } from "@/features/admin/discounts/components/organisms/DiscountDetailsContent"

import { Separator } from "@/components/ui/separator"

export default async function DiscountDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params

    let discountData: APIDiscount | null = null
    let isError = false

    try {
        const response = await fetchAPI<APIDiscount>(`/api/discounts/${id}`)
        if (response && typeof response === 'object' && 'id' in response) {
            discountData = response
        }
    } catch (error: unknown) {
        console.error("Failed to fetch discount details:", error);
        isError = true
    }

    if (isError) {
        return (
            <div className="p-6">
                <ErrorState
                    title="حدث خطأ في تحميل بيانات الخصم"
                    message="عذراً، لم نتمكن من الوصول إلى بيانات الخصم في الوقت الحالي. يرجى المحاولة مرة أخرى."
                />
            </div>
        )
    }

    if (!discountData) {
        return (
            <div className="p-6">
                <ErrorState
                    title="الخصم غير موجود"
                    message="عذراً، لم نتمكن من العثور على بيانات هذا الخصم في النظام."
                />
            </div>
        )
    }

    return (
        <div className="container space-y-6 p-6" dir="rtl">
            <DiscountDetailsHeader
                id={discountData.id}
                name={discountData.name}
            />
            <Separator />
            <DiscountDetailsContent discount={discountData} />
        </div>
    )
}

