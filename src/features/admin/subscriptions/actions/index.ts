"use server"

import { fetchAPI } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { UpdateSubscriptionRequest } from "../types"

export async function deleteSubscriptionAction(id: string) {
    try {
        await fetchAPI(`/api/subscriptions/${id}`, {
            method: "DELETE",
        })
        revalidatePath("/subscriptions")
        return { success: true }
    } catch (error: unknown) {
        console.error("Delete subscription error:", error)
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}

export async function updateSubscriptionAction(id: string, data: UpdateSubscriptionRequest) {
    try {
        await fetchAPI(`/api/subscriptions/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
        revalidatePath("/subscriptions")
        revalidatePath(`/subscriptions/${id}`)
        return { success: true }
    } catch (error: unknown) {
        console.error("Update subscription error:", error)
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}
