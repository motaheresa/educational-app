"use client"

import Link from "next/link"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExamDetailsCard } from "@/features/admin/exams/components/molecules/ExamDetailsCard"
import { useCreateExam } from "@/features/admin/exams/hooks/useCreateExam"

export function CreateExamForm() {
    const {
        formData,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleSwitchChange,
        handleSubmit
    } = useCreateExam()

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-6">
                {/* Form Card */}
                <CardHeader className="p-0!">
                    <CardTitle className="text-xl font-bold">تفاصيل الامتحان</CardTitle>
                    <CardDescription>أدخِل جميع المعلومات المطلوبة لإنشاء امتحان جديد بنجاح.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <ExamDetailsCard
                        examName={formData.examName}
                        course={formData.course}
                        duration={formData.duration}
                        questionsCount={formData.questionsCount}
                        passingScore={formData.passingScore}
                        shuffleQuestions={formData.shuffleQuestions}
                        onChange={handleChange}
                        onSelectChange={handleSelectChange}
                        onSwitchChange={handleSwitchChange}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-row-reverse gap-4 mt-10">
                        <Button type="submit" className="h-11 px-8 gap-2 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Save className="size-4" />
                            )}
                            حفظ الامتحان
                        </Button>
                        <Button variant="outline" type="button" className="h-11 px-8 text-muted-foreground" asChild>
                            <Link href="/exams">إلغاء</Link>
                        </Button>
                    </div>
                </CardContent>
            </div>
        </form>
    )
}
