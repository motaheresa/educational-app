import { fetchAPI } from "@/lib/api"
import { APICourse } from "@/features/admin/courses/types/index"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit, BookOpen, FileText, Video, DollarSign, GraduationCap, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ErrorState } from "@/components/feedback/ErrorState"
import Image from "next/image"

export default async function ViewCoursePage({ params }: { params: { id: string } }) {
    const { id } = await params

    let course: APICourse | null = null
    let errorMsg = "";

    try {
        course = await fetchAPI<APICourse>(`/api/courses/${id}`)
    } catch (error: any) {
        errorMsg = error.message
        return <ErrorState message={error.message||"خطأ في تحميل بيانات الكورس"} />
    }

    // Calculations
    const totalVideos = course.sections.reduce((acc, sec) => acc + sec.lessons.filter(l => l.type === 'VIDEO').length, 0)
    const totalFiles = course.sections.reduce((acc, sec) => acc + sec.lessons.filter(l => l.type === 'FILE').length, 0)
    const totalLessons = course.sections.reduce((acc, sec) => acc + sec.lessons.length, 0)

    return (
        <div className="container space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/courses">
                        <Button variant="ghost" size="icon">
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{course.title}</h1>
                        <p className="text-muted-foreground mt-1">{course.description}</p>
                    </div>
                </div>
                <Link href={`/courses/${id}/edit`}>
                    <Button>
                        <Edit className="ml-2 h-4 w-4" />
                        تعديل الكورس
                    </Button>
                </Link>
            </div>

            <Separator />

            {/* Course Banner */}
            {course.banner && (
                <Card>
                    <CardContent className="p-0">
                        <img
                            src={course.banner}
                            alt={course.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </CardContent>
                </Card>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">السعر</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{course.price} ج.م</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">إجمالي الدروس</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalLessons}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">عدد الفيديوهات</CardTitle>
                        <Video className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalVideos}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">عدد الملفات</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalFiles}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Course Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            الصف الدراسي
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="secondary" className="text-base">{course.grade}</Badge>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            المادة
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="secondary" className="text-base">{course.subject}</Badge>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            تاريخ الإنشاء
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{new Date(course.createdAt).toLocaleDateString('ar-EG')}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Course Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        محتوى الكورس
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {course.sections.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">لا يوجد محتوى مضاف بعد.</p>
                    ) : (
                        <div className="space-y-4">
                            {course.sections.sort((a, b) => a.order - b.order).map((section, index) => (
                                <div key={section.id} className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline">القسم {index + 1}</Badge>
                                                <h3 className="font-semibold text-lg">{section.title}</h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{section.description}</p>
                                        </div>
                                        <Badge className="bg-primary/10 text-primary">
                                            {section.lessons.length} درس
                                        </Badge>
                                    </div>

                                    {section.lessons.length > 0 && (
                                        <div className="space-y-2 mt-4">
                                            {section.lessons.sort((a, b) => a.order - b.order).map((lesson, lessonIndex) => (
                                                <div
                                                    key={lesson.id}
                                                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                                                >
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border">
                                                        <span className="text-xs font-medium">{lessonIndex + 1}</span>
                                                    </div>
                                                    {lesson.type === 'VIDEO' ? (
                                                        <Video className="w-4 h-4 text-blue-500" />
                                                    ) : (
                                                        <FileText className="w-4 h-4 text-orange-500" />
                                                    )}
                                                    <span className="flex-1">{lesson.title}</span>
                                                    <Badge variant="outline" className="text-xs">
                                                        {lesson.type === 'VIDEO' ? 'فيديو' : 'ملف'}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
