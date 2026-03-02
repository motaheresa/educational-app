"use client"

import { Wallet, Landmark, CreditCard as CardIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/molecules/Table"
import { ActionButtons } from "@/components/atoms/ActionButtons"
import { APISubscription } from "../../types"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useSubscriptionsList } from "../../hooks/useSubscriptionsList"
import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface SubscriptionsListProps {
    data: APISubscription[]
}

const getPaymentIcon = (method: string) => {
    switch (method) {
        case "VODAFONE_CASH":
            return <Wallet className="size-4 text-emerald-500" />
        case "BANK_TRANSFER":
            return <Landmark className="size-4 text-blue-500" />
        case "CARD":
            return <CardIcon className="size-4 text-purple-500" />
        default:
            return <Wallet className="size-4 text-muted-foreground" />
    }
}

const getPaymentLabel = (method: string) => {
    switch (method) {
        case "VODAFONE_CASH":
            return "فودافون كاش"
        case "BANK_TRANSFER":
            return "تحويل بنكي"
        case "CARD":
            return "بطاقة دفع"
        case "CASH":
            return "دفع نقدي"
        default:
            return method
    }
}

export function SubscriptionsList({ data }: SubscriptionsListProps) {
    const router = useRouter()
    const {
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        onRowClick
    } = useSubscriptionsList()

    const columns: ColumnDef<APISubscription>[] = [
        {
            id: "studentName",
            accessorKey: "student.name",
            header: "اسم المشترك",
            cell: ({ row }) => {
                const subscription = row.original
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10 border shadow-sm">
                            <AvatarImage src={subscription.student.image} alt={subscription.student.name} />
                            <AvatarFallback>{subscription.student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-right">
                            <p className="font-bold text-foreground">{subscription.student.name}</p>
                            <p className="text-[10px] text-muted-foreground">
                                {new Date(subscription.startedAt).toLocaleDateString('ar-EG', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                )
            },
        },
        {
            id: "courseTitle",
            accessorKey: "course.title",
            header: "الكورس المشترك فيه",
            cell: ({ row }) => (
                <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-none px-2 py-0 h-6 text-[10px] font-medium">
                    {row.original.course.title}
                </Badge>
            ),
        },
        {
            accessorKey: "finalPrice",
            header: "الفلوس اللي دفعها",
            cell: ({ row }) => (
                <div className="font-bold text-foreground">
                    {row.original.finalPrice.toLocaleString()} ج.م
                </div>
            ),
        },
        {
            accessorKey: "paymentMethod",
            header: "طريقة الدفع",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-foreground text-xs font-medium">
                    {getPaymentIcon(row.original.paymentMethod)}
                    <span>{getPaymentLabel(row.original.paymentMethod)}</span>
                </div>
            ),
        },
        {
            id: "studentPhone",
            accessorKey: "student.phone",
            header: "رقم الهاتف",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-foreground">
                    <span className="font-medium text-xs text-muted-foreground" dir="ltr">{row.original.student.phone}</span>
                </div>
            ),
        },
        {
            id: "actions",
            header: "إجراءات",
            cell: ({ row }) => {
                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <ActionButtons
                            onView={() => router.push(`/subscriptions/${row.original.id}`)}
                            onEdit={() => router.push(`/subscriptions/${row.original.id}/edit`)}
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
                searchKey="studentName"
                searchPlaceholder="بحث باسم المشترك..."
                totalCount={data.length}
                pageSize={10}
                onRowClick={(row) => onRowClick(row.id)}
                DataTableHeader={
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">الاشتراكات الحالية</h2>
                            <p className="text-sm text-muted-foreground mt-1">عدد الاشتراكات: {data.length} اشتراك</p>
                        </div>
                    </div>
                }
            />

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="حذف الاشتراك"
                description="هل أنت متأكد من أنك تريد حذف هذا الاشتراك؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                variant="destructive"
                isLoading={isDeleting}
            />
        </>
    )
}
