"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Bell, Palette, Monitor, Moon, Sun, Laptop, ShieldCheck } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function PlatformSettingsPage() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium">إعدادات المنصة</h3>
                    <p className="text-sm text-muted-foreground">
                        تخصيص تجربة الاستخدام وتفضيلات الإشعارات
                    </p>
                </div>
                <div className="flex justify-end gap-4">
                    <Button size="lg" className="min-w-[150px]">حفظ التغييرات</Button>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary">
                    <Bell className="h-5 w-5" />
                    <h4 className="font-medium">تفضيلات الإشعارات</h4>
                </div>

                <div className="space-y-4 bg-muted/30 p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">إشعارات البريد الإلكتروني</Label>
                            <p className="text-xs text-muted-foreground">
                                استلام ملخصات أسبوعية وتحديثات النظام عبر الإيميل
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">الإشعارات داخل التطبيق</Label>
                            <p className="text-xs text-muted-foreground">
                                تنبيهات فورية عند تفاعل الطلاب أو انتهاء الامتحانات
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </div>
            </div>

            <Separator />

            {/* Appearance Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary">
                    <Palette className="h-5 w-5" />
                    <h4 className="font-medium">المظهر ( سمة التطبيق )</h4>
                </div>

                <div className="space-y-4 max-w-xl">

                    <div className="space-y-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Light Mode */}
                            <button
                                onClick={() => setTheme("light")}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all hover:bg-accent hover:text-accent-foreground",
                                    theme === "light" ? "border-primary bg-primary/5 shadow-sm" : "border-muted bg-transparent"
                                )}
                            >
                                <Sun className={cn("h-8 w-8", theme === "light" ? "text-primary fill-primary/20" : "text-muted-foreground")} />
                                <span className={cn("text-sm font-medium", theme === "light" ? "text-primary" : "text-muted-foreground")}>الوضع الفاتح</span>
                            </button>

                            {/* Dark Mode */}
                            <button
                                onClick={() => setTheme("dark")}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all hover:bg-accent hover:text-accent-foreground",
                                    theme === "dark" ? "border-primary bg-primary/5 shadow-sm" : "border-muted bg-transparent"
                                )}
                            >
                                <Moon className={cn("h-8 w-8", theme === "dark" ? "text-primary fill-primary/20" : "text-muted-foreground")} />
                                <span className={cn("text-sm font-medium", theme === "dark" ? "text-primary" : "text-muted-foreground")}>الوضع المظلم</span>
                            </button>

                            {/* System Mode */}
                            <button
                                onClick={() => setTheme("system")}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all hover:bg-accent hover:text-accent-foreground",
                                    theme === "system" ? "border-primary bg-primary/5 shadow-sm" : "border-muted bg-transparent"
                                )}
                            >
                                <Monitor className={cn("h-8 w-8", theme === "system" ? "text-primary fill-primary/20" : "text-muted-foreground")} />
                                <span className={cn("text-sm font-medium", theme === "system" ? "text-primary" : "text-muted-foreground")}>تلقائي</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Privacy Section (Extra filler mostly) */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                    <h4 className="font-medium">إعدادات الخصوصية</h4>
                </div>
                <div className="flex items-center gap-2">
                    <Switch defaultChecked id="privacy" />
                    <Label htmlFor="privacy" className="font-normal">مشاركة بيانات الاستخدام لتحسين التجربة</Label>
                </div>
            </div>


        </div>
    )
}
