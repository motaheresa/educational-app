import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
    title?: string
    message?: string
    onRetry?: () => void
    retryLabel?: string
    className?: string
}

export function ErrorState({
    title = "حدث خطأ ما",
    message = "لم نتمكن من تحميل البيانات. يرجى المحاولة مرة أخرى.",
    onRetry,
    retryLabel = "إعادة المحاولة",
    className
}: ErrorStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-8 space-y-4 min-h-[300px] text-center", className)}>
            <div className="bg-destructive/10 p-4 rounded-full">
                <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2 max-w-sm">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm">{message}</p>
            </div>
            {onRetry && (
                <Button onClick={onRetry} variant="outline" className="gap-2 mt-4">
                    <RefreshCcw className="w-4 h-4" />
                    {retryLabel}
                </Button>
            )}
        </div>
    )
}
