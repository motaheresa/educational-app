"use client"

import * as React from "react"
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction"

export type Direction = "ltr" | "rtl"

interface DirectionProviderProps {
    children: React.ReactNode
    direction: Direction
}

/**
 * DirectionProvider provides the text direction context to Radix UI and other components.
 * It uses the official @radix-ui/react-direction primitive to ensure compatibility 
 * with Shadcn UI components.
 */
export const DirectionProvider = ({
    children,
    direction,
}: DirectionProviderProps) => {
    return (
        <RadixDirectionProvider dir={direction}>
            {children}
        </RadixDirectionProvider>
    )
}

// Low-level context access if needed
export { useDirection } from "@radix-ui/react-direction"
