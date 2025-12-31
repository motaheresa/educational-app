import { Button } from '@/components/ui/button'
import { PageHeader } from '@/features/admin/components/molecules/PageHeader'
import { BookOpen, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CoursesTeacherPageHeader = () => {
    return (
        <PageHeader
            title="إدارة الكورسات"
            subtitle="عرض وإدارة الكورسات التعليمية والمحتوى المتاح للطلاب"
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Button variant="ghost" className="font-amin gap-2 text-primary font-medium border-b-2 border-primary rounded-none px-4 py-2 hover:bg-transparent">
                    <BookOpen className="size-4" />
                    إدارة الكورسات
                </Button>
                <Button variant="ghost" className="font-amin gap-2 text-muted-foreground hover:text-foreground rounded-none px-4 py-2 hover:bg-transparent" asChild>
                    <Link href="/courses/create">
                        <Plus className="size-4" />
                        إنشاء كورس جديد
                    </Link>
                </Button>
            </div>
        </PageHeader>
    )
}

export default CoursesTeacherPageHeader