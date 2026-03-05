"use server"

import { fetchAPI } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function createDiscountAction(data: any) {
    try {
        const payload = { ...data }

        // Ensure dates are full ISO strings
        if (payload.startDate) {
            payload.startDate = new Date(payload.startDate).toISOString()
        }
        if (payload.endDate) {
            // Set end date to end of the day to cover the whole date selected
            const endDate = new Date(payload.endDate)
            endDate.setUTCHours(23, 59, 59, 999)
            payload.endDate = endDate.toISOString()
        }

        // Ensure payload matches strict API requirements for ALL vs COURSES
        if (payload.appliesTo === "ALL") {
            delete payload.courseIds
            // delete payload.maxStudents
        } else if (payload.appliesTo === "COURSE") {
            // Ensure appliesTo maps to the precise backend enum string if it expects "COURSES"
            payload.appliesTo = "COURSES"
        }
        payload.maxStudents = payload.maxStudents ? Number(payload.maxStudents) : null

        await fetchAPI("/api/discounts", {
            method: "POST",
            body: JSON.stringify(payload),
        })
        revalidatePath("/discounts")
        return { success: true }
    } catch (error: unknown) {
        console.error("Create discount error:", error)
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}

export async function updateDiscountAction(id: string, data: any) {
    try {
        await fetchAPI(`/api/discounts/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
        revalidatePath("/discounts")
        revalidatePath(`/discounts/${id}`)
        return { success: true }
    } catch (error: unknown) {
        console.error("Update discount error:", error)
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}

export async function toggleDiscountStatusAction(id: string, isActive: boolean) {
    try {
        await fetchAPI(`/api/discounts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ isActive }),
        })
        revalidatePath("/discounts")
        return { success: true }
    } catch (error: unknown) {
        console.error("Toggle discount status error:", error)
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}

export async function deleteDiscountAction(id: string) {
    try {
        await fetchAPI(`/api/discounts/${id}`, {
            method: "DELETE",
        })
        revalidatePath("/discounts")
        return { success: true }
    } catch (error: unknown) {
        console.error("Delete discount error:", error)
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}
