import { SettingsSidebar, settingsNavItems } from "@/features/admin/settings/components/SettingsSidebar"
import { PageHeader } from "@/features/admin/components/molecules/PageTitle"

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="space-y-6 block" dir="rtl">
            <PageHeader
                title="الإعدادات"
                subtitle="إدارة ملفك الشخصي، إعدادات الحساب وتفضيلات المنصة"
                className="px-0 sm:px-0"
            />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0">
                <aside className="lg:w-1/4 bg-card p-4 rounded-4xl border h-fit shadow-sm lg:sticky lg:top-8">
                    <SettingsSidebar items={settingsNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-4xl bg-card rounded-xl border shadow-sm p-6 min-h-[600px]">
                    {children}
                </div>
            </div>
        </div>
    )
}
