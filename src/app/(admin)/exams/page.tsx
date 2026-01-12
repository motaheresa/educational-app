"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import {
    FileText,
    Users,
    Clock,
    GraduationCap,
    FlaskConical,
    Calculator,
    Languages,
    BookOpen,
    Atom
} from "lucide-react"

import { DataTable } from "@/components/molecules/Table"
import { StatusBadge, type StatusVariant } from "@/components/atoms/StatusBadge"
import { ActionButtons } from "@/components/atoms/ActionButtons"
import { cn } from "@/lib/utils"
// Use the new header component

import { Progress } from "@/components/ui/progress"

// Exam data type
interface Exam {
    id: string
    name: string
    courseName: string
    courseIcon: React.ReactNode
    studentCount: number
    averageScore: number
    status: StatusVariant
    type: string // e.g., "Midterm", "Final", "Quiz"
}

// Mock data
// Using different icons/colors to mimic the "Courses" styled diversity
const examsData: Exam[] = [
    {
        id: "1",
        name: "امتحان منتصف الفصل",
        courseName: "الرياضيات المتقدمة",
        courseIcon: <Calculator className="size-4 text-primary" />,
        studentCount: 145,
        averageScore: 78,
        status: "active",
        type: "الفصل الدراسي الأول"
    },
    {
        id: "2",
        name: "الامتحان النهائي - فيزياء",
        courseName: "الفيزياء الحديثة",
        courseIcon: <Atom className="size-4 text-purple-600" />,
        studentCount: 98,
        averageScore: 72,
        status: "soon", // representing 'grading in progress' or similar if needed, keeping simple for now
        type: "نهاية العام"
    },
    {
        id: "3",
        name: "امتحان الشهر الأول",
        courseName: "الكيمياء العضوية",
        courseIcon: <FlaskConical className="size-4 text-teal-600" />,
        studentCount: 210,
        averageScore: 89,
        status: "inactive",
        type: "الفصل الأول"
    },
    {
        id: "4",
        name: "الامتحان الشامل للنحو",
        courseName: "اللغة العربية",
        courseIcon: <BookOpen className="size-4 text-amber-600" />,
        studentCount: 320,
        averageScore: 65,
        status: "active",
        type: "مرحلة متقدمة"
    },
    {
        id: "5",
        name: "اختبار الاستماع النصفي",
        courseName: "اللغة الإنجليزية",
        courseIcon: <Languages className="size-4 text-blue-600" />,
        studentCount: 180,
        averageScore: 90,
        status: "active",
        type: "المعمل الصوتي"
    },
    // Generate some more random data
    ...Array.from({ length: 15 }, (_, i) => ({
        id: (i + 6).toString(),
        name: `امتحان تجريبي رقم ${i + 1}`,
        courseName: i % 2 === 0 ? "الرياضيات" : "اللغة العربية",
        courseIcon: <FileText className="size-4 text-muted-foreground" />,
        studentCount: Math.floor(Math.random() * 200) + 50,
        averageScore: Math.floor(Math.random() * 40) + 60,
        status: (i % 3 === 0 ? "inactive" : "active") as StatusVariant,
        type: "تجريبي"
    }))
]

// Column definitions
const columns: ColumnDef<Exam>[] = [
    {
        accessorKey: "name",
        header: "اسم الامتحان",
        cell: ({ row }) => {
            const exam = row.original
            return (
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-primary/10")}>
                        {/* Static icon for exam, or derived from type */}
                        <FileText className="size-5 text-primary" />
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-foreground">{exam.name}</p>
                        <p className="text-xs text-muted-foreground">{exam.type}</p>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "courseName",
        header: "الكورس التابع له",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-foreground">
                {row.original.courseIcon}
                <span className="text-sm font-medium">{row.original.courseName}</span>
            </div>
        ),
    },
    {
        accessorKey: "studentCount",
        header: "عدد الطلاب",
        cell: ({ row }) => (
            <div className="flex items-center gap-1.5 text-foreground justify-center">
                <Users className="size-4 text-muted-foreground" />
                <div className="flex flex-col items-start leading-none">
                    <span className="font-bold">{row.original.studentCount}</span>
                    <span className="text-[10px] text-muted-foreground">طالب</span>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "averageScore",
        header: "متوسط الدرجات",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 w-[100px]">
                <span className="font-bold text-sm w-8">{row.original.averageScore}%</span>
                <Progress value={row.original.averageScore} className="h-2 flex-1" indicatorColor={
                    row.original.averageScore > 80 ? "bg-emerald-500" :
                        row.original.averageScore > 60 ? "bg-amber-500" : "bg-red-500"
                } />
            </div>
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

export default function ExamsPage() {
    return (
        <>
            {/* Exams Section */}
            <DataTable
                columns={columns}
                data={examsData}
                searchKey="name"
                searchPlaceholder="بحث باسم الامتحان..."
                totalCount={examsData.length}
                pageSize={10}
                DataTableHeader={
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-sem text-foreground">الامتحانات المنشأة</h2>
                            <p className="text-sm text-muted-foreground mt-1">عدد الامتحانات: {examsData.length} امتحان</p>
                        </div>
                    </div>
                }
            />
        </>
    )
}
