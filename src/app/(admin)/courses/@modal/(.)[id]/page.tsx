import { Modal } from "@/components/ui/modal-parallel"
import { fetchAPI } from "@/lib/api"
import { APICourse } from "@/features/admin/courses/types"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, FileText, MonitorPlay, Users } from "lucide-react"

// Types needed for this view
// Response is { success: true, data: APICourse }

export default async function CourseModal({ params }: { params: { id: string } }) {
    const { id } = await params
    let course: APICourse | null = null;
    let errorMsg = "";

    try {
        console.log("id",id);
        
        course = await fetchAPI<APICourse>(`/api/courses/${id}`);
   
        
    } catch (error: any) {
        console.error("Failed to fetch course details:", error);
        errorMsg = error.message || "Failed to load course";
    }

    if (!course && !errorMsg) return null;

    if (errorMsg) {
        return (
            <Modal>
                <div className="text-center p-6 text-destructive">
                    <p>خطأ في تحميل بيانات الكورس</p>
                    <p className="text-sm opacity-80">{errorMsg}</p>
                </div>
            </Modal>
        )
    }

    if (!course) return null;

    // Calculations
    const totalVideos = course.sections.reduce((acc, sec) => acc + sec.lessons.filter(l => l.type === 'VIDEO').length, 0);
    const totalFiles = course.sections.reduce((acc, sec) => acc + sec.lessons.filter(l => l.type === 'FILE').length, 0);

    return (
        <Modal className="max-w-2xl">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold">{course.title}</h2>
                    <p className="text-muted-foreground">{course.grade} - {course.subject}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                            <MonitorPlay className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">عدد الفيديوهات</p>
                            <p className="font-bold text-lg">{totalVideos}</p>
                        </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">عدد الملفات</p>
                            <p className="font-bold text-lg">{totalFiles}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        محتوى الكورس
                    </h3>

                    <div className="space-y-4 h-[300px] overflow-y-auto pr-2">
                        {course.sections.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">لا يوجد محتوى مضاف بعد.</p>
                        ) : (
                            course.sections.sort((a, b) => a.order - b.order).map((section) => (
                                <div key={section.id} className="border rounded-lg p-4 bg-muted/10">
                                    <h4 className="font-medium mb-2 text-primary">{section.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-3">{section.description}</p>

                                    <div className="space-y-2">
                                        {section.lessons.length > 0 ? (
                                            section.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
                                                <div key={lesson.id} className="flex items-center gap-3 text-sm p-2 bg-background rounded border">
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
        </Modal>
    )
}
