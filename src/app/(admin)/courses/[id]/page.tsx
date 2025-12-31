"use server"
import { fetchAPI } from "@/lib/api"
import { APICourse } from "@/features/admin/courses/types"
import { Separator } from "@/components/ui/separator"
import { BookOpen, FileText, MonitorPlay, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params
    let course: APICourse | null = null;
    let errorMsg = "";
    try {
        course = await fetchAPI<APICourse>(`/api/courses/${id}`);
    } catch (error: any) {
        errorMsg = error.message;
    }

    if (errorMsg || !course) {
        return (
            <div className="container p-6">
                <div className="text-center p-6 text-destructive border rounded-xl">
                    <p>خطأ في تحميل بيانات الكورس</p>
                    <p className="text-sm opacity-80">{errorMsg}</p>
                    <div className="mt-4">
                        <Link href="/courses">
                            <Button variant="outline">العودة للكورسات</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Calculations
    const totalVideos = course.sections.reduce((acc, sec) => acc + sec.lessons.filter(l => l.type === 'VIDEO').length, 0);
    const totalFiles = course.sections.reduce((acc, sec) => acc + sec.lessons.filter(l => l.type === 'FILE').length, 0);

    return (
        <div className="container space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/courses">
                    <Button variant="ghost" size="icon">
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-2xl font-bold">{course.title}</h2>
                    <p className="text-muted-foreground">{course.grade} - {course.subject}</p>
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar / Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-card rounded-xl border p-6 space-y-4">
                        <h3 className="font-semibold text-lg">إحصائيات الكورس</h3>

                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                                <MonitorPlay className="w-4 h-4 text-primary" />
                                <span className="text-sm">عدد الفيديوهات</span>
                            </div>
                            <span className="font-bold">{totalVideos}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                <span className="text-sm">عدد الملفات</span>
                            </div>
                            <span className="font-bold">{totalFiles}</span>
                        </div>

                        <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground mb-2">السعر</p>
                            <p className="text-2xl font-bold">{course.price} ج.م</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-card rounded-xl border p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            محتوى الكورس
                        </h3>

                        <div className="space-y-4">
                            {course.sections.length === 0 ? (
                                <p className="text-muted-foreground text-center py-4">لا يوجد محتوى مضاف بعد.</p>
                            ) : (
                                course.sections.sort((a, b) => a.order - b.order).map((section) => (
                                    <div key={section.id} className="border rounded-lg p-4 bg-muted/10">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-primary">{section.title}</h4>
                                            <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border">
                                                {section.lessons.length} درس
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">{section.description}</p>

                                        <div className="space-y-2">
                                            {section.lessons.length > 0 ? (
                                                section.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
                                                    <div key={lesson.id} className="flex items-center gap-3 text-sm p-3 bg-background rounded border hover:bg-muted/50 transition-colors">
                                                        {lesson.type === 'VIDEO' ? (
                                                            <MonitorPlay className="w-4 h-4 text-blue-500" />
                                                        ) : (
                                                            <FileText className="w-4 h-4 text-orange-500" />
                                                        )}
                                                        <span>{lesson.title}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-muted-foreground italic">لا توجد دروس في هذا القسم</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
