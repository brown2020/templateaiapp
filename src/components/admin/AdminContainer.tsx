"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AdminContainerProps {
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
    header?: React.ReactNode
}

export function AdminContainer({ children, footer, className, header }: AdminContainerProps) {
    return (
        <Card className={cn("h-full w-full", className)}>
            {header && (
                <CardHeader>
                    {header}
                </CardHeader>
            )}
            <CardContent className="flex-1 pt-6">
                {children}
            </CardContent>
            {footer && (
                <CardFooter>
                    {footer}
                </CardFooter>
            )}
        </Card>
    )
}
