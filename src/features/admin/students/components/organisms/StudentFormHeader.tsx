"use client"

import Link from "next/link"
import { Save, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/features/admin/components/molecules/PageTitle"

interface StudentFormHeaderProps {
    title: string
    subtitle: string
    isSubmitting: boolean
    backHref: string
    saveLabel: string
}

export function StudentFormHeader({
    title,
    subtitle,
    isSubmitting,
    backHref,
    saveLabel
}: StudentFormHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-amin!">
                    <Link href="/students" className="hover:text-primary transition-colors">
                        إدارة الطلاب
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{title}</span>
                </div>
                <PageHeader
                    title={title}
                    subtitle={subtitle}
                    className="mb-0"
                />
            </div>
            <div className="flex items-center gap-2 mt-auto pb-2">
                <Button variant="outline" type="button" asChild className="h-11 px-6">
                    <Link href={backHref}>
                        <X className="ml-2 h-4 w-4" />
                        إلغاء
                    </Link>
                </Button>
                <Button type="submit" disabled={isSubmitting} className="h-11 px-8 gap-2 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20">
                    {isSubmitting ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="ml-2 h-4 w-4" />
                    )}
                    {saveLabel}
                </Button>
            </div>
        </div>
    )
}
