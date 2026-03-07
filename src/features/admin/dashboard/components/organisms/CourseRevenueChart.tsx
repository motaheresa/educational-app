"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts'

const mockCourseRevenue = [
    { name: 'الجبر المتقدم', revenue: 4500 },
    { name: 'التفاضل والتكامل', revenue: 3800 },
    { name: 'الهندسة الفراغية', revenue: 2200 },
    { name: 'الإحصاء والاحتمالات', revenue: 1800 },
    { name: 'أخرى', revenue: 1200 },
]

const COLORS = ['#a855f7', '#06b6d4', '#f59e0b', '#ec4899', '#6366f1']

export const CourseRevenueChart = () => {
    const total = mockCourseRevenue.reduce((sum, c) => sum + c.revenue, 0)

    return (
        <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-col gap-1 pb-2">
                <CardTitle className="text-lg font-bold">إيرادات الكورسات</CardTitle>
                <p className="text-xs text-muted-foreground">توزيع الإيرادات حسب الكورس</p>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mockCourseRevenue}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={3}
                                dataKey="revenue"
                                animationDuration={1200}
                                stroke="none"
                            >
                                {mockCourseRevenue.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    direction: 'rtl',
                                }}
                                formatter={(value?: number) => [`${(value ?? 0).toLocaleString()} ج.م`, 'الإيرادات']}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Center total */}
                <div className="text-center -mt-[130px] mb-[90px] relative z-10 pointer-events-none">
                    <p className="text-2xl font-black text-foreground">{total.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">ج.م إجمالي</p>
                </div>

                {/* Legend */}
                <div className="space-y-2 mt-2" dir="rtl">
                    {mockCourseRevenue.map((course, index) => {
                        const pct = ((course.revenue / total) * 100).toFixed(1)
                        return (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div
                                        className="size-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-xs font-medium truncate">{course.name}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs text-muted-foreground">{pct}%</span>
                                    <span className="text-xs font-bold">{course.revenue.toLocaleString()}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
