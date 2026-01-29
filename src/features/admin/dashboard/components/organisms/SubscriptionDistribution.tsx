import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { SubscriptionDistribution as SubscriptionDistributionType } from "../../types"

interface SubscriptionDistributionProps {
    data: SubscriptionDistributionType[]
}

export const SubscriptionDistribution = ({ data }: SubscriptionDistributionProps) => {
    const colors = ['#fb923c', '#60a5fa', '#c084fc', '#34d399', '#f59e0b', '#ec4899'];


    console.log("data=",data)
    return (
        <Card className="border-none shadow-md h-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-bold">توزيع الاشتراكات</CardTitle>

            </CardHeader>
            <CardContent className="space-y-6">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium truncate">{item.course}</span>
                                </div>
                                <span className="font-bold whitespace-nowrap">{item.percentage.toFixed(2)}%</span>
                            </div>
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${item.percentage}%`,
                                        backgroundColor: colors[index % colors.length]
                                    }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 text-muted-foreground text-sm">
                        لا توجد بيانات اشتراكات متاحة
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
