

import Link from "next/link"
import { Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import CreateExamHeader from "@/features/admin/exams/components/CreateExamHeader"
import { ExamBasicDetails } from "@/features/admin/exams/components/ExamBasicDetails"

export default function CreateExamPage() {
    return (
        <div className="container mx-auto max-w-5xl space-y-8 p-8" dir="rtl">
            {/* Header */}
            <CreateExamHeader />

            <div className="grid grid-cols-1 gap-8">
                {/* Main Content */}
                <div className="space-y-8">
                    {/* Basic Details */}
                    <ExamBasicDetails />

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <Button variant="outline" size="lg" className="min-w-[120px]" asChild>
                            <Link href="/exams">
                                إلغاء
                            </Link>
                        </Button>
                        <Button size="lg" className="min-w-[150px] bg-primary hover:bg-primary/90">
                            <Save className="ml-2 h-4 w-4" />
                            حفظ الامتحان
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
