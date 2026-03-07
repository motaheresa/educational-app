"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'

const mockRevenueData = [
    { month: 'أكتوبر', revenue: 4200, discounts: 300 },
    { month: 'نوفمبر', revenue: 5800, discounts: 450 },
    { month: 'ديسمبر', revenue: 7100, discounts: 620 },
    { month: 'يناير', revenue: 6400, discounts: 380 },
    { month: 'فبراير', revenue: 8200, discounts: 550 },
    { month: 'مارس', revenue: 9500, discounts: 700 },
]

export const RevenueChart = () => {
    return (
        <Card className="border-none shadow-md">
            <CardHeader className="flex flex-col gap-1 pb-2">
                <CardTitle className="text-lg font-bold">الإيرادات الشهرية</CardTitle>
                <p className="text-xs text-muted-foreground">صافي الإيرادات مقابل قيمة الخصومات (آخر 6 أشهر)</p>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-sm bg-purple-500" />
                        <span className="text-xs text-muted-foreground">صافي الإيرادات</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-sm bg-pink-400" />
                        <span className="text-xs text-muted-foreground">الخصومات</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[280px] w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={mockRevenueData}
                            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                            barGap={4}
                        >
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
                                tickFormatter={(v) => `${v}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    direction: 'rtl',
                                }}
                                formatter={(value?: number, name?: string) => [
                                    `${(value ?? 0).toLocaleString()} ج.م`,
                                    name === 'revenue' ? 'الإيرادات' : 'الخصومات'
                                ]}
                            />
                            <Bar
                                dataKey="revenue"
                                fill="#a855f7"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={40}
                            />
                            <Bar
                                dataKey="discounts"
                                fill="#f472b6"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
