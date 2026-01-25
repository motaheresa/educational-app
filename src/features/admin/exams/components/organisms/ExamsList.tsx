"use client"

import { FileText, Users, Clock, GraduationCap, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/molecules/Table"
import { StatusBadge } from "@/components/atoms/StatusBadge"
import { ActionButtons } from "@/components/atoms/ActionButtons"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { APIExam } from "../../types"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useExamsList } from "../../hooks/useExamsList"
import { ColumnDef } from "@tanstack/react-table"

interface ExamsListProps {
    data: APIExam[]
}

export function ExamsList({ data }: ExamsListProps) {
    const {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    } = useExamsList()

    const router = useRouter()

    const columns: ColumnDef<APIExam>[] = [
        {
            accessorKey: "title",
            header: "اسم الامتحان",
            cell: ({ row }) => {
                const exam = row.original
                return (
                    <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg bg-primary/10")}>
                            <FileText className="size-5 text-primary" />
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-foreground">{exam.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {exam.section?.title || "بدون قسم"}
                            </p>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "duration",
            header: "المدة (دقيقة)",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-foreground ">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="font-medium">{row.original.duration}</span>
                </div>
            ),
        },
        {
            accessorKey: "totalDegree",
            header: "الدرجة الكلية",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-foreground ">
                    <GraduationCap className="size-4 text-muted-foreground" />
                    <span className="font-bold">{row.original.totalDegree}</span>
                </div>
            ),
        },
        {
            accessorKey: "questionsCount",
            header: "عدد الأسئلة",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-foreground ">
                    <BookOpen className="size-4 text-muted-foreground" />
                    <span className="font-medium">{row.original.questionsCount}</span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "الحالة",
            cell: ({ row }) => {
                const status = row.original.status.toLowerCase()
                let variant: "active" | "inactive" | "soon" = "active"

                if (status === "draft") variant = "soon"
                if (status === "published") variant = "active"

                return <StatusBadge status={variant} />
            },
        },
        {
            id: "actions",
            header: "إجراءات",
            cell: ({ row }) => {
                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <ActionButtons
                            onView={() => router.push(`/exams/${row.original.id}`)}
                            onEdit={() => router.push(`/exams/${row.original.id}/edit`)}
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
                searchKey="title"
                searchPlaceholder="بحث باسم الامتحان..."
                totalCount={data.length}
                pageSize={10}
                onRowClick={(row) => onRowClick(row.id)}
                DataTableHeader={
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">الامتحانات المنشأة</h2>
                            <p className="text-sm text-muted-foreground mt-1">عدد الامتحانات: {data.length} امتحان</p>
                        </div>
                    </div>
                }
            />

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="حذف الامتحان"
                description="هل أنت متأكد من أنك تريد حذف هذا الامتحان؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                variant="destructive"
                isLoading={isDeleting}
            />
        </>
    )
}
