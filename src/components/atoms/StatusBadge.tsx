"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type StatusVariant = "active" | "inactive" | "soon"

interface StatusBadgeProps {
    status: StatusVariant
    className?: string
}

const statusConfig: Record<StatusVariant, { label: string; dotColor: string; bgColor: string }> = {
    active: {
        label: "نشط",
        dotColor: "bg-emerald-500",
        bgColor: "bg-emerald-100/80 text-emerald-700",
    },
    inactive: {
        label: "مغلق",
        dotColor: "bg-red-500",
        bgColor: "bg-red-100/80 text-red-700",
    },
    soon: {
        label: "قريباً",
        dotColor: "bg-amber-500",
        bgColor: "bg-amber-100/80 text-amber-700",
    },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status]

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                config.bgColor,
                className
            )}
        >
            <span className={cn("w-1.5 h-1.5 rounded-full", config.dotColor)} />
            {config.label}
        </span>
    )
}
