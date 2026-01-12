import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
    value: string
    label: string
}

interface FormSelectProps {
    label: string
    value?: string
    onValueChange: (value: string) => void
    placeholder?: string
    options: Option[]
    icon?: LucideIcon
    className?: string
    dir?: "ltr" | "rtl"
}

export function FormSelect({
    label,
    value,
    onValueChange,
    placeholder,
    options,
    icon: Icon,
    className,
    dir = "rtl"
}: FormSelectProps) {
    return (
        <div className="space-y-2 text-right">
            <Label className="text-sm font-semibold text-foreground">{label}</Label>
            <div className="relative">
                <Select dir={dir} value={value} onValueChange={onValueChange}>
                    <SelectTrigger className={cn("h-11! w-full pl-4 pr-10", className)}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {Icon && (
                    <Icon className="absolute left-auto right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
                )}
            </div>
        </div>
    )
}
