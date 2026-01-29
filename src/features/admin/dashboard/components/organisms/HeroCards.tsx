import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroCardsProps {
    totalStudents: number
    newSubscriptions: number
}

export const HeroCards = ({ totalStudents, newSubscriptions }: HeroCardsProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Welcome Card */}
            <Card className="border-none shadow-lg overflow-hidden bg-linear-to-br from-emerald-400 to-teal-500 text-white">
                <CardContent className="p-8">
                    <h2 className="text-3xl font-bold mb-4">اهلا يا مستر !</h2>
                    <p className="text-lg opacity-90">
                        لديك <span className="font-bold">{totalStudents}</span> طالب و <span className="font-bold">{newSubscriptions}</span> اشتراك جديد اليوم
                    </p>
                </CardContent>
            </Card>

            {/* Track Grades Card */}
            <Card className="border-none shadow-lg overflow-hidden bg-linear-to-br from-emerald-400 to-teal-500 text-white">
                <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">تقدير نتائج درجات طلابك و واجباتهم</h2>
                    <div className="flex gap-3 mt-6">
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white border-none shadow-md" asChild>
                            <Link href="/homeworks">الواجبات</Link>
                        </Button>
                        <Button className="bg-orange-400 hover:bg-orange-500 text-white border-none shadow-md" asChild>
                            <Link href="/exams">الامتحانات</Link>
                        </Button>
                        <Button className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm" asChild>
                            <Link href="/students">الطلاب</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
