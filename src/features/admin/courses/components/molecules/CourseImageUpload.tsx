import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Image as ImageIcon } from "lucide-react"

export function CourseImageUpload() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">صورة الكورس</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer bg-orange-500/10 dark:bg-orange-500/5 border-orange-200 dark:border-orange-900">
                    <div className="rounded-full bg-background p-4 shadow-sm">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium">رفع صورة غلاف</p>
                        <p className="text-xs text-muted-foreground">يفضل استخدام أبعاد 16:9 وصيغة JPG أو PNG</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
