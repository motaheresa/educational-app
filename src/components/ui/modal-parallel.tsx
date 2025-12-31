"use client"

import { MouseEventHandler, useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
// We can re-use shadcn properties if we want, or build a custom overlay.
// For consistency with shadcn/ui, let's try to mimic the Dialog overly structure or use it directly if possible.
// However, using the raw Dialog component with a controlled state driven by the URL existence is tricky in parallel routes
// because the route *is* the state.
// A common pattern is to just render a fixed overlay.

export function Modal({ children, className }: { children: React.ReactNode; className?: string }) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss()
            }
        },
        [onDismiss, overlay, wrapper]
    )

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss()
        },
        [onDismiss]
    )

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [onKeyDown])

    return (
        <div
            ref={overlay}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className={cn(
                    "relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-card p-6 shadow-lg animate-in zoom-in-95 duration-200 border",
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onDismiss}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
                {children}
            </div>
        </div>
    )
}
