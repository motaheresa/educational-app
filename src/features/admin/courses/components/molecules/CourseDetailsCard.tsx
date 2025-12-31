import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText } from "lucide-react"

export function CourseDetailsCard() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 p-2 text-primary">
                        <FileText className="h-5 w-5" />
                    </div>
                    <CardTitle>تفاصيل الكورس الأساسية</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="courseName">اسم الكورس <span className="text-destructive">*</span></Label>
                    <Input id="courseName" placeholder="مثال: أساسيات الفيزياء للصف الثالث الثانوي" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="courseDescription">وصف الكورس</Label>
                    <Textarea
                        id="courseDescription"
                        placeholder="اكتب وصفاً شاملاً لمحتويات الكورس وما سيتعلمة الطالب..."
                        className="min-h-[150px] resize-y"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
