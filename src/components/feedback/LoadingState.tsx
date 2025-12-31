import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingStateProps {
    message?: string
    className?: string
}

export function LoadingState({ message = "جاري التحميل...", className }: LoadingStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-8 space-y-4 min-h-[300px]", className)}>
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Loader2 className="w-10 h-10 text-primary animate-spin relative z-10" />
            </div>
            <p className="text-muted-foreground animate-pulse text-sm font-medium">{message}</p>
        </div>
    )
}
