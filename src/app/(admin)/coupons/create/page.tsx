import { CouponForm } from "@/features/admin/coupons/components/organisms/CouponForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "إنشاء كوبون جديد",
    description: "أضف كوبون خصم جديد لطلابك وقم بإعداد قيمته وشروط استخدامه",
}

export default function CreateCouponPage() {
    return (
        <CouponForm />
    )
}
