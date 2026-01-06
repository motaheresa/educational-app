import { Button } from '@/components/ui/button'
import { PageHeader } from '@/features/admin/components/molecules/PageHeader'
import { Users, UserPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const StudentsHeader = () => {
    return (
        <PageHeader
            title="إدارة الطلاب"
            subtitle="عرض وإدارة بيانات الطلاب المسجلين في المنصة"
        >
            {/* Tab Navigation */}
            <div className="flex items-center border-b w-full gap-4 mt-4 overflow-x-auto">
                <Button variant="ghost" className="font-amin gap-2 text-primary font-medium border-b-2 border-primary rounded-none px-4 py-2 hover:bg-transparent">
                    <Users className="size-4" />
                    إدارة الطلاب
                </Button>
                <Button variant="ghost" className="font-amin gap-2 text-muted-foreground hover:text-foreground rounded-none px-4 py-2 hover:bg-transparent" asChild>
                    <Link href="/students/create">
                        <UserPlus className="size-4" />
                        إضافة طالب جديد
                    </Link>
                </Button>
            </div>
        </PageHeader>
    )
}

export default StudentsHeader
