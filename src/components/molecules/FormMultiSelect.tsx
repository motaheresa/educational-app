"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { LucideIcon } from "lucide-react"

export interface Option {
    value: string
    label: string
}

interface FormMultiSelectProps {
    label: string
    placeholder?: string
    options: Option[]
    value: string[]
    onValueChange: (value: string[]) => void
    icon?: LucideIcon
    className?: string
    disabled?: boolean
}

export function FormMultiSelect({
    label,
    placeholder = "Select options...",
    options,
    value,
    onValueChange,
    icon: Icon,
    className,
    disabled
}: FormMultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: string) => {
        onValueChange(value.filter((i) => i !== item))
    }

    return (
        <div className="space-y-2 text-right">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                {Icon && <Icon className="size-4 text-primary" />}
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between h-auto min-h-11 px-4 py-2 hover:bg-background",
                            className
                        )}
                        disabled={disabled}
                    >
                        <div className="flex flex-wrap gap-1 items-center">
                            {value.length > 0 ? (
                                value.map((val) => (
                                    <Badge
                                        key={val}
                                        variant="secondary"
                                        className="mr-1 mb-1 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleUnselect(val)
                                        }}
                                    >
                                        {options.find((option) => option.value === val)?.label || val}
                                        <div
                                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleUnselect(val)
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleUnselect(val)
                                            }}
                                        >
                                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                        </div>
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-muted-foreground">{placeholder}</span>
                            )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                        <CommandInput placeholder="ابحث..." />
                        <CommandEmpty>لا توجد نتائج.</CommandEmpty>
                        <CommandList>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label} // Use label for searching
                                        onSelect={() => {
                                            const isSelected = value.includes(option.value)
                                            if (isSelected) {
                                                onValueChange(value.filter((val) => val !== option.value))
                                            } else {
                                                onValueChange([...value, option.value])
                                            }
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value.includes(option.value) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
