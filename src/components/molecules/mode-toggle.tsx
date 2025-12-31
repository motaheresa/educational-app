"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full w-12 h-6 px-1 bg-muted relative transition-colors hover:bg-muted"
        >
            <div className="flex items-center justify-between w-full h-full px-1">
                <Sun className="h-3 w-3 text-yellow-500" />
                <Moon className="h-3 w-3 text-slate-900 dark:text-slate-100" />
            </div>
            <span
                className={cn(
                    "absolute left-1 top-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform duration-200",
                    theme === "dark" ? "translate-x-6" : "translate-x-0"
                )}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
