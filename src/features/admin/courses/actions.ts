"use server"

import { fetchAPI } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function deleteCourseAction(courseId: string) {
    try {
        const res=await fetchAPI(`/api/courses/${courseId}`, {
            method: "DELETE",
        })
        console.log(res);
        
        revalidatePath("/courses")
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete course:", error)
        return { success: false, error: error.message || "Failed to delete course" }
    }
}
