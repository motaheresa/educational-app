"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function CoursePublishSettings() {
    const [isPublished, setIsPublished] = React.useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">إعدادات النشر</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>سعر الكورس (ج.م)</Label>
                    <Input type="number" placeholder="0" className="text-left" dir="ltr" />
                </div>

                <div className="space-y-2">
                    <Label>الصف الدراسي</Label>
                    <Select>
                        <SelectTrigger className="w-full text-right" dir="rtl">
                            <SelectValue placeholder="اختر الصف..." />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                            <SelectItem value="1">الصف الأول الثانوي</SelectItem>
                            <SelectItem value="2">الصف الثاني الثانوي</SelectItem>
                            <SelectItem value="3">الصف الثالث الثانوي</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>المادة</Label>
                    <Select>
                        <SelectTrigger className="w-full text-right" dir="rtl">
                            <SelectValue placeholder="اختر المادة..." />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                            <SelectItem value="physics">الفيزياء</SelectItem>
                            <SelectItem value="math">الرياضيات</SelectItem>
                            <SelectItem value="chemistry">الكيمياء</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                    <Label htmlFor="publish-mode" className="font-medium cursor-pointer">نشر الكورس مباشرة</Label>
                    <Switch
                        id="publish-mode"
                        checked={isPublished}
                        onCheckedChange={setIsPublished}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
