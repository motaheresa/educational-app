"use client"

import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/features/admin/components/molecules/PageTitle"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteSubscriptionAction } from "../../actions"

interface SubscriptionDetailsHeaderProps {
    id: string
    studentName: string
    courseTitle: string
}

export function SubscriptionDetailsHeader({ id, studentName, courseTitle }: SubscriptionDetailsHeaderProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteSubscriptionAction(id)
            if (result.success) {
                toast.success("تم حذف الاشتراك بنجاح")
                router.push("/subscriptions")
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الاشتراك")
            }
        } catch (error: unknown) {
            console.error("Delete subscription error:", error)
            toast.error("حدث خطأ غير متوقع")
        } finally {
            setIsDeleting(false)
            setShowDeleteModal(false)
        }
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8" dir="rtl">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-amin!">
                    <Link href="/subscriptions" className="hover:text-primary transition-colors">
                        الاشتراكات
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{studentName}</span>
                </div>
                <PageHeader
                    title={`اشتراك: ${studentName}`}
                    subtitle={`الكورس: ${courseTitle}`}
                    className="mb-0"
                />
            </div>
            <div className="flex items-center gap-3 mt-auto pb-2">
                <Link href={`/subscriptions/${id}/edit`}>
                    <Button variant="outline" className="gap-2">
                        <Edit className="size-4" />
                        تعديل الاشتراك
                    </Button>
                </Link>
                <Button
                    variant="destructive"
                    className="gap-2"
                    onClick={() => setShowDeleteModal(true)}
                >
                    <Trash2 className="size-4" />
                    حذف الاشتراك
                </Button>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="حذف الاشتراك"
                description="هل أنت متأكد من رغبتك في حذف هذا الاشتراك؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    )
}
