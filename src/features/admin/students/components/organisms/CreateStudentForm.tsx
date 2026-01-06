"use client"

import { User, Phone, Mail, FileText, History, Save, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateStudent } from "@/features/admin/students/hooks/useCreateStudent"
import { PageHeader } from "@/features/admin/components/molecules/PageHeader"
import { Label } from "@/components/ui/label"

export function CreateStudentForm() {
    const { formData, isSubmitting, handleChange, handleCoursesChange, handleSubmit } = useCreateStudent()

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <PageHeader
                            title="إدارة الطلاب"
                            subtitle="عرض وإدارة بيانات الطلاب المسجلين في المنصة"
                            className="mb-0"
                        />
                        {/* Tab-like Navigation */}
                        <div className="flex items-center border-b w-fit gap-4 mt-4 overflow-x-auto">
                            <Button variant="ghost" asChild className="font-amin gap-2 text-muted-foreground hover:text-foreground rounded-none px-4 py-2 hover:bg-transparent">
                                <Link href="/students">إدارة الطلاب</Link>
                            </Button>
                            <Button variant="ghost" className="font-amin gap-2 text-primary font-medium border-b-2 border-primary rounded-none px-4 py-2 hover:bg-transparent">
                                <History className="size-4" />
                                إضافة طالب جديد
                            </Button>
                        </div>
                    </div>

                </div>

                {/* Form Card */}
                <Card className="border shadow-sm">
                    <CardHeader className="border-b bg-muted/5">
                        <CardTitle className="text-xl font-bold">بيانات الطالب</CardTitle>
                        <CardDescription>يرجى ملء جميع الحقول المطلوبة لإضافة الطالب الجديد</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Student Name */}
                            <div className="space-y-2 text-right">
                                <Label htmlFor="name" className="text-sm font-semibold text-foreground">اسم الطالب</Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="الاسم الكامل"
                                        className="pl-4 pr-10 h-11"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <User className="absolute left-auto right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2 text-right">
                                <Label htmlFor="phone" className="text-sm font-semibold text-foreground">رقم الهاتف</Label>
                                <div className="relative">
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="01xxxxxxxxx"
                                        className="pl-4 pr-10 h-11 text-right"
                                        dir="ltr"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Phone className="absolute left-auto right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2 text-right">
                                <Label htmlFor="email" className="text-sm font-semibold text-foreground">البريد الإلكتروني</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="example@email.com"
                                        className="pl-4 pr-10 h-11 "
                                        dir="ltr"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Mail className="absolute left-auto right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Enrolled Courses */}
                            <div className="space-y-2 text-right">
                                <Label htmlFor="courses" className="text-sm font-semibold text-foreground">الكورسات المشترك بها</Label>
                                <div className="relative">
                                    {/* Using a simple select for now, ideally it's a multi-select as per design */}
                                    <Select dir="rtl" onValueChange={(val) => handleCoursesChange([val])}>
                                        <SelectTrigger className="h-11 w-full pl-4 pr-10">
                                            <SelectValue placeholder="اختر كورس أو أكثر..." />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectItem value="الرياضيات">الرياضيات</SelectItem>
                                            <SelectItem value="الفيزياء">الفيزياء</SelectItem>
                                            <SelectItem value="الكيمياء">الكيمياء</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FileText className="absolute left-auto right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1">اضغط مع الاستمرار على Ctrl (أو Cmd) لاختيار أكثر من كورس</p>
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-2 text-right md:col-span-2">
                                <Label htmlFor="notes" className="text-sm font-semibold text-foreground">ملاحظات إضافية (اختياري)</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="أضف أي ملاحظات خاصة بالطالب هنا..."
                                    className="min-h-[120px] resize-none"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-row-reverse gap-4 mt-10">
                            <Button type="submit" className="h-11 px-8 gap-2 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <Loader2 className="size-4 animate-spin" />
                                ) : (
                                    <Save className="size-4" />
                                )}
                                حفظ الطالب
                            </Button>
                            <Button variant="outline" type="button" className="h-11 px-8 text-muted-foreground" asChild>
                                <Link href="/students">إلغاء</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    )
}
