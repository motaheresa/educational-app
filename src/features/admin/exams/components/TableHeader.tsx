import { Button } from '@/components/ui/button'
import { PageHeader } from '@/features/admin/components/molecules/PageHeader'
import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ExamsPageHeader = () => {
    return (
        <PageHeader
            title="إدارة الامتحانات"
            subtitle="عرض وإدارة الامتحانات الرسمية ومتابعة أداء ودرجات الطلاب"
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Button variant="ghost" className="font-amin gap-2 text-primary font-medium border-b-2 border-primary rounded-none px-4 py-2 hover:bg-transparent">
                    <FileText className="size-4" />
                    إدارة الامتحانات
                </Button>
                <Button variant="ghost" className="font-amin gap-2 text-muted-foreground hover:text-foreground rounded-none px-4 py-2 hover:bg-transparent" asChild>
                    <Link href="/exams/create">
                        <Plus className="size-4" />
                        إنشاء امتحان
                    </Link>
                </Button>
            </div>
        </PageHeader>
    )
}

export default ExamsPageHeader
