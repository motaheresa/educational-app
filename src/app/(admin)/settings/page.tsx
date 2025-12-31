"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Camera } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium">المعلومات الشخصية</h3>
                    <p className="text-sm text-muted-foreground">
                        قم بتحديث صورتك وبياناتك الشخصية
                    </p>
                </div>
                <div className="flex justify-end">
                    <Button>حفظ التغييرات</Button>
                </div>
            </div>
            <Separator />

            <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar Section */}
                <div className="md:w-1/3 flex flex-col items-center gap-4">
                    <div className="relative group cursor-pointer">
                        <Avatar className="h-40 w-40 border-4 border-muted">
                            {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
                            {/* Use a placeholder image or component */}
                            <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                                {/* Illustration placeholder */}
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" alt="Avatar" className="w-full h-full" />
                            </div>
                        </Avatar>
                        <div className="absolute bottom-1 right-2 bg-background p-2 rounded-full border shadow-sm text-primary hover:bg-muted transition-colors">
                            <Camera className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-xs text-muted-foreground">صيغ مسموحة JPG, PNG</p>
                        <p className="text-xs text-muted-foreground">الحد الأقصى 2MB</p>
                    </div>
                </div>
                {/* Form Fields */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">الاسم الأول</Label>
                            <Input id="firstName" defaultValue="أحمد" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">اسم العائلة</Label>
                            <Input id="lastName" defaultValue="علي" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle">المسمى الوظيفي</Label>
                            <Input id="jobTitle" defaultValue="مدرس رياضيات أول" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <div className="relative">
                                <Input id="phone" defaultValue="123 4567" className="pl-14 text-left" dir="ltr" />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm border-r pr-2 h-5 flex items-center">
                                    +20
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">نبذة عنك</Label>
                        <Textarea
                            id="bio"
                            className="min-h-[120px] resize-none"
                            defaultValue="مدرس رياضيات خبرة 10 سنوات في تدريس المناهج المتقدمة. شغوف بتبسيط العلوم واستخدام التكنولوجيا في التعليم."
                        />
                    </div>
                </div>

               
            </div>
        </div>
    )
}
