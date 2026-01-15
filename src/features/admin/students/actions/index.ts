"use server"

import { fetchAPI } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { CreateStudentRequest } from "../types"

export async function createStudentAction(data: CreateStudentRequest) {
    try {
        console.log("Creating student with data:", data)
        const res = await fetchAPI("/api/students", {
            method: "POST",
            body: JSON.stringify(data),
        })
        revalidatePath("/students")
        return { success: true, data: res }
    } catch (error: any) {
        console.error("Failed to create student:", error)
        return { success: false, error: error.message || "Failed to create student" }
    }
}

export async function updateStudentAction(studentId: string, data: CreateStudentRequest) {
    try {
        console.log("Updating student:", studentId, data)
        const res = await fetchAPI(`/api/students/${studentId}`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
        revalidatePath("/students")
        revalidatePath(`/students/${studentId}`)
        return { success: true, data: res }
    } catch (error: any) {
        console.error("Failed to update student:", error)
        return { success: false, error: error.message || "Failed to update student" }
    }
}

export async function deleteStudentAction(studentId: string) {
    try {
        await fetchAPI(`/api/students/${studentId}`, {
            method: "DELETE",
        })
        revalidatePath("/students")
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete student:", error)
        return { success: false, error: error.message || "Failed to delete student" }
    }
}
