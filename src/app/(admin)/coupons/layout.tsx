import CouponsHeader from "@/features/admin/coupons/components/organisms/CouponsHeader";
import { ReactNode } from "react";

export default function CouponsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-6">
            <CouponsHeader />
            <div className="bg-card rounded-xl border shadow-sm p-6">
                {children}
            </div>
        </div>
    );
}
