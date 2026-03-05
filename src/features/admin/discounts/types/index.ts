export type DiscountType = "PERCENTAGE" | "FIXED";
export type DiscountAppliesTo = "ALL" | "COURSE" | "STUDENT";

export interface APIDiscount {
    id: string;
    name: string;
    type: DiscountType;
    value: number;
    appliesTo: DiscountAppliesTo;
    courseIds: string[];
    maxStudents: number | null;
    usedCount: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
}

export interface CreateDiscountRequest {
    name: string;
    type: DiscountType;
    value: number;
    appliesTo: DiscountAppliesTo;
    courseIds: string[];
    maxStudents: number | null;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

export interface DiscountsResponse {
    success: boolean;
    data: APIDiscount[];
}
