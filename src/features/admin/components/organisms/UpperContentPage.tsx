"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/features/admin/components/molecules/PageTitle"

export interface BreadcrumbItem {
    label: string
    href?: string
}

interface AdminPageHeaderProps {
    title: string
    subtitle?: string
    breadcrumbs?: BreadcrumbItem[]
    actions?: React.ReactNode
    children?: React.ReactNode
    className?: string
}

export function AdminPageHeader({
    title,
    subtitle,
    breadcrumbs,
    actions,
    children,
    className
}: AdminPageHeaderProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {/* Top Bar: Breadcrumbs + Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-4">
                    {/* Breadcrumbs */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {breadcrumbs.map((item, index) => {
                                const isLast = index === breadcrumbs.length - 1
                                return (
                                    <div key={index} className="flex items-center gap-2">
                                        {item.href && !isLast ? (
                                            <Link href={item.href} className="hover:text-primary transition-colors">
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span className={isLast ? "text-foreground" : ""}>{item.label}</span>
                                        )}
                                        {!isLast && <span>/</span>}
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Main Title & Subtitle */}
                    <PageHeader
                        title={title}
                        subtitle={subtitle}
                        className="mb-0"
                    />
                </div>

                {/* Actions */}
                {actions && (
                    <div className="flex items-center gap-2 mt-auto pb-2">
                        {actions}
                    </div>
                )}
            </div>

            {/* Additional Content (e.g. Tabs) */}
            {children && (
                <div className="mt-4">
                    {children}
                </div>
            )}
        </div>
    )
}
