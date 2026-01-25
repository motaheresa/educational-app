"use client"

import { Trash2, Plus, CheckCircle2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { FormInput } from "@/components/molecules/FormInput"
import { CreateExamQuestion, CreateExamOption } from "../../types"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface QuestionFormProps {
    question: CreateExamQuestion
    index: number
    onUpdate: (updates: Partial<CreateExamQuestion>) => void
    onUpdateHeader: (text: string) => void
    onRemove: () => void
    onAddOption: () => void
    onRemoveOption: (oIndex: number) => void
    onUpdateOption: (oIndex: number, updates: Partial<CreateExamOption>) => void
}

export function QuestionForm({
    question,
    index,
    onUpdate,
    onUpdateHeader,
    onRemove,
    onAddOption,
    onRemoveOption,
    onUpdateOption
}: QuestionFormProps) {
    return (
        <div className="border rounded-xl bg-card shadow-sm overflow-hidden" dir="rtl">
            <div className="bg-muted/30 p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                    <span className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                        {index}
                    </span>
                    <input
                        id={`q-${index}-header`}
                        placeholder="أدخل نص السؤال هنا..."
                        value={question.header.text}
                        onChange={(e) => onUpdateHeader(e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none text-lg font-bold p-0 h-auto"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Label className="text-xs text-muted-foreground whitespace-nowrap">الدرجة:</Label>
                        <input
                            type="number"
                            min="1"
                            value={question.degree}
                            onChange={(e) => onUpdate({ degree: Number(e.target.value) })}
                            className="w-16 h-8 rounded-md border bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onRemove}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>

            <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                    <div className="space-y-2 flex-1">
                        <Label>نوع السؤال</Label>
                        <Select
                            value={question.type}
                            onValueChange={(val: "MCQ" | "TRUE_FALSE") => onUpdate({ type: val })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MCQ">اختيار من متعدد</SelectItem>
                                <SelectItem value="TRUE_FALSE">صح أو خطأ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">الاختيارات</Label>
                        {question.type === "MCQ" && (
                            <Button variant="ghost" size="sm" onClick={onAddOption} className="h-8 text-primary gap-1">
                                <Plus className="size-3" />
                                إضافة اختيار
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {question.options.map((option, oIndex) => (
                            <div
                                key={oIndex}
                                className={cn(
                                    "relative p-4 rounded-lg border group transition-all",
                                    option.isCorrect
                                        ? "bg-emerald-50 border-emerald-200"
                                        : "bg-background border-muted"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => onUpdateOption(oIndex, { isCorrect: !option.isCorrect })}
                                        className={cn(
                                            "size-5 rounded-full border-2 flex items-center justify-center transition-all",
                                            option.isCorrect
                                                ? "bg-emerald-500 border-emerald-500 text-white"
                                                : "border-muted-foreground/30 hover:border-primary"
                                        )}
                                    >
                                        {option.isCorrect && <CheckCircle2 className="size-3" />}
                                    </button>
                                    <input
                                        placeholder={`الاختيار ${oIndex + 1}`}
                                        value={option.text}
                                        onChange={(e) => onUpdateOption(oIndex, { text: e.target.value })}
                                        className="bg-transparent border-none focus:outline-none flex-1 text-sm font-medium"
                                    />
                                    {question.type === "MCQ" && question.options.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => onRemoveOption(oIndex)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </div>
    )
}
