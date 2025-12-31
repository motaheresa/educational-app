import Link from "next/link"
import { Save, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/features/admin/components/molecules/PageHeader"

interface CreateCourseHeaderProps {
    isSubmitting: boolean
}

export function CreateCourseHeader({ isSubmitting }: CreateCourseHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/courses" className="hover:text-primary transition-colors">
                        إدارة الكورسات
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">إنشاء كورس جديد</span>
                </div>
                <PageHeader
                    title="إنشاء كورس جديد"
                    subtitle="قم بإضافة تفاصيل الكورس، المحتوى، والمرفقات التعليمية"
                    className="mb-0"
                />
            </div>
            <div className="flex items-center gap-2 mt-auto pb-2">
                <Button variant="outline" type="button" asChild>
                    <Link href="/courses">
                        <X className="ml-2 h-4 w-4" />
                        إلغاء
                    </Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="ml-2 h-4 w-4" />
                    )}
                    حفظ الكورس
                </Button>
            </div>
        </div>
    )
}
