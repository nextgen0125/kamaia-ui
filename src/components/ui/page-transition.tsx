"use client"

import { ReactNode, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: ReactNode
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom"
  duration?: number
  className?: string
}

export function PageTransition({
  children,
  animation = "fade",
  duration = 300,
  className,
}: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const animations = {
    fade: {
      initial: "opacity-0",
      animate: "opacity-100",
    },
    "slide-up": {
      initial: "opacity-0 translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    "slide-down": {
      initial: "opacity-0 -translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    "slide-left": {
      initial: "opacity-0 translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    "slide-right": {
      initial: "opacity-0 -translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    zoom: {
      initial: "opacity-0 scale-95",
      animate: "opacity-100 scale-100",
    },
  }

  const { initial, animate } = animations[animation]

  return (
    <div
      className={cn(
        "transform transition-all ease-out",
        isVisible ? animate : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
