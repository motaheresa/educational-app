"use server"

import { fetchAPI } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { CreateCouponRequest, UpdateCouponRequest } from "../types"

export async function createCouponAction(data: CreateCouponRequest) {
    try {
        await fetchAPI("/api/coupons", {
            method: "POST",
            body: JSON.stringify(data),
        })
        revalidatePath("/coupons")
        return { success: true }
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}

export async function updateCouponAction(id: string, data: UpdateCouponRequest) {
    try {
        await fetchAPI(`/api/coupons/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
        revalidatePath("/coupons")
        return { success: true }
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}

export async function deleteCouponAction(id: string) {
    try {
        await fetchAPI(`/api/coupons/${id}`, {
            method: "DELETE",
        })
        revalidatePath("/coupons")
        return { success: true }
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}

export async function toggleCouponStatusAction(id: string, isActive: boolean) {
    try {
        await fetchAPI(`/api/coupons/${id}`, {
            method: "PUT",
            body: JSON.stringify({ isActive }),
        })
        revalidatePath("/coupons")
        return { success: true }
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}
