"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteCourseAction } from "@/features/admin/courses/actions"

export function useCoursesList() {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return

        setIsDeleting(true)

        toast.promise(deleteCourseAction(deleteId), {
            loading: 'جاري حذف الكورس...',
            success: (data) => {
                console.log("From Success", data);
                if (data.success) {
                    setDeleteId(null)
                    // We don't need router.refresh() here heavily if the action revalidates path, 
                    // but keeping it ensures client view is synced if revalidatePath is subtle.
                    // Ideally revalidatePath on server updates the cache, next navigation sees it.
                    // For immediate list update without full reload, router.refresh() is good.
                    return 'تم حذف الكورس بنجاح'
                } else {
                    throw new Error(data.error)
                }
            },
            error: (err) => {
                console.log("From err", err);
                return err.message || 'حدث خطأ أثناء حذف الكورس'
            },
            finally: () => setIsDeleting(false)
        })
    }

    const onRowClick = (id: string) => {
        router.push(`/courses/${id}`)
    }

    return {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    }
}
