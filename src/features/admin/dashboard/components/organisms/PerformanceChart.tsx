"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts'

import { ChartData } from "../../types"

interface PerformanceChartProps {
    data: ChartData[]
    title: string
    subtitle?: string
}

export const PerformanceChart = ({ data, title, subtitle }: PerformanceChartProps) => {
    // Use static data if no data is provided
    const chartData = (!data || data.length === 0) ? [
        { name: 'الأسبوع 1', value: 400, attendance: 300 },
        { name: 'الأسبوع 2', value: 500, attendance: 350 },
        { name: 'الأسبوع 3', value: 450, attendance: 400 },
        { name: 'الأسبوع 4', value: 600, attendance: 450 },
    ] : data;

    return (
        <Card className="border-none shadow-md">
            <CardHeader className="flex flex-col gap-1">
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
                {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-purple-500" />
                        <span className="text-xs text-muted-foreground">الدرجات</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-pink-300" />
                        <span className="text-xs text-muted-foreground">الحضور</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorGrades" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f9a8d4" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f9a8d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis
                                dataKey="name"
                                fontSize={10}
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
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#a855f7"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorGrades)"
                                animationDuration={1500}
                            />
                            {chartData[0]?.attendance !== undefined && (
                                <Area
                                    type="monotone"
                                    dataKey="attendance"
                                    stroke="#f9a8d4"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    fillOpacity={1}
                                    fill="url(#colorAttendance)"
                                    animationDuration={1500}
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
