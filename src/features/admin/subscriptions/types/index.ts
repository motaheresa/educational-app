export interface APISubscription {
    id: string;
    studentId: string;
    courseId: string;
    priceBeforeDiscount: number;
    discountAmount: number;
    finalPrice: number;
    paymentMethod: string;
    status: string;
    startedAt: string;
    endsAt: string | null;
    createdAt: string;
    student: {
        id: string;
        name: string;
        phone: string;
        email: string;
        parentPhone: string;
        grade: string;
        notes: string;
        status: string;
        image?: string;
        createdAt: string;
    };
    course: {
        id: string;
        title: string;
        description: string;
        banner: string;
        price: number;
        grade: string;
        subject: string;
        createdAt: string;
    };
}

export interface SubscriptionsPayload {
    subscriptions: APISubscription[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    }
}

export type APISubscriptionDetails = { subscription: APISubscription };

export interface UpdateSubscriptionRequest {
    paymentMethod: string;
    status: string;
}

export interface CreateSubscriptionRequest {
    studentId: string;
    courseId: string;
    paymentMethod: string;
}

export type UISubscription = APISubscription;
