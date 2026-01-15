"use client"

import { use } from "react"
import { FileText } from "lucide-react"
import { APICourse } from "@/features/admin/courses/types"
import { FormMultiSelect } from "@/components/molecules/FormMultiSelect"
import { Skeleton } from "@/components/ui/skeleton"

interface CourseSelectFieldProps {
    promise: Promise<APICourse[]>
    value: string[]
    onChange: (val: string[]) => void
}

export function CourseSelectField({ promise, value, onChange }: CourseSelectFieldProps) {
    const courses = use(promise)

    return (
        <FormMultiSelect
            label="الكورسات المشترك بها"
            placeholder="اختر كورس أو أكثر..."
            value={value}
            onValueChange={onChange}
            options={courses.map(course => ({
                value: course.id,
                label: course.title
            }))}
            // icon={FileText}
        />
    )
}

export function CourseSelectSkeleton() {
    return (
        <div className="space-y-2 text-right">
            <div className="flex items-center gap-2 mb-2">
                <FileText className="size-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">الكورسات المشترك بها</span>
            </div>
            <Skeleton className="h-11 w-full rounded-md" />
        </div>
    )
}
