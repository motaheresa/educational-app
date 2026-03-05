"use client"

import Link from "next/link"
import { ArrowRight, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteDiscountAction } from "../../actions"

interface DiscountDetailsHeaderProps {
    id: string
    name: string
}

export function DiscountDetailsHeader({ id, name }: DiscountDetailsHeaderProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteDiscountAction(id)
            if (result.success) {
                toast.success("تم حذف الخصم بنجاح")
                router.push("/discounts")
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الخصم")
            }
        } catch (error: unknown) {
            console.error("Delete discount error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsDeleting(false)
            setShowDeleteModal(false)
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/discounts">
                    <Button variant="ghost" size="icon">
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">{name}</h1>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Link href={`/discounts/${id}/edit`}>
                    <Button>
                        <Edit className="ml-2 h-4 w-4" />
                        تعديل الخصم
                    </Button>
                </Link>
                <Button
                    variant="destructive"
                    onClick={() => setShowDeleteModal(true)}
                >
                    <Trash2 className="ml-2 h-4 w-4" />
                    حذف الخصم
                </Button>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="حذف الخصم"
                description="هل أنت متأكد من رغبتك في حذف هذا الخصم؟ سيتم إزالته من جميع الكورسات المرتبطة ولن يتمكن الطلاب من استخدامه مجدداً."
                confirmText="حذف الخصم"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    )
}
