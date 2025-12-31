"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Image as ImageIcon, X } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface CourseImageUploadProps {
    banner: string
    onChange: (field: keyof import("@/features/admin/courses/types/create").CreateCourseFormData, value: string) => void
}

export function CourseImageUpload({ banner, onChange }: CourseImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string>(banner)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setPreview(result)
                onChange("banner", result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemove = () => {
        setPreview("")
        onChange("banner", "")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">صورة الكورس</CardTitle>
            </CardHeader>
            <CardContent>
                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Course banner"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer bg-orange-500/10 dark:bg-orange-500/5 border-orange-200 dark:border-orange-900"
                    >
                        <div className="rounded-full bg-background p-4 shadow-sm">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">رفع صورة غلاف</p>
                            <p className="text-xs text-muted-foreground">يفضل استخدام أبعاد 16:9 وصيغة JPG أو PNG</p>
                        </div>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </CardContent>
        </Card>
    )
}
