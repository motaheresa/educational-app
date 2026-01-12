import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
}

export function FormTextarea({ label, id, name, className, ...props }: FormTextareaProps) {
    return (
        <div className="space-y-2 text-right md:col-span-2">
            <Label htmlFor={id || name} className="text-sm font-semibold text-foreground">{label}</Label>
            <Textarea
                id={id || name}
                name={name}
                className={cn("min-h-[120px] resize-none", className)}
                {...props}
            />
        </div>
    )
}
