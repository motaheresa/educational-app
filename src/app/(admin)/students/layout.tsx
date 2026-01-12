import StudentsHeader from '@/features/admin/students/components/organisms/StudentsHeader';
import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-col gap-6">
            <StudentsHeader />
            <div className="bg-card rounded-xl border shadow-sm p-6">
                {children}
            </div>
        </div>

    )
}

export default layout