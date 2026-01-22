"use client"

import { ReactNode, Children, isValidElement, cloneElement } from "react"
import { cn } from "@/lib/utils"

interface AnimatedListProps {
  children: ReactNode
  animation?: "fade" | "slide" | "scale" | "bounce"
  stagger?: number
  className?: string
}

export function AnimatedList({
  children,
  animation = "fade",
  stagger = 50,
  className,
}: AnimatedListProps) {
  const animationClasses = {
    fade: "animate-in fade-in duration-300",
    slide: "animate-in slide-in-from-bottom-4 duration-300",
    scale: "animate-in zoom-in-95 duration-300",
    bounce: "animate-in zoom-in-90 duration-500 ease-out",
  }

  const childrenArray = Children.toArray(children)

  return (
    <div className={cn("space-y-3", className)}>
      {childrenArray.map((child, index) => {
        if (!isValidElement(child)) return child

        return cloneElement(child as React.ReactElement<any>, {
          key: index,
          className: cn(
            child.props.className,
            animationClasses[animation]
          ),
          style: {
            ...child.props.style,
            animationDelay: `${index * stagger}ms`,
            animationFillMode: "both",
          },
        })
      })}
    </div>
  )
}
