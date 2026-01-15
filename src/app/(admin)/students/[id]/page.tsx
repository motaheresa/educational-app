import { fetchAPI } from "@/lib/api"
import { APIStudentDetails } from "@/features/admin/students/types"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit, Phone, Mail, FileText, Calendar, User, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ErrorState } from "@/components/feedback/ErrorState"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/atoms/StatusBadge"
import { StudentsDeleteAction } from "@/features/admin/students/components/molecules/StudentsDeleteAction"

export default async function StudentDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params

    let student: APIStudentDetails | null = null

    try {
        const payload = await fetchAPI<APIStudentDetails>(`/api/students/${id}`)
        console.log("payload", payload);

        if (payload) {
            student = payload
        }
    } catch (error: any) {
        console.error("Failed to fetch student details:", error);
        return <ErrorState message={"خطأ في تحميل بيانات الطالب"} />
    }

    if (!student) {
        return <ErrorState message={"الطالب غير موجود او حدث خطا في تحميل البيانات"} />
    }

    const initials = student.name?.charAt(0)?.toUpperCase()

    return (
        <div className="container space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/students">
                        <Button variant="ghost" size="icon">
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-border">
                            {/* Assuming image might be part of details later, though not in type currently for details but was in list type. 
                                Checking types again, APIStudentDetails doesn't have image in my added type, but APIStudent did. 
                                Let's assume it might not be there or I should add it if available. 
                                For now, relying on name fallback.
                            */}
                            <AvatarImage src={student?.image} alt={student.name} />
                            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold">{student.name}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <Mail className="h-4 w-4" />
                                <span>{student.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`/students/${id}/edit`}>
                        <Button variant="outline">
                            <Edit className="ml-2 h-4 w-4" />
                            تعديل البيانات
                        </Button>
                    </Link>
                    <StudentsDeleteAction studentId={id} />
                </div>
            </div>

            <Separator />

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">رقم الهاتف</CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold" dir="ltr">{student.phone}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">هاتف ولي الأمر</CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold" dir="ltr">{student.parentPhone}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">الحالة</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {/* Mapping string status to StatusBadge accepted variants */}
                        <div className="flex">
                            <StatusBadge status={
                                student.status === 'ACTIVE' ? 'active' :
                                    student.status === 'BLOCKED' ? 'inactive' :
                                        'soon' // default/fallback
                            } />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">تاريخ التسجيل</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">
                            {new Date(student.createdAt).toLocaleDateString('ar-EG')}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Notes Section - Full Width */}
            {student.notes && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <FileText className="h-5 w-5" />
                            ملاحظات
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{student.notes}</p>
                    </CardContent>
                </Card>
            )}

            {/* Enrolled Courses */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        الكورسات المشترك بها
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {student.courses.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">لا يوجد كورسات مشترك بها.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {student.courses.map((enrollment) => (
                                <Link key={enrollment.id} href={`/courses/${enrollment.courseId}`}>
                                    <div className="group border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer bg-card hover:bg-accent/5">
                                        <div className="flex items-start justify-between mb-2">
                                            <Badge variant="outline">{enrollment.course.subject}</Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(enrollment.createdAt).toLocaleDateString('ar-EG')}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                            {enrollment.course.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                            <Badge variant="secondary" className="text-xs">
                                                {enrollment.course.grade}
                                            </Badge>
                                            <span>{enrollment.course.price} ج.م</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
