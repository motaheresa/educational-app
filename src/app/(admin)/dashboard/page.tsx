import React, { Suspense } from 'react'
import { fetchAPI } from "@/lib/api"
import { DashboardAPIResponse } from "@/features/admin/dashboard/types"
import { HeroCards } from "@/features/admin/dashboard/components/organisms/HeroCards"
import { MiniStatsCards } from "@/features/admin/dashboard/components/organisms/MiniStatsCards"
import { SubscriptionDistribution } from "@/features/admin/dashboard/components/organisms/SubscriptionDistribution"
import { PerformanceChart } from "@/features/admin/dashboard/components/organisms/PerformanceChart"
import { LoadingState } from "@/components/feedback/LoadingState"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function DashboardPage() {
    let dashboardData: DashboardAPIResponse | null = null;

    try {
        dashboardData = await fetchAPI<DashboardAPIResponse>("/api/dashboard");
        console.log("dashboardData=",dashboardData)
    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        return (
            <ErrorState
                title="حدث خطأ أثناء تحميل لوحة التحكم"
                message="لا يمكننا الوصول إلى بيانات لوحة التحكم حالياً. يرجى المحاولة مرة أخرى لاحقاً."
            />
        );
    }

    // Provide default values if data is missing
    const stats = dashboardData?.data?.stats || {
        totalStudents: 0,
        studentsThisMonth: 0,
        activeSubscriptions: 0,
        activeCourses: 0,
        newSubscriptions: 0,
        totalRevenue: 0
    };

    console.log("dashboardData?.subscriptionsDistribution",dashboardData)
    return (
        <Suspense fallback={<LoadingState message="جاري تحميل لوحة التحكم..." />}>
            <div className="p-6 space-y-6 animate-in fade-in duration-500">
                {/* Hero Cards */}
                <HeroCards
                    totalStudents={stats.totalStudents}
                    newSubscriptions={stats.newSubscriptions}
                />

                {/* Mini Stats Cards */}
                <MiniStatsCards stats={stats} />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Performance Chart */}
                    <div className="lg:col-span-2">
                        <PerformanceChart
                            data={dashboardData?.data?.monthlyPerformance || []}
                            title="إحصائيات الأداء الشهري"
                            subtitle="معدل درجات الطلاب خلال آخر 30 يوم"
                        />
                    </div>


                    {/* Subscription Distribution */}
                    <SubscriptionDistribution data={dashboardData?.data?.subscriptionsDistribution || []} />

                    
                </div>
            </div>
        </Suspense>
    )
}