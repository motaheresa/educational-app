"use client"
import { BookOpen, Users, TvMinimalPlay } from "lucide-react" // Re-added deleted imports
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/molecules/Table"
import { StatusBadge } from "@/components/atoms/StatusBadge"
import { ActionButtons } from "@/components/atoms/ActionButtons"
import { cn } from "@/lib/utils"
import { UICourse } from "@/features/admin/courses/types"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { deleteCourseAction } from "@/features/admin/courses/actions"
import { toast } from "sonner"
import { ColumnDef } from "@tanstack/react-table"
import { useCoursesList } from "@/features/admin/courses/hooks/useCoursesList"

interface CoursesListProps {
    data: UICourse[]
}

export function CoursesList({ data }: CoursesListProps) {
    const {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    } = useCoursesList()

    // Reconstruct columns to access setDeleteId
    const columns: ColumnDef<UICourse>[] = [
        {
            accessorKey: "name",
            header: "الكورس",
            cell: ({ row }) => {
                const course = row.original
                return (
                    <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg", course.iconBg || "bg-primary/5")}>
                            <BookOpen className="size-5 text-primary" />
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-foreground">{course.name}</p>
                            <p className="text-xs text-muted-foreground">{course.description}</p>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "subscriberCount",
            header: "الطلاب المشتركين",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-foreground">
                    <Users className="size-4" />
                    <p><span className="font-semibold ">{row.original.subscriberCount.toLocaleString("ar-EG")}</span> طالب</p>
                </div>
            ),
        },
        {
            accessorKey: "videoCount",
            header: "عدد الفيديوهات",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-foreground">
                    <TvMinimalPlay size={15} />
                    <p><span className="font-semibold ">{row.original.videoCount}</span> فيديو</p>
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: "السعر",
            cell: ({ row }) => (
                <p className="font-medium text-foreground">
                    <span className="font-semibold ">{row.original.price}</span> ج.م
                </p>
            ),
        },
        {
            accessorKey: "status",
            header: "الحالة",
            cell: ({ row }) => <StatusBadge status={row.original.status || "active"} />,
        },
        {
            id: "actions",
            header: "إجراءات",
            cell: ({ row }) => {
                const router = useRouter()
                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <ActionButtons
                            onView={() => router.push(`/courses/${row.original.id}`)}
                            onEdit={() => router.push(`/courses/${row.original.id}/edit`)}
                            onDelete={() => setDeleteId(row.original.id)}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                searchKey="name"
                searchPlaceholder="بحث باسم الكورس..."
                totalCount={data.length}
                pageSize={10}
                onRowClick={(row) => onRowClick(row.id)}
                DataTableHeader={<div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-sem text-foreground">الكورسات المتاحة</h2>
                        <p className="text-sm text-muted-foreground mt-1">عدد الكورسات: {data.length} كورس</p>
                    </div>
                </div>}
            />

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="حذف الكورس"
                description="هل أنت متأكد من أنك تريد حذف هذا الكورس؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                variant="destructive"
                isLoading={isDeleting}
            />
        </>
    )
}
