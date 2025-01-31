import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipWrapperProps {
  tooltip: string | React.ReactNode
  children: React.ReactNode
  onChildClick?: () => void
}

export function TooltipWrapper({ tooltip, children, onChildClick }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={onChildClick} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {typeof tooltip === 'string' ? <p>{tooltip}</p> : tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}