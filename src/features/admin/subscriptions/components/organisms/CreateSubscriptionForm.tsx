"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, CreditCard, Save, User, BookOpen, Search, X, Settings, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AdminPageHeader } from "@/features/admin/components/organisms/UpperContentPage"
import { useCreateSubscription } from "../../hooks/useCreateSubscription"
import { APIStudent } from "@/features/admin/students/types"
import { APICourse } from "@/features/admin/courses/types"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { FormSelect } from "@/components/molecules/FormSelect"

interface CreateSubscriptionFormProps {
    students: APIStudent[]
    courses: APICourse[]
}

export function CreateSubscriptionForm({ students, courses }: CreateSubscriptionFormProps) {
    const {
        formData,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleSubmit
    } = useCreateSubscription()

    const [openStudent, setOpenStudent] = useState(false)
    const [openCourse, setOpenCourse] = useState(false)

    const selectedStudent = students.find((s) => s.id === formData.studentId)
    const selectedCourse = courses.find((c) => c.id === formData.courseId)

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8" dir="rtl">
            <AdminPageHeader
                title="إضافة اشتراك جديد"
                subtitle="ربط طالب بكورس معين وتفعيل الوصول للمحتوى"
                breadcrumbs={[
                    { label: "الاشتراكات", href: "/subscriptions" },
                    { label: "إضافة اشتراك جديد" }
                ]}
                actions={
                    <div className="flex items-center gap-3">
                        <Button variant="outline" type="button" asChild className="h-11 px-6 border-2 font-bold rounded-xl">
                            <Link href="/subscriptions">
                                <X className="ml-2 size-4" />
                                إلغاء
                            </Link>
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content: Selection */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <div className="p-5 border-b bg-muted/30 flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <User className="size-5" />
                            </div>
                            <h4 className="font-bold text-lg">بيانات الاشتراك</h4>
                        </div>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Student Selection */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-muted-foreground mr-1">الطالب المستهدف</label>
                                    <Popover open={openStudent} onOpenChange={setOpenStudent}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openStudent}
                                                className="h-14 w-full justify-between border-2 rounded-xl text-lg font-medium px-4 hover:bg-background hover:border-primary/50 transition-all"
                                            >
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <Search className="size-4 text-muted-foreground shrink-0" />
                                                    <span className="truncate">
                                                        {formData.studentId
                                                            ? students.find((s) => s.id === formData.studentId)?.name
                                                            : "اختر الطالب..."}
                                                    </span>
                                                </div>
                                                <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-xl overflow-hidden shadow-2xl border-primary/10" align="start">
                                            <Command className="w-full" dir="rtl">
                                                <CommandInput placeholder="ابحث عن طالب..." className="h-12 border-none focus:ring-0" />
                                                <CommandList className="max-h-[300px]">
                                                    <CommandEmpty className="py-6 text-center text-sm text-muted-foreground font-medium">لم يتم العثور على طالب.</CommandEmpty>
                                                    <CommandGroup heading="قائمة الطلاب" className="p-2">
                                                        {students.map((student) => (
                                                            <CommandItem
                                                                key={student.id}
                                                                value={`${student.name} ${student.phone}`}
                                                                onSelect={() => {
                                                                    handleChange("studentId", student.id)
                                                                    setOpenStudent(false)
                                                                }}
                                                                className="flex items-center justify-between py-3 px-3 rounded-lg cursor-pointer aria-selected:bg-primary/5 aria-selected:text-primary transition-colors text-right"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold">{student.name}</span>
                                                                    <span className="text-[10px] text-muted-foreground">{student.phone}</span>
                                                                </div>
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4 text-primary",
                                                                        formData.studentId === student.id ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Course Selection */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-muted-foreground mr-1">الكورس المطلوب</label>
                                    <Popover open={openCourse} onOpenChange={setOpenCourse}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openCourse}
                                                className="h-14 w-full justify-between border-2 rounded-xl text-lg font-medium px-4 hover:bg-background hover:border-primary/50 transition-all text-right"
                                            >
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <BookOpen className="size-4 text-muted-foreground shrink-0" />
                                                    <span className="truncate">
                                                        {formData.courseId
                                                            ? courses.find((c) => c.id === formData.courseId)?.title
                                                            : "اختر الكورس..."}
                                                    </span>
                                                </div>
                                                <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-xl overflow-hidden shadow-2xl border-primary/10" align="start">
                                            <Command className="w-full" dir="rtl">
                                                <CommandInput placeholder="ابحث عن كورس..." className="h-12 border-none focus:ring-0" />
                                                <CommandList className="max-h-[300px]">
                                                    <CommandEmpty className="py-6 text-center text-sm text-muted-foreground font-medium">لم يتم العثور على كورس.</CommandEmpty>
                                                    <CommandGroup heading="قائمة الكورسات" className="p-2">
                                                        {courses.map((course) => (
                                                            <CommandItem
                                                                key={course.id}
                                                                value={course.title}
                                                                onSelect={() => {
                                                                    handleChange("courseId", course.id)
                                                                    setOpenCourse(false)
                                                                }}
                                                                className="flex items-center justify-between py-3 px-3 rounded-lg cursor-pointer aria-selected:bg-emerald-50 aria-selected:text-emerald-600 transition-colors text-right"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold">{course.title}</span>
                                                                    <span className="text-[10px] text-muted-foreground">{course.subject} - {course.grade}</span>
                                                                </div>
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4 text-emerald-600",
                                                                        formData.courseId === course.id ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            {/* Selection Summary */}
                            {(selectedStudent || selectedCourse) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                    {selectedStudent && (
                                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 border-dashed animate-in fade-in slide-in-from-top-2">
                                            <h5 className="text-[10px] font-bold text-primary mb-2 uppercase tracking-wider">تفاصيل الطالب</h5>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm">{selectedStudent.name}</span>
                                                <span className="text-xs text-muted-foreground">{selectedStudent.phone}</span>
                                            </div>
                                        </div>
                                    )}
                                    {selectedCourse && (
                                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 border-dashed animate-in fade-in slide-in-from-top-2">
                                            <h5 className="text-[10px] font-bold text-emerald-600 mb-2 uppercase tracking-wider">تفاصيل الكورس</h5>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-emerald-700">{selectedCourse.title}</span>
                                                <span className="text-xs text-muted-foreground">{selectedCourse.price} ج.م</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex gap-3 text-blue-700 text-sm leading-relaxed">
                        <Info className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>سيتم تفعيل الاشتراك للطالب مباشرة بعد الإتمام. يمكنك إدارة الاشتراكات وتعديل حالاتها من لوحة التحكم الرئيسية.</p>
                    </div>
                </div>

                {/* Sidebar: Settings */}
                <div className="space-y-6">
                    <Card className="p-6 sticky top-6 border-none shadow-sm">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-lg">إعدادات الاشتراك</h3>
                            </div>

                            {/* Payment Method Selection */}
                            <FormSelect
                                label="طريقة الدفع"
                                icon={CreditCard}
                                value={formData.paymentMethod}
                                onValueChange={(val) => handleSelectChange("paymentMethod", val)}
                                options={[
                                    { label: "كاش (نقداً)", value: "CASH" },
                                    { label: "فوري", value: "FAWRY" },
                                    { label: "فودافون كاش", value: "VODAFONE_CASH" },
                                    { label: "تحويل بنكي", value: "BANK_TRANSFER" },
                                ]}
                            />

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-lg font-bold gap-2 shadow-lg shadow-primary/20"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            إنشاء الاشتراك
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </form>
    )
}
