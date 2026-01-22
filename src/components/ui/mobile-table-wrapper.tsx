"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MobileTableWrapperProps {
  children: ReactNode
  mobileView: ReactNode
  className?: string
}

/**
 * Wrapper component that shows table on desktop and custom mobile view on mobile
 */
export function MobileTableWrapper({ 
  children, 
  mobileView, 
  className 
}: MobileTableWrapperProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className={cn("hidden md:block", className)}>
        {children}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {mobileView}
      </div>
    </>
  )
}
