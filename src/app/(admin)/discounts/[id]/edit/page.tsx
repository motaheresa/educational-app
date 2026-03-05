import { fetchAPI } from "@/lib/api"
import { APIDiscount } from "@/features/admin/discounts/types"
import { APICourse } from "@/features/admin/courses/types"
import { UpdateDiscountForm } from "@/features/admin/discounts/components/organisms/UpdateDiscountForm"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function EditDiscountPage({ params }: { params: { id: string } }) {
    const { id } = await params
    let discount: APIDiscount | null = null
    let courses: APICourse[] = []
    let isError = false

    try {
        const [discountRes, coursesRes] = await Promise.all([
            fetchAPI<APIDiscount>(`/api/discounts/${id}`),
            fetchAPI<{ data: APICourse[] }>("/api/courses")
        ])

        // Handle varied proxy wrappers
        if (discountRes && typeof discountRes === 'object' && 'id' in discountRes) {
            discount = discountRes;
        }

        if (coursesRes.data) {
            courses = coursesRes.data
        } else if (Array.isArray(coursesRes)) {
            courses = coursesRes
        }
    } catch (error) {
        console.error("Failed to fetch discount for editing:", error)
        isError = true
    }

    if (isError) {
        return (
            <div className="p-6">
                <ErrorState
                    title="حدث خطأ في تحميل بيانات الخصم"
                    message="عذراً، لم نتمكن من جلب بيانات الخصم في الوقت الحالي. يرجى المحاولة مرة أخرى."
                />
            </div>
        )
    }

    if (!discount) {
        return (
            <div className="p-6">
                <ErrorState
                    title="الخصم غير موجود"
                    message="عذراً، لم نتمكن من العثور على بيانات هذا الخصم لتعديله."
                />
            </div>
        )
    }

    return (
        <div className="p-6" dir="rtl">
            <UpdateDiscountForm discount={discount} courses={courses} />
        </div>
    )
}
