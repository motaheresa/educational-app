"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { deleteStudentAction } from "../../actions"

interface StudentsDeleteActionProps {
    studentId: string
}

export function StudentsDeleteAction({ studentId }: StudentsDeleteActionProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteStudentAction(studentId)

            if (result.success) {
                toast.success("تم حذف الطالب بنجاح")
                setIsOpen(false)
                router.push("/students")
                router.refresh()
            } else {
                toast.error(result.error || "حدث خطأ أثناء حذف الطالب")
            }
        } catch (error) {
            console.error("Failed to delete student:", error)
            toast.error("حدث خطأ أثناء حذف الطالب")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Button
                variant="destructive"
                size="icon"
                onClick={() => setIsOpen(true)}
            >
                <Trash2 className="size-4" />
            </Button>

            <ConfirmModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleDelete}
                title="حذف بيانات الطالب"
                description="هل أنت متأكد من أنك تريد حذف هذا الطالب؟ سيتم حذف جميع بياناته ولا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                variant="destructive"
                isLoading={isDeleting}
            />
        </>
    )
}
