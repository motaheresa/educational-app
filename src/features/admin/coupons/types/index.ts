export type CouponType = "FIXED" | "PERCENTAGE";

export interface APICoupon {
    id: string;
    code: string;
    type: CouponType;
    value: number;
    maxUsage: number;
    maxUsagePerStudent: number;
    usedCount: number;
    expiresAt: string;
    isActive: boolean;
    createdAt: string;
    usages: unknown[];
}

export interface CreateCouponRequest {
    code: string;
    type: CouponType;
    value: number;
    maxUsage: number;
    maxUsagePerStudent: number;
    expiresAt: string;
    isActive: boolean;
}

export interface UpdateCouponRequest {
    code: string;
    type: CouponType;
    value: number;
    maxUsage: number;
    maxUsagePerStudent: number;
    isActive: boolean;
}

export interface CouponsPayload {
    coupons: APICoupon[];
}
