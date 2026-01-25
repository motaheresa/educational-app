"use client"

import { useState, useEffect } from "react"
import { Plus, BookOpen, Clock, GraduationCap, LayoutGrid } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/molecules/FormInput"
import { useUpdateExam } from "../../hooks/useUpdateExam"
import { ExamFormHeader } from "./ExamFormHeader"
import { QuestionForm } from "../molecules/QuestionForm"
import { APICourse, Section } from "@/features/admin/courses/types"
import { APIExam } from "../../types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { fetchAPI } from "@/lib/api"
import { toast } from "sonner"

interface UpdateExamFormProps {
    id: string
    initialData: APIExam
    courses: APICourse[]
}

export function UpdateExamForm({ id, initialData, courses }: UpdateExamFormProps) {
    const {
        formData,
        isSubmitting,
        handleChange,
        handleSelectChange,
        addQuestion,
        removeQuestion,
        updateQuestion,
        updateQuestionHeader,
        addOption,
        removeOption,
        updateOption,
        handleSubmit
    } = useUpdateExam(id, initialData)

    const [sections, setSections] = useState<Section[]>([])
    const [isLoadingSections, setIsLoadingSections] = useState(false)

    // Fetch sections when course changes
    useEffect(() => {
        if (!formData.courseId) {
            setSections([])
            return
        }

        const loadSections = async () => {
            setIsLoadingSections(true)
            try {
                const res = await fetchAPI(`/api/courses/${formData.courseId}`) as { sections?: Section[] }
                setSections(res.sections || [])
            } catch (error) {
                console.error("Error fetching sections:", error)
                toast.error("فشل تحميل قائمة الأقسام")
            } finally {
                setIsLoadingSections(false)
            }
        }

        loadSections()
    }, [formData.courseId])

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8" dir="rtl">
            <ExamFormHeader
                title="تعديل الامتحان"
                isSubmitting={isSubmitting}
                onCancel={`/exams/${id}`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Questions */}
                <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <BookOpen className="size-6 text-primary" />
                            أسئلة الامتحان
                        </h3>
                        <Button type="button" onClick={addQuestion} className="gap-2">
                            <Plus className="size-4" />
                            إضافة سؤال
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {formData.questions.map((question, index) => (
                            <QuestionForm
                                key={index}
                                index={index + 1}
                                question={question}
                                onUpdate={(updates) => updateQuestion(index, updates)}
                                onUpdateHeader={(text) => updateQuestionHeader(index, text)}
                                onRemove={() => removeQuestion(index)}
                                onAddOption={() => addOption(index)}
                                onRemoveOption={(oIndex) => removeOption(index, oIndex)}
                                onUpdateOption={(oIndex, updates) => updateOption(index, oIndex, updates)}
                            />
                        ))}
                    </div>

                    {formData.questions.length > 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addQuestion}
                            className="w-full border-dashed h-20 text-muted-foreground hover:text-primary hover:border-primary transition-all gap-2"
                        >
                            <Plus className="size-5" />
                            إضافة سؤال جديد
                        </Button>
                    )}
                </div>

                {/* Sidebar: Settings */}
                <div className="lg:col-span-1 space-y-8 order-1 lg:order-2">
                    <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                        <div className="p-4 border-b bg-muted/30">
                            <h4 className="font-bold flex items-center gap-2">
                                <LayoutGrid className="size-4 text-primary" />
                                إعدادات الامتحان
                            </h4>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            {/* Course Selection */}
                            <div className="space-y-2">
                                <Label>الكورس المستهدف</Label>
                                <Select value={formData.courseId} onValueChange={(val) => handleSelectChange("courseId", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر الكورس" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map(course => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Section Selection */}
                            <div className="space-y-2">
                                <Label>القسم / الوحدة</Label>
                                <Select
                                    value={formData.sectionId}
                                    onValueChange={(val) => handleSelectChange("sectionId", val)}
                                    disabled={!formData.courseId || isLoadingSections}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={isLoadingSections ? "جاري التحميل..." : "اختر القسم"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sections.map(section => (
                                            <SelectItem key={section.id} value={section.id}>
                                                {section.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />

                            {/* Title */}
                            <FormInput
                                id="title"
                                name="title"
                                label="عنوان الامتحان"
                                placeholder="مثلاً: امتحان الوحدة الأولى"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                            {/* Duration */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Clock className="size-4 text-muted-foreground" />
                                    المدة الزمنية (بالدقائق)
                                </Label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Total Degree */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-xs">
                                        <GraduationCap className="size-3 text-muted-foreground" />
                                        الدرجة الكلية
                                    </Label>
                                    <input
                                        type="number"
                                        name="totalDegree"
                                        value={formData.totalDegree}
                                        onChange={handleChange}
                                        className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                {/* Pass Degree */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-xs">
                                        <GraduationCap className="size-3 text-muted-foreground" />
                                        درجة النجاح
                                    </Label>
                                    <input
                                        type="number"
                                        name="passDegree"
                                        value={formData.passDegree}
                                        onChange={handleChange}
                                        className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </div>
            </div>
        </form>
    )
}
