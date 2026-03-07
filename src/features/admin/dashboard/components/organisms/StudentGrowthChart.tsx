"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area
} from 'recharts'

const mockStudentGrowth = [
    { month: 'أكتوبر', students: 18 },
    { month: 'نوفمبر', students: 25 },
    { month: 'ديسمبر', students: 32 },
    { month: 'يناير', students: 28 },
    { month: 'فبراير', students: 45 },
    { month: 'مارس', students: 52 },
]

export const StudentGrowthChart = () => {
    return (
        <Card className="border-none shadow-md">
            <CardHeader className="flex flex-col gap-1 pb-2">
                <CardTitle className="text-lg font-bold">نمو الطلاب</CardTitle>
                <p className="text-xs text-muted-foreground">عدد الطلاب الجدد المسجلين شهريًا</p>
            </CardHeader>
            <CardContent>
                <div className="h-[280px] w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={mockStudentGrowth}
                            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis
                                dataKey="month"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    direction: 'rtl',
                                }}
                                formatter={(value?: number) => [`${value ?? 0} طالب`, 'الطلاب الجدد']}
                            />
                            <Area
                                type="monotone"
                                dataKey="students"
                                stroke="transparent"
                                fill="url(#studentGradient)"
                            />
                            <Line
                                type="monotone"
                                dataKey="students"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                dot={{ r: 5, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
                                activeDot={{ r: 7, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
