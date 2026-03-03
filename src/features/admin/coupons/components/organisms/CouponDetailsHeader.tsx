"use client"

import Link from "next/link"
import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/features/admin/components/molecules/PageTitle"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteCouponAction } from "../../actions"

interface CouponDetailsHeaderProps {
    id: string
    code: string
    type: string
    value: number
}

export function CouponDetailsHeader({ id, code, type, value }: CouponDetailsHeaderProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteCouponAction(id)
            if (result.success) {
                toast.success("تم حذف الكوبون بنجاح")
                router.push("/coupons")
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الكوبون")
            }
        } catch (error: unknown) {
            console.error("Delete coupon error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsDeleting(false)
            setShowDeleteModal(false)
        }
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8" dir="rtl">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/coupons" className="hover:text-primary transition-colors">
                        الكوبونات
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{code}</span>
                </div>
                <PageHeader
                    title={`كوبون: ${code}`}
                    subtitle={`${type === "PERCENTAGE" ? "نسبة مئوية" : "مبلغ ثابت"}: ${value}${type === "PERCENTAGE" ? "%" : " ج.م"}`}
                    className="mb-0"
                />
            </div>
            <div className="flex items-center gap-3 mt-auto pb-2">
                <Link href={`/coupons/${id}/edit`}>
                    <Button variant="outline" className="gap-2 border-2 font-bold">
                        <Edit className="size-4" />
                        تعديل الكوبون
                    </Button>
                </Link>
                <Button
                    variant="destructive"
                    className="gap-2 font-bold"
                    onClick={() => setShowDeleteModal(true)}
                >
                    <Trash2 className="size-4" />
                    حذف الكوبون
                </Button>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="حذف الكوبون"
                description="هل أنت متأكد من رغبتك في حذف هذا الكوبون؟ لا يمكن للطلاب استخدامه بعد الحذف."
                confirmText="حذف الكوبون"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    )
}
