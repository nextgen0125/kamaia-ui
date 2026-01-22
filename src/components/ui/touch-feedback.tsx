"use client"

import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

interface TouchFeedbackProps {
  children: ReactNode
  className?: string
  onTap?: () => void
  disabled?: boolean
}

/**
 * Wrapper that adds touch feedback animation to any component
 */
export function TouchFeedback({ 
  children, 
  className, 
  onTap,
  disabled = false 
}: TouchFeedbackProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleTouchStart = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
    if (onTap && !disabled) {
      onTap()
    }
  }

  return (
    <div
      className={cn(
        "transition-transform duration-100 active:scale-95",
        isPressed && "scale-95",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => setIsPressed(false)}
    >
      {children}
    </div>
  )
}
