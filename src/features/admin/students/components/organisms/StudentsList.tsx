"use client"

import { Users, Phone, Calendar, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/molecules/Table"
import { StatusBadge } from "@/components/atoms/StatusBadge"
import { ActionButtons } from "@/components/atoms/ActionButtons"
import { cn } from "@/lib/utils"
import { UIStudent } from "@/features/admin/students/types"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useStudentsList } from "@/features/admin/students/hooks/useStudentsList"
import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface StudentsListProps {
    data: UIStudent[]
}

export function StudentsList({ data }: StudentsListProps) {
    const {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    } = useStudentsList()

    const columns: ColumnDef<UIStudent>[] = [
        {
            accessorKey: "name",
            header: "الطالب",
            cell: ({ row }) => {
                const student = row.original
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10 border">
                            <AvatarImage src={student.image} alt={student.name} />
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-right">
                            <p className="font-semibold text-foreground">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "phone",
            header: "رقم الهاتف",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-foreground">
                    <Phone className="size-4 text-muted-foreground" />
                    <span className="font-medium" dir="ltr">{row.original.phone}</span>
                </div>
            ),
        },
        {
            accessorKey: "courses",
            header: "الكورسات المشترك بها",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {row.original.courses.map((course, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-none px-2 py-0 h-6 text-[10px]">
                            {course}
                        </Badge>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "تاريخ التسجيل",
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
                return (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="size-4" />
                        <span className="text-xs">{date}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: "الحالة",
            cell: ({ row }) => {
                const rawStatus = row.original.status as string;
                // Normalize status to lowercase for UI mapping
                const status = rawStatus.toLowerCase();

                let variant: "active" | "inactive" | "soon" = "active";
                if (status === "blocked") variant = "inactive";
                if (status === "inactive") variant = "soon";

                return <StatusBadge status={variant} className={cn(status === "blocked" && "bg-red-100 text-red-700")} />
            },
        },
        {
            id: "actions",
            header: "إجراءات",
            cell: ({ row }) => {
                const router = useRouter()
                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <ActionButtons
                            onView={() => router.push(`/students/${row.original.id}`)}
                            onEdit={() => router.push(`/students/${row.original.id}/edit`)}
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
                searchPlaceholder="بحث بالاسم أو البريد..."
                totalCount={data.length}
                pageSize={10}
                onRowClick={(row) => onRowClick(row.id)}
                DataTableHeader={<div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">قائمة الطلاب</h2>
                        <p className="text-sm text-muted-foreground mt-1">عدد الطلاب: {data.length} طالب</p>
                    </div>
                </div>}
            />

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
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
