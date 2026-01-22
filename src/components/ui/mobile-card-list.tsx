"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MobileCardListProps {
  children: ReactNode
  className?: string
}

export function MobileCardList({ children, className }: MobileCardListProps) {
  return (
    <div className={cn("space-y-3 md:hidden", className)}>
      {children}
    </div>
  )
}

interface MobileCardItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function MobileCardItem({ children, className, onClick }: MobileCardItemProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  )
}

interface MobileCardFieldProps {
  label: string
  value: ReactNode
  icon?: ReactNode
  className?: string
}

export function MobileCardField({ label, value, icon, className }: MobileCardFieldProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      {icon && <div className="flex-shrink-0 mt-0.5 text-muted-foreground">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <div className="mt-0.5 text-sm font-medium break-words">
          {value}
        </div>
      </div>
    </div>
  )
}
