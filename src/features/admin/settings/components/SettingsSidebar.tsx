"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { User, Lock, Settings2 } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
        icon: React.ReactNode
    }[]
}

export function SettingsSidebar({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <nav
            className={cn(
                "flex space-x-2 space-x-reverse lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathname === item.href
                            ? "bg-primary/10 text-primary border-r-4 border-primary hover:bg-primary/10"
                            : "hover:bg-muted hover:text-foreground",
                        "justify-start gap-2 transition-all duration-200"
                    )}
                >
                    {item.icon}
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}

export const settingsNavItems = [
    {
        title: "الملف الشخصي",
        href: "/settings",
        icon: <User className="size-4" />,
    },
    {
        title: "إعدادات الحساب",
        href: "/settings/account",
        icon: <Lock className="size-4" />,
    },
    {
        title: "إعدادات المنصة",
        href: "/settings/platform",
        icon: <Settings2 className="size-4" />,
    },
]
