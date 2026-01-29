export interface DashboardStats {
    totalStudents: number;
    studentsThisMonth: number;
    activeSubscriptions: number;
    activeCourses: number;
    newSubscriptions: number;
    totalRevenue: number;
}

export interface ChartData {
    name: string;
    value: number;
    attendance?: number;
}

export interface SubscriptionDistribution {
    course: string;
    count: number;
    percentage: number;
}

export interface DashboardAPIResponse {
    data: {
        stats: DashboardStats;
        subscriptionsDistribution: SubscriptionDistribution[];
        monthlyPerformance: ChartData[];
    }
}

export interface MiniStats {
    newSubscribers: number;
    totalRevenue: number;
    studentsThisMonth: number;
    activeSubscriptions: number;
    activeCourses: number;
    totalStudents: number;
}

export interface SubscriptionData {
    name: string;
    percentage: number;
    color: string;
    icon: string;
}
