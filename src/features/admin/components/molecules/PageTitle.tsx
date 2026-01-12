"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
    title: string
    subtitle?: string
    children?: React.ReactNode
    className?: string
}

export function PageHeader({ title, subtitle, children, className }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col items-start gap-2 text-start mb-6", className)}>
            <h1 className="text-3xl font-extrabold font-amin! text-foreground">{title}</h1>
            {subtitle && (
                <p className="  text-muted-foreground">{subtitle}</p>
            )}
            {children}
        </div>
    )
}
