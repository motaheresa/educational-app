"use client"

import { Percent, Banknote, Clock, Users, Hash, TicketPercent } from "lucide-react"
import { DataTable } from "@/components/molecules/Table"
import { ActionButtons } from "@/components/atoms/ActionButtons"
import { APIDiscount } from "../../types"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useDiscountsList } from "../../hooks/useDiscountsList"
import { ColumnDef } from "@tanstack/react-table"
import { Switch } from "@/components/ui/switch"
import { useToggleDiscount } from "../../hooks/useToggleDiscount"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface DiscountsListProps {
    data: APIDiscount[]
}

const DiscountStatusToggle = ({ id, initialStatus }: { id: string, initialStatus: boolean }) => {
    const { isActive, isLoading, toggleStatus } = useToggleDiscount(id, initialStatus)
    return (
        <div className="flex items-center gap-2">
            <Switch
                id={`discount-status-${id}`}
                checked={isActive}
                onCheckedChange={toggleStatus}
                disabled={isLoading}
            />
            <span className={cn(
                "text-xs font-bold",
                isActive ? "text-emerald-600" : "text-slate-400"
            )}>
                {isActive ? "مفعل" : "معطل"}
            </span>
        </div>
    )
}

export function DiscountsList({ data }: DiscountsListProps) {
    const router = useRouter()
    const {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    } = useDiscountsList()

    const columns: ColumnDef<APIDiscount>[] = [
        {
            accessorKey: "name",
            header: "اسم الخصم",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                        <TicketPercent className="size-4 text-primary" />
                    </div>
                    <span className="font-bold text-sm text-foreground">{row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "النوع",
            cell: ({ row }) => (
                <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {row.original.type === "PERCENTAGE" ? "نسبة مئوية" : "مبلغ ثابت"}
                </span>
            ),
        },
        {
            accessorKey: "value",
            header: "قيمة الخصم",
            cell: ({ row }) => {
                const discount = row.original
                const isPercentage = discount.type === "PERCENTAGE";
                return (
                    <div className="flex items-center gap-1.5 font-bold">
                        {isPercentage ? (
                            <Percent className="size-3.5 text-blue-500" />
                        ) : (
                            <Banknote className="size-3.5 text-emerald-500" />
                        )}
                        <span className={cn(isPercentage ? "text-blue-600" : "text-emerald-600")}>
                            {discount.value.toLocaleString()} {isPercentage ? "%" : "ج.م"}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "appliesTo",
            header: "تطبق على",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "size-2 rounded-full",
                        row.original.appliesTo === "ALL" ? "bg-amber-500" : "bg-primary"
                    )} />
                    <span className="text-xs font-bold">
                        {row.original.appliesTo === "ALL" ? "جميع الكورسات" : "كورسات محددة"}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "startDate",
            header: "تاريخ البدء",
            cell: ({ row }) => {
                const date = new Date(row.original.startDate);
                return (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Clock className="size-3.5" />
                        <span>{date.toLocaleDateString('ar-EG')}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "endDate",
            header: "تاريخ الانتهاء",
            cell: ({ row }) => {
                const date = new Date(row.original.endDate);
                const isExpired = date < new Date();
                return (
                    <div className="flex flex-col gap-1">
                        <span className={cn(
                            "text-xs font-bold",
                            isExpired ? "text-red-500 opacity-70" : "text-foreground"
                        )}>
                            {date.toLocaleDateString('ar-EG')}
                        </span>
                        {isExpired && <span className="text-[10px] text-red-500 font-black">منتهي</span>}
                    </div>
                )
            },
        },
        {
            accessorKey: "isActive",
            header: "الحالة",
            cell: ({ row }) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <DiscountStatusToggle id={row.original.id} initialStatus={row.original.isActive} />
                </div>
            ),
        },
        {
            id: "usage",
            header: "الاستخدام",
            cell: ({ row }) => {
                const discount = row.original
                if (!discount.maxStudents) {
                    return <span className="text-[10px] text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-full font-bold">مفتوح ({discount.usedCount})</span>
                }
                const percentage = (discount.usedCount / discount.maxStudents) * 100
                return (
                    <div className="flex flex-col gap-1.5 min-w-[100px]">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                            <span>{discount.usedCount}/{discount.maxStudents}</span>
                            <span>{Math.round(percentage)}%</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full rounded-full transition-all duration-500",
                                    percentage > 90 ? "bg-red-500" : "bg-primary"
                                )}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>
                    </div>
                )
            },
        },
        {
            id: "actions",
            header: "إجراءات",
            cell: ({ row }) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <ActionButtons
                        onView={() => router.push(`/discounts/${row.original.id}`)}
                        onEdit={() => router.push(`/discounts/${row.original.id}/edit`)}
                        onDelete={() => setDeleteId(row.original.id)}
                    />
                </div>
            ),
        },
    ]

    return (
        <div dir="rtl">
            <DataTable
                columns={columns}
                data={data}
                searchKey="name"
                searchPlaceholder="بحث باسم الخصم..."
                totalCount={data.length}
                pageSize={10}
                onRowClick={(row) => onRowClick(row.id)}
                DataTableHeader={
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">قائمة الخصومات والعروض</h2>
                            <p className="text-sm text-muted-foreground mt-1">إجمالي العروض: {data.length} عرض</p>
                        </div>
                    </div>
                }
            />

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="حذف الخصم"
                description="هل أنت متأكد من حذف هذا الخصم؟ سيتم إزالته من جميع الكورسات المرتبطة ولن يتمكن الطلاب من الاستفادة منه."
                confirmText="حذف الخصم"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    )
}
