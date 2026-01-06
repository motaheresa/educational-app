"use client"
import { AlertTriangle, RefreshCcw, ArrowLeft } from "lucide-react" // Import ArrowLeft
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Modal } from "../ui/modal-parallel"

interface ErrorStateProps {
    title?: string
    message?: string
    onRetry?: () => void
    retryLabel?: string
    onBack?: () => void 
    backLabel?: string 
    className?: string
}

export function ErrorState({
    title = "حدث خطأ ما",
    message = "لم نتمكن من تحميل البيانات. يرجى المحاولة مرة أخرى.",
    onRetry,
    retryLabel = "إعادة المحاولة",
    onBack,
    backLabel = "العودة", 
    className
}: ErrorStateProps) {
    const router = useRouter()
    return (
        <Modal>
        <div className={cn("flex flex-col items-center justify-center p-8 space-y-4 min-h-[300px] text-center", className)}>
            <div className="bg-destructive/10 p-4 rounded-full">
                <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2 max-w-sm">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm">{message}</p>
            </div>

            {/* Action Buttons Container */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">

                    <Button onClick={() => onBack ?? router.back()} variant="ghost" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        {backLabel}
                    </Button>
                    <Button onClick={() => onRetry ?? router.refresh()} variant="outline" className="gap-2">
                        <RefreshCcw className="w-4 h-4" />
                        {retryLabel}
                    </Button>
                </div>
        </div>
        </Modal>
    )
}