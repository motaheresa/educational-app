"use client"

import { AdminPageHeader } from "@/features/admin/components/organisms/UpperContentPage"
import { Button } from "@/components/ui/button"
import { Save, X, Loader2 } from "lucide-react"
import Link from "next/link"

interface ExamFormHeaderProps {
    title: string
    isSubmitting: boolean
    onCancel: string
}

export function ExamFormHeader({ title, isSubmitting, onCancel }: ExamFormHeaderProps) {
    return (
        <AdminPageHeader
            title={title}
            subtitle="قم بإكمال تفاصيل الامتحان والأسئلة لإنشاء تقييم شامل للطلاب"
            breadcrumbs={[
                { label: "الامتحانات", href: "/exams" },
                { label: title }
            ]}
            actions={
                <div className="flex items-center gap-2">
                    <Button variant="outline" type="button" asChild className="h-11 px-6">
                        <Link href={onCancel}>
                            <X className="ml-2 h-4 w-4" />
                            إلغاء
                        </Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="h-11 px-8 gap-2 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20">
                        {isSubmitting ? (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="ml-2 h-4 w-4" />
                        )}
                        حفظ الامتحان
                    </Button>
                </div>
            }
        />
    )
}
