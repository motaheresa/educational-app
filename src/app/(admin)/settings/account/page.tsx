"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, EyeOff, CheckCircle2, ShieldCheck, Info } from "lucide-react"

export default function AccountSettingsPage() {
    return (
        <div className="space-y-6">
           <div className="flex justify-between items-start">
             <div>
                <h3 className="text-lg font-medium">إعدادات الحساب</h3>
                <p className="text-sm text-muted-foreground">
                    تحديث معلومات الدخول والأمان لحسابك
                </p>
            </div>
            <div className="flex justify-start gap-4">
                <Button>حفظ التغييرات</Button>
            </div>
           </div>
            <Separator />

            {/* Email Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                    <Mail className="h-5 w-5" />
                    <h4 className="font-medium">البريد الإلكتروني</h4>
                </div>

                <div className="space-y-2 max-w-xl">
                    <Label htmlFor="email">عنوان البريد الإلكتروني</Label>
                    <div className="relative">
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <span className="text-muted-foreground">@</span>
                        </div>
                        <Input
                            id="email"
                            defaultValue="teacher.ahmed@platform.pro"
                            className="bg-muted/50 text-left pr-10"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        سيتم استخدام هذا البريد الإلكتروني لتسجيل الدخول واستقبال الإشعارات.
                    </p>
                </div>
            </div>

            <Separator className="my-6" />

            {/* Password Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                    <h4 className="font-medium">تغيير كلمة المرور</h4>
                </div>

                <div className="space-y-4 max-w-xl">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                        <div className="relative">
                            <Input id="current-password" type="password" placeholder="........." />
                            <EyeOff className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                            <div className="relative">
                                <Input id="new-password" type="password" placeholder="أدخل كلمة مرور قوية" />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                            <div className="relative">
                                <Input id="confirm-password" type="password" placeholder="أعد إدخال كلمة المرور" />
                                <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}
