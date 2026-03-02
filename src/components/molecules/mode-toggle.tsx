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
            className="rounded-full w-18 h-9 px-1 bg-muted relative transition-colors hover:bg-muted"
        >
            <div className="flex items-center justify-between w-full h-full px-1">
                
                 <Moon className="h-8 w-8 text-slate-900 dark:text-slate-100" />
                 <Sun className="h-8 w-8 text-gray-200" />
            </div>
            <span
                className={cn(
                    "absolute flex items-center justify-center left-1 top-1 h-6.5 w-6.5 rounded-full bg-background shadow-lg  transition-transform duration-200",
                    theme === "dark" ? "translate-x-8 shadow-gray-700 border border-gray-600 bg-gray-500 " : "translate-x-0 shadow-gray-300 border border-gray-300"
                )}
            >
                {theme==="light"?<Sun className="h-full w-full scale-110 text-yellow-500" />:<Moon className="h-full w-full scale-110 text-white" />}
                
                </span>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
