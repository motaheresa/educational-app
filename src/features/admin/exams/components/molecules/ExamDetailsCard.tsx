"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { FileText, GraduationCap, HelpCircle, CheckCircle } from "lucide-react"
import { FormInput } from "@/components/molecules/FormInput"
import { FormSelect } from "@/components/molecules/FormSelect"

interface ExamDetailsCardProps {
    examName: string
    course: string
    duration: string
    questionsCount: string
    passingScore: string
    shuffleQuestions: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSelectChange: (name: string, value: string) => void
    onSwitchChange: (checked: boolean) => void
}

export function ExamDetailsCard({
    examName,
    course,
    duration,
    questionsCount,
    passingScore,
    shuffleQuestions,
    onChange,
    onSelectChange,
    onSwitchChange
}: ExamDetailsCardProps) {
    return (
        <div className="space-y-6">
            {/* Exam Name */}
            <FormInput
                id="examName"
                name="examName"
                label="اسم الامتحان"
                placeholder="مثال: امتحان منتصف الفصل - رياضيات"
                className="pl-10 text-right"
                value={examName}
                onChange={onChange}
                required
                icon={FileText}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Course Select */}
                <FormSelect
                    label="اختيار الكورس"
                    placeholder="اختر الكورس التابع للامتحان..."
                    value={course}
                    onValueChange={(val) => onSelectChange("course", val)}
                    options={[
                        { value: "math", label: "الرياضيات المتقدمة" },
                        { value: "physics", label: "الفيزياء الحديثة" },
                        { value: "chemistry", label: "الكيمياء العضوية" }
                    ]}
                    icon={GraduationCap}
                    dir="rtl"
                />

                {/* Duration */}
                <FormInput
                    id="duration"
                    name="duration"
                    label="مدة الامتحان (بالدقيقة)"
                    type="number"
                    placeholder="60"
                    className="pl-10 text-right"
                    value={duration}
                    onChange={onChange}
                    required
                // Note: Custom unit display logic from original file is simplified here for now to fit FormInput
                // ideally FormInput should support suffixes or we add it to the generic component
                />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Questions Count */}
                <FormInput
                    id="questionsCount"
                    name="questionsCount"
                    label="عدد الأسئلة"
                    type="number"
                    placeholder="20"
                    className="pl-10 text-right"
                    value={questionsCount}
                    onChange={onChange}
                    required
                    icon={HelpCircle}
                />

                {/* Passing Score */}
                <FormInput
                    id="passingScore"
                    name="passingScore"
                    label="درجة النجاح (%)"
                    type="number"
                    placeholder="50"
                    className="pl-10 text-right"
                    value={passingScore}
                    onChange={onChange}
                    required
                    icon={CheckCircle}
                />
            </div>

            {/* Shuffle Switch */}
            <div className="flex items-center justify-end gap-2 border-t pt-4">
                <Label htmlFor="shuffle" className="cursor-pointer text-right">
                    <div className="text-sm font-medium">خلط ترتيب الأسئلة عشوائياً</div>
                    <div className="text-xs text-muted-foreground">سيتم عرض الأسئلة بترتيب مختلف لكل طالب عند تفعيل هذا الخيار.</div>
                </Label>
                <Switch
                    id="shuffle"
                    checked={shuffleQuestions}
                    onCheckedChange={onSwitchChange}
                />
            </div>
        </div>
    )
}
