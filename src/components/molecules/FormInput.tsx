import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    icon?: LucideIcon
}

export function FormInput({ label, id, name, className, icon: Icon, ...props }: FormInputProps) {
    return (
        <div className="space-y-2 text-right">
            <Label htmlFor={id || name} className="text-sm font-semibold text-foreground">{label}</Label>
            <div className="relative">
                <Input
                
                    id={id || name}
                    name={name}
                    className={cn("pl-4 pr-10 h-11", className)}
                    {...props}
                />
                {Icon && (
                    <Icon className="absolute left-auto right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                )}
            </div>
        </div>
    )
}
