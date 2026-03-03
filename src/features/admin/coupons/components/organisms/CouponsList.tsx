"use client"

import { Ticket, Percent, Hash, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/molecules/Table"
import { ActionButtons } from "@/components/atoms/ActionButtons"
import { APICoupon } from "../../types"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useCouponsList } from "../../hooks/useCouponsList"
import { ColumnDef } from "@tanstack/react-table"
import { Switch } from "@/components/ui/switch"
import { useToggleCoupon } from "../../hooks/useToggleCoupon"
import { cn } from "@/lib/utils"

interface CouponsListProps {
    data: APICoupon[]
}

const CouponStatusToggle = ({ id, initialStatus }: { id: string, initialStatus: boolean }) => {
    const { isActive, isLoading, toggleStatus } = useToggleCoupon(id, initialStatus)
    return (
        <div className="flex items-center gap-2">
            <Switch
                id={`coupon-status-${id}`}
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

export function CouponsList({ data }: CouponsListProps) {
    const router = useRouter()
    const {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete
    } = useCouponsList()

    const columns: ColumnDef<APICoupon>[] = [
        {
            accessorKey: "code",
            header: "كود الكوبون",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Hash className="size-4 text-primary" />
                    </div>
                    <span className="font-bold text-base tracking-wider text-foreground">{row.original.code}</span>
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "النوع والقيمة",
            cell: ({ row }) => {
                const coupon = row.original
                return (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                            {coupon.type === "PERCENTAGE" ? (
                                <>
                                    <Percent className="size-3.5 text-blue-500" />
                                    <span className="font-bold text-blue-600">{coupon.value}% خصم</span>
                                </>
                            ) : (
                                <>
                                    <Ticket className="size-3.5 text-emerald-500" />
                                    <span className="font-bold text-emerald-600">{coupon.value.toLocaleString()} ج.م خصم</span>
                                </>
                            )}
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium">
                            {coupon.type === "PERCENTAGE" ? "نسبة مئوية" : "مبلغ ثابت"}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "usedCount",
            header: "الاستخدام",
            cell: ({ row }) => {
                const coupon = row.original
                const percentage = (coupon.usedCount / coupon.maxUsage) * 100
                return (
                    <div className="flex flex-col gap-1.5 min-w-[120px]">
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <Users className="size-3" />
                                {coupon.usedCount} / {coupon.maxUsage}
                            </span>
                            <span className="font-bold">{Math.round(percentage)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full rounded-full transition-all duration-500",
                                    percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-amber-500" : "bg-primary"
                                )}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "expiresAt",
            header: "تاريخ الانتهاء",
            cell: ({ row }) => {
                const date = new Date(row.original.expiresAt)
                const isExpired = date < new Date()
                return (
                    <div className="flex flex-col gap-1">
                        <span className={cn(
                            "text-sm font-medium",
                            isExpired ? "text-red-500 line-through opacity-70" : "text-foreground"
                        )}>
                            {date.toLocaleDateString('ar-EG', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                        {isExpired && <span className="text-[10px] text-red-500 font-bold">منتهي الصلاحية</span>}
                    </div>
                )
            },
        },
        {
            accessorKey: "isActive",
            header: "الحالة",
            cell: ({ row }) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <CouponStatusToggle id={row.original.id} initialStatus={row.original.isActive} />
                </div>
            ),
        },
        {
            id: "actions",
            header: "إجراءات",
            cell: ({ row }) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <ActionButtons
                        onView={() => router.push(`/coupons/${row.original.id}`)}
                        onEdit={() => router.push(`/coupons/${row.original.id}/edit`)}
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
                searchKey="code"
                searchPlaceholder="بحث بكود الخصم..."
                totalCount={data.length}
                pageSize={10}
                onRowClick={(row) => router.push(`/coupons/${row.id}`)}
                DataTableHeader={
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">قائمة كوبونات الخصم</h2>
                            <p className="text-sm text-muted-foreground mt-1">إجمالي الكوبونات: {data.length} كوبون</p>
                        </div>
                    </div>
                }
            />

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="حذف الكوبون"
                description="هل أنت متأكد من أنك تريد حذف هذا الكوبون؟ سيتم إلغاء تفعيله ولن يتمكن الطلاب من استخدامه بعد الآن."
                confirmText="حذف الكوبون"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    )
}
