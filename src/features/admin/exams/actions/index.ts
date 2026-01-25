"use server"

import { fetchAPI } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { CreateExamRequest } from "../types"

export async function createExamAction(data: CreateExamRequest) {
    try {
        console.log("Creating exam with data:", data)
        const res = await fetchAPI("/api/assignments", {
            method: "POST",
            body: JSON.stringify(data),
        })
        revalidatePath("/exams")
        return { success: true, data: res }
    } catch (error: any) {
        console.error("Failed to create exam:", error)
        return { success: false, error: error.message || "Failed to create exam" }
    }
}

export async function updateExamAction(id: string, data: CreateExamRequest) {
    try {
        console.log("Updating exam:", id, data)
        const res = await fetchAPI(`/api/assignments/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
        revalidatePath("/exams")
        revalidatePath(`/exams/${id}`)
        return { success: true, data: res }
    } catch (error: any) {
        console.error("Failed to update exam:", error)
        return { success: false, error: error.message || "Failed to update exam" }
    }
}

export async function deleteExamAction(id: string) {
    try {
        const res = await fetchAPI(`/api/assignments/${id}`, {
            method: "DELETE",
        })
        revalidatePath("/exams")
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete exam:", error)
        return { success: false, error: error.message || "Failed to delete exam" }
    }
}
