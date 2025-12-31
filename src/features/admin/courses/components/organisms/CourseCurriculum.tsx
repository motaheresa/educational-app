import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus } from "lucide-react"

export function CourseCurriculum() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <div className="rounded-md bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/20">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle>منهج الكورس</CardTitle>
                        <CardDescription>إدارة الدروس والمحتوى (فيديوهات، ملفات، امتحانات)</CardDescription>
                    </div>
                </div>
                <Button variant="secondary" size="sm" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400">
                    <Plus className="ml-2 h-4 w-4" />
                    درس جديد
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Example Lesson Item */}
                    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                                01
                            </div>
                            <span className="font-medium">مقدمة في الفيزياء الحديثة</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Button variant="ghost" size="icon">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                >
                                    <path
                                        d="M5.5 3C5.5 3.27614 5.27614 3.5 5 3.5C4.72386 3.5 4.5 3.27614 4.5 3C4.5 2.72386 4.72386 2.5 5 2.5C5.27614 2.5 5.5 2.72386 5.5 3ZM5.5 7.5C5.5 7.77614 5.27614 8 5 8C4.72386 8 4.5 7.77614 4.5 7.5C4.5 7.22386 4.72386 7 5 7C5.27614 7 5.5 7.22386 5.5 7.5ZM5.5 12C5.5 12.2761 5.27614 12.5 5 12.5C4.72386 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.72386 11.5 5 11.5C5.27614 11.5 5.5 11.7239 5.5 12ZM9.5 3C9.5 3.27614 9.27614 3.5 9 3.5C8.72386 3.5 8.5 3.27614 8.5 3C8.5 2.72386 8.72386 2.5 9 2.5C9.27614 2.5 9.5 2.72386 9.5 3ZM9.5 7.5C9.5 7.77614 9.27614 8 9 8C8.72386 8 8.5 7.77614 8.5 7.5C8.5 7.22386 8.72386 7 9 7C9.27614 7 9.5 7.22386 9.5 7.5ZM9.5 12C9.5 12.2761 9.27614 12.5 9 12.5C8.72386 12.5 8.5 12.2761 8.5 12C8.5 11.7239 8.72386 11.5 9 11.5C9.27614 11.5 9.5 11.7239 9.5 12Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium dark:bg-indigo-900/30">
                                    02
                                </div>
                                <span className="font-medium">قوانين الحركة لنيوتن</span>
                            </div>
                            <Button variant="ghost" size="icon">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                >
                                    <path
                                        d="M5.5 3C5.5 3.27614 5.27614 3.5 5 3.5C4.72386 3.5 4.5 3.27614 4.5 3C4.5 2.72386 4.72386 2.5 5 2.5C5.27614 2.5 5.5 2.72386 5.5 3ZM5.5 7.5C5.5 7.77614 5.27614 8 5 8C4.72386 8 4.5 7.77614 4.5 7.5C4.5 7.22386 4.72386 7 5 7C5.27614 7 5.5 7.22386 5.5 7.5ZM5.5 12C5.5 12.2761 5.27614 12.5 5 12.5C4.72386 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.72386 11.5 5 11.5C5.27614 11.5 5.5 11.7239 5.5 12ZM9.5 3C9.5 3.27614 9.27614 3.5 9 3.5C8.72386 3.5 8.5 3.27614 8.5 3C8.5 2.72386 8.72386 2.5 9 2.5C9.27614 2.5 9.5 2.72386 9.5 3ZM9.5 7.5C9.5 7.77614 9.27614 8 9 8C8.72386 8 8.5 7.77614 8.5 7.5C8.5 7.22386 8.72386 7 9 7C9.27614 7 9.5 7.22386 9.5 7.5ZM9.5 12C9.5 12.2761 9.27614 12.5 9 12.5C8.72386 12.5 8.5 12.2761 8.5 12C8.5 11.7239 8.72386 11.5 9 11.5C9.27614 11.5 9.5 11.7239 9.5 12Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </Button>
                        </div>
                        {/* Nested Content Example */}
                        <div className="mr-12 rounded-lg border bg-muted/30 p-4">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                                </span>
                                <div>
                                    <p className="text-sm font-medium">شرح القانون الأول</p>
                                    <p className="text-xs text-muted-foreground">شرح مفصل للقانون الأول مع أمثلة عملية من الحياة اليومية.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
