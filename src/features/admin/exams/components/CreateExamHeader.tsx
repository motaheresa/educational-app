import { Button } from '@/components/ui/button'
import { PageHeader } from '@/features/admin/components/molecules/PageHeader'
import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateExamHeader = () => {
    return (
        <PageHeader
            title="إنشاء امتحان جديد"
            subtitle="قم بإعداد تفاصيل الامتحان بدقة وتعيينه للكورسات والطلاب"
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Button variant="ghost" className="font-amin gap-2 text-muted-foreground hover:text-foreground rounded-none px-4 py-2 hover:bg-transparent" asChild>
                    <Link href="/exams">
                        <FileText className="size-4" />
                        إدارة الامتحانات
                    </Link>
                </Button>
                <Button variant="ghost" className="font-amin gap-2 text-primary font-medium border-b-2 border-primary rounded-none px-4 py-2 hover:bg-transparent">
                    <Plus className="size-4" />
                    إنشاء امتحان
                </Button>
            </div>
        </PageHeader>
    )
}

export default CreateExamHeader
