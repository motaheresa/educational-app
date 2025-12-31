"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Plus, Trash2, Video, FileText } from "lucide-react"
import { Section, Lesson } from "@/features/admin/courses/types/create"
import { useState } from "react"

interface CourseCurriculumProps {
    sections: Section[]
    onChange: (sections: Section[]) => void
}

export function CourseCurriculum({ sections, onChange }: CourseCurriculumProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null)

    const addSection = () => {
        const newSection: Section = {
            id: Date.now().toString(),
            title: "",
            description: "",
            order: sections.length + 1,
            lessons: []
        }
        onChange([...sections, newSection])
        setExpandedSection(newSection.id)
    }

    const removeSection = (sectionId: string) => {
        onChange(sections.filter(s => s.id !== sectionId))
    }

    const updateSection = (sectionId: string, field: keyof Section, value: any) => {
        onChange(sections.map(s =>
            s.id === sectionId ? { ...s, [field]: value } : s
        ))
    }

    const addLesson = (sectionId: string) => {
        onChange(sections.map(s => {
            if (s.id === sectionId) {
                const newLesson: Lesson = {
                    id: Date.now().toString(),
                    title: "",
                    type: "VIDEO",
                    order: s.lessons.length + 1
                }
                return { ...s, lessons: [...s.lessons, newLesson] }
            }
            return s
        }))
    }

    const removeLesson = (sectionId: string, lessonId: string) => {
        onChange(sections.map(s =>
            s.id === sectionId
                ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) }
                : s
        ))
    }

    const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: any) => {
        onChange(sections.map(s =>
            s.id === sectionId
                ? {
                    ...s,
                    lessons: s.lessons.map(l =>
                        l.id === lessonId ? { ...l, [field]: value } : l
                    )
                }
                : s
        ))
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <div className="rounded-md bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/20">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle>منهج الكورس</CardTitle>
                        <CardDescription>إدارة الأقسام والدروس</CardDescription>
                    </div>
                </div>
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={addSection}
                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400"
                >
                    <Plus className="ml-2 h-4 w-4" />
                    قسم جديد
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sections.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>لا توجد أقسام بعد. اضغط "قسم جديد" للبدء</p>
                        </div>
                    ) : (
                        sections.map((section, index) => (
                            <div key={section.id} className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            placeholder="عنوان القسم"
                                            value={section.title}
                                            onChange={(e) => updateSection(section.id, "title", e.target.value)}
                                        />
                                        <Input
                                            placeholder="وصف القسم"
                                            value={section.description}
                                            onChange={(e) => updateSection(section.id, "description", e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeSection(section.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>

                                {/* Lessons */}
                                <div className="mr-4 space-y-2">
                                    {section.lessons.map((lesson) => (
                                        <div key={lesson.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                                            <select
                                                value={lesson.type}
                                                onChange={(e) => updateLesson(section.id, lesson.id, "type", e.target.value as "VIDEO" | "FILE")}
                                                className="px-2 py-1 rounded border text-sm"
                                            >
                                                <option value="VIDEO">فيديو</option>
                                                <option value="FILE">ملف</option>
                                            </select>
                                            <Input
                                                placeholder="عنوان الدرس"
                                                value={lesson.title}
                                                onChange={(e) => updateLesson(section.id, lesson.id, "title", e.target.value)}
                                                className="flex-1"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeLesson(section.id, lesson.id)}
                                            >
                                                <Trash2 className="h-3 w-3 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addLesson(section.id)}
                                        className="w-full"
                                    >
                                        <Plus className="ml-2 h-3 w-3" />
                                        درس جديد
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
