"use client"

import * as React from "react"
import { Pencil, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActionButtonsProps {
    onView?: () => void
    onEdit?: () => void
    onDelete?: () => void
    className?: string
}

export function ActionButtons({ onView, onEdit, onDelete, className }: ActionButtonsProps) {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            {onView && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onView}
                    className="text-blue-500 hover:text-blue-700 bg-blue-500/10 hover:bg-blue-500/20"
                >
                    <Eye className="size-4" />
                    <span className="sr-only">عرض</span>
                </Button>
            )}
            {onEdit && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onEdit}
                    className="text-primary hover:text-purple-900 bg-primary/10 hover:bg-primary/20"
                >
                    <Pencil className="size-4" />
                    <span className="sr-only">تعديل</span>
                </Button>
            )}
            {onDelete && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700 bg-red-500/10 hover:bg-red-500/20"
                >
                    <Trash2 className="size-4" />
                    <span className="sr-only">حذف</span>
                </Button>
            )}

        </div>
    )
}
