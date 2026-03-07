import React, { Suspense } from 'react'
import { fetchAPI } from "@/lib/api"
import { DashboardAPIResponse } from "@/features/admin/dashboard/types"
import { HeroCards } from "@/features/admin/dashboard/components/organisms/HeroCards"
import { MiniStatsCards } from "@/features/admin/dashboard/components/organisms/MiniStatsCards"
import { SubscriptionDistribution } from "@/features/admin/dashboard/components/organisms/SubscriptionDistribution"
import { PerformanceChart } from "@/features/admin/dashboard/components/organisms/PerformanceChart"
import { RevenueChart } from "@/features/admin/dashboard/components/organisms/RevenueChart"
import { StudentGrowthChart } from "@/features/admin/dashboard/components/organisms/StudentGrowthChart"
import { CourseRevenueChart } from "@/features/admin/dashboard/components/organisms/CourseRevenueChart"
import { RecentActivity } from "@/features/admin/dashboard/components/organisms/RecentActivity"
import { QuickActions } from "@/features/admin/dashboard/components/organisms/QuickActions"
import { LoadingState } from "@/components/feedback/LoadingState"
import { ErrorState } from "@/components/feedback/ErrorState"

export default async function DashboardPage() {
    let dashboardData: DashboardAPIResponse | null = null;

    try {
        dashboardData = await fetchAPI<DashboardAPIResponse>("/api/dashboard");
    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        return (
            <ErrorState
                title="حدث خطأ أثناء تحميل لوحة التحكم"
                message="لا يمكننا الوصول إلى بيانات لوحة التحكم حالياً. يرجى المحاولة مرة أخرى لاحقاً."
            />
        );
    }

    const stats = dashboardData?.data?.stats || {
        totalStudents: 0,
        studentsThisMonth: 0,
        activeSubscriptions: 0,
        activeCourses: 0,
        newSubscriptions: 0,
        totalRevenue: 0
    };

    return (
        <Suspense fallback={<LoadingState message="جاري تحميل لوحة التحكم..." />}>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* 1. Hero Cards (Original 2-card layout) */}
                <HeroCards
                    totalStudents={stats.totalStudents}
                    newSubscriptions={stats.newSubscriptions}
                />

                {/* 2. Stats Cards — Most important KPIs at a glance */}
                <MiniStatsCards stats={stats} />

                {/* 3. Revenue (most impactful) + Student Growth */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RevenueChart />
                    <StudentGrowthChart />
                </div>

                {/* 4. Performance Chart (API data, 2/3) + Course Revenue Donut (1/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <PerformanceChart
                            data={dashboardData?.data?.monthlyPerformance || []}
                            title="إحصائيات الأداء الشهري"
                            subtitle="معدل درجات الطلاب خلال آخر 30 يوم"
                        />
                    </div>
                    <CourseRevenueChart />
                </div>

                {/* 5. Subscription Distribution (1/3) + Recent Activity (1/3) + Quick Actions (1/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <SubscriptionDistribution data={dashboardData?.data?.subscriptionsDistribution || []} />
                    <RecentActivity />
                    <QuickActions />
                </div>
            </div>
        </Suspense>
    )
}