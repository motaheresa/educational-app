"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FileText, GraduationCap, Timer, HelpCircle, CheckCircle } from "lucide-react"

export function ExamBasicDetails() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>تفاصيل الامتحان الأساسية</CardTitle>
                <CardDescription>أدخِل جميع المعلومات المطلوبة لإنشاء امتحان جديد بنجاح.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Exam Name */}
                <div className="space-y-2">
                    <Label htmlFor="examName">اسم الامتحان <span className="text-destructive">*</span></Label>
                    <div className="relative">
                        <Input
                            id="examName"
                            placeholder="مثال: امتحان منتصف الفصل - رياضيات"
                            className="pl-10 text-right"
                        />
                        <FileText className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Course Select */}
                    <div className="space-y-2">
                        <Label>اختيار الكورس <span className="text-destructive">*</span></Label>
                        <Select dir="rtl">
                            <SelectTrigger >
                                <div className="flex items-center gap-2">
                                    <SelectValue placeholder="اختر الكورس التابع للامتحان..." />
                                    <GraduationCap className="h-4 w-4 text-muted-foreground ml-auto" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="math">الرياضيات المتقدمة</SelectItem>
                                <SelectItem value="physics">الفيزياء الحديثة</SelectItem>
                                <SelectItem value="chemistry">الكيمياء العضوية</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                        <Label>مدة الامتحان (بالدقيقة) <span className="text-destructive">*</span></Label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="60"
                                className="pl-10 text-right"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">دقيقة</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Questions Count */}
                    <div className="space-y-2">
                        <Label>عدد الأسئلة <span className="text-destructive">*</span></Label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="20"
                                className="pl-10 text-right"
                            />
                            <HelpCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Passing Score */}
                    <div className="space-y-2">
                        <Label>درجة النجاح (%) <span className="text-destructive">*</span></Label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="50"
                                className="pl-10 text-right"
                            />
                            <CheckCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* Shuffle Switch */}
                <div className="flex items-center justify-end gap-2 border-t pt-4">
                    <Label htmlFor="shuffle" className="cursor-pointer">
                        <div className="text-sm font-medium">خلط ترتيب الأسئلة عشوائياً</div>
                        <div className="text-xs text-muted-foreground">سيتم عرض الأسئلة بترتيب مختلف لكل طالب عند تفعيل هذا الخيار.</div>
                    </Label>
                    <Switch id="shuffle" />
                </div>
            </CardContent>
        </Card>
    )
}
