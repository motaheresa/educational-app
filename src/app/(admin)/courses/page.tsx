"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import {
    Calculator,
    Atom,
    FlaskConical,
    BookOpen,
    Languages,
    Plus,
    Download,
    Users,
    Play,
    TvMinimalPlay
} from "lucide-react"

import { DataTable } from "@/components/molecules/Table"
import { PageHeader } from "@/features/admin/components/molecules/PageHeader"
import { StatusBadge, type StatusVariant } from "@/components/atoms/StatusBadge"
import { ActionButtons } from "@/components/atoms/ActionButtons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CoursesTeacherPageHeader from "@/features/admin/courses/components/TableHeader"

// Course data type
interface Course {
    id: string
    name: string
    description: string
    icon: React.ReactNode
    iconBg: string
    subscriberCount: number
    videoCount: number
    price: number
    status: StatusVariant
}

// Mock data matching the design
const coursesData: Course[] = Array.from({ length: 56 }, (_, i) => ({
    id: (i + 51).toString(),
    name: `مقرر إضافي رقم ${i + 51}`,
    description: i % 3 === 0 ? "الصف الثالث الثانوي" : i % 3 === 1 ? "الصف الثاني الثانوي" : "الصف الأول الثانوي",
    icon: <BookOpen className="size-5 text-primary" />,
    iconBg: "bg-primary/5",
    subscriberCount: Math.floor(Math.random() * 1000) + 100,
    videoCount: Math.floor(Math.random() * 40) + 10,
    price: Math.floor(Math.random() * 300) + 200,
    status: i % 10 === 0 ? "soon" : i % 15 === 0 ? "inactive" : "active",
  }))
//  [
//     {
//         id: "1",
//         name: "الرياضيات المتقدمة",
//         description: "الصف الثالث الثانوي",
//         icon: <Calculator className="size-5 text-primary" />,
//         iconBg: "bg-primary/10",
//         subscriberCount: 1240,
//         videoCount: 45,
//         price: 500,
//         status: "active",
//     },
//     {
//         id: "2",
//         name: "الفيزياء الحديثة",
//         description: "الصف الثاني الثانوي",
//         icon: <Atom className="size-5 text-primary" />,
//         iconBg: "bg-primary/10",
//         subscriberCount: 850,
//         videoCount: 32,
//         price: 450,
//         status: "active",
//     },
//     {
//         id: "3",
//         name: "الكيمياء العضوية",
//         description: "الصف الثالث الثانوي",
//         icon: <FlaskConical className="size-5 text-emerald-600" />,
//         iconBg: "bg-emerald-50",
//         subscriberCount: 920,
//         videoCount: 28,
//         price: 400,
//         status: "soon",
//     },
//     {
//         id: "4",
//         name: "اللغة العربية - نحو",
//         description: "الصف الأول الثانوي",
//         icon: <BookOpen className="size-5 text-rose-600" />,
//         iconBg: "bg-rose-50",
//         subscriberCount: 1500,
//         videoCount: 50,
//         price: 350,
//         status: "active",
//     },
//     {
//         id: "5",
//         name: "اللغة الإنجليزية",
//         description: "الصف الثاني الثانوي",
//         icon: <Languages className="size-5 text-sky-600" />,
//         iconBg: "bg-sky-50",
//         subscriberCount: 1100,
//         videoCount: 40,
//         price: 400,
//         status: "inactive",
//     },
// ]

// Column definitions
const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "name",
        header: "الكورس",
        cell: ({ row }) => {
            const course = row.original
            return (
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", course.iconBg)}>
                        {course.icon}
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
                <TvMinimalPlay  size={15} />
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
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
        id: "actions",
        header: "إجراءات",
        cell: ({ row }) => (
            <ActionButtons
                onEdit={() => console.log("Edit", row.original.id)}
                onDelete={() => console.log("Delete", row.original.id)}
            />
        ),
    },
]

export default function CoursesPage() {

    return (
        <div>
            {/* Page Header */}
            <CoursesTeacherPageHeader />

            {/* Courses Section */}
            <div className="bg-card rounded-xl border shadow-sm p-6">
                

                <DataTable
                    columns={columns}
                    data={coursesData}
                    searchKey="name"
                    searchPlaceholder="بحث باسم الكورس..."
                    totalCount={24}
                    pageSize={10}
                    // showColumnToggle
                    DataTableHeader={<div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-sem text-foreground">الكورسات المتاحة</h2>
                        <p className="text-sm text-muted-foreground mt-1">عدد الكورسات: {coursesData.length} كورس</p>
                    </div>
                </div>}
                />
            </div>
        </div>
    )
}
