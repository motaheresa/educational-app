"use client"

import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, GraduationCap, BookOpen, CheckCircle2, XCircle } from "lucide-react"
import { APIExam, Question } from "../../types"
import { cn } from "@/lib/utils"

interface ExamDetailsContentProps {
    exam: APIExam
}

export function ExamDetailsContent({ exam }: ExamDetailsContentProps) {
    return (
        <div className="space-y-8" dir="rtl">
            {/* Exam Metadata Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetadataCard
                    icon={<Clock className="size-5 text-blue-500" />}
                    label="المدة الزمنية"
                    value={`${exam.duration} دقيقة`}
                    bgColor="bg-blue-50"
                />
                <MetadataCard
                    icon={<GraduationCap className="size-5 text-emerald-500" />}
                    label="درجة النجاح"
                    value={`${exam.passDegree} / ${exam.totalDegree}`}
                    bgColor="bg-emerald-50"
                />
                <MetadataCard
                    icon={<BookOpen className="size-5 text-purple-500" />}
                    label="عدد الأسئلة"
                    value={`${exam.questionsCount} سؤال`}
                    bgColor="bg-purple-50"
                />
            </div>

            {/* Questions List */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <BookOpen className="size-6 text-primary" />
                    أسئلة الامتحان
                </h3>

                <div className="space-y-4">
                    {exam.questions?.map((question, index) => (
                        <QuestionCard key={question.id} question={question} index={index + 1} />
                    ))}
                    {(!exam.questions || exam.questions.length === 0) && (
                        <div className="text-center py-12 border rounded-xl bg-muted/20 text-muted-foreground">
                            لا توجد أسئلة مضافة لهذا الامتحان حالياً.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function MetadataCard({ icon, label, value, bgColor }: { icon: React.ReactNode, label: string, value: string, bgColor: string }) {
    return (
        <div className={cn("p-6 rounded-xl border flex items-center gap-4 bg-card shadow-sm")}>
            <div className={cn("p-3 rounded-lg", bgColor)}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground font-amin!">{label}</p>
                <p className="text-lg font-bold">{value}</p>
            </div>
        </div>
    )
}

function QuestionCard({ question, index }: { question: Question, index: number }) {
    return (
        <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
            <div className="bg-muted/30 p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {index}
                    </span>
                    <h4 className="font-bold text-lg">{question.header.text}</h4>
                </div>
                <Badge variant="outline" className="bg-background">
                    {question.degree} درجات
                </Badge>
            </div>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option) => (
                        <div
                            key={option.id}
                            className={cn(
                                "p-4 rounded-lg border flex items-center justify-between gap-3 transition-colors",
                                option.isCorrect
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                                    : "bg-muted/10 border-muted hover:bg-muted/20"
                            )}
                        >
                            <span className="font-medium">{option.text}</span>
                            {option.isCorrect ? (
                                <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                            ) : (
                                <XCircle className="size-5 text-muted-foreground/30 shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                        {question.type === "MCQ" ? "اختيار من متعدد" : "صح أو خطأ"}
                    </Badge>
                </div>
            </CardContent>
        </div>
    )
}
