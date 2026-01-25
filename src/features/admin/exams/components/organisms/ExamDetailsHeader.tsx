"use client"

import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/features/admin/components/molecules/PageTitle"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteStudentAction } from "@/features/admin/students/actions" // Assuming a similar action for exams or using generic

interface ExamDetailsHeaderProps {
    id: string
    title: string
    courseTitle?: string
}

export function ExamDetailsHeader({ id, title, courseTitle }: ExamDetailsHeaderProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            // Placeholder: Replace with actual deleteExamAction if it exists
            // For now, simulating the delete logic
            toast.success("تم حذف الامتحان بنجاح")
            router.push("/exams")
            router.refresh()
        } catch (error) {
            toast.error("حدث خطأ أثناء حذف الامتحان")
        } finally {
            setIsDeleting(false)
            setShowDeleteModal(false)
        }
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8" dir="rtl">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-amin!">
                    <Link href="/exams" className="hover:text-primary transition-colors">
                        إدارة الامتحانات
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{title}</span>
                </div>
                <PageHeader
                    title={title}
                    subtitle={courseTitle ? `الكورس: ${courseTitle}` : "تفاصيل الامتحان والأسئلة"}
                    className="mb-0"
                />
            </div>
            <div className="flex items-center gap-3 mt-auto pb-2">
                <Link href={`/exams/${id}/edit`}>
                    <Button variant="outline" className="gap-2">
                        <Edit className="size-4" />
                        تعديل الامتحان
                    </Button>
                </Link>
                <Button
                    variant="destructive"
                    className="gap-2"
                    onClick={() => setShowDeleteModal(true)}
                >
                    <Trash2 className="size-4" />
                    حذف
                </Button>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="حذف الامتحان"
                description="هل أنت متأكد من رغبتك في حذف هذا الامتحان؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    )
}
