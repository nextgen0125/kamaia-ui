"use client"

import { ReactNode, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Trash2, Edit, Star, Archive, Mail, Phone } from "lucide-react"

interface SwipeAction {
  icon: ReactNode
  label: string
  color: "red" | "blue" | "green" | "yellow" | "purple"
  onAction: () => void
}

interface SwipeableCardProps {
  children: ReactNode
  leftActions?: SwipeAction[]
  rightActions?: SwipeAction[]
  threshold?: number
  className?: string
}

export function SwipeableCard({
  children,
  leftActions = [],
  rightActions = [],
  threshold = 80,
  className,
}: SwipeableCardProps) {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  
  const startX = useRef(0)
  const currentX = useRef(0)

  const colorClasses = {
    red: "bg-red-500 text-white",
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    yellow: "bg-yellow-500 text-white",
    purple: "bg-purple-500 text-white",
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    currentX.current = e.touches[0].clientX
    const diff = currentX.current - startX.current

    // Limit swipe distance
    const maxSwipe = 150
    const limitedDiff = Math.max(-maxSwipe, Math.min(maxSwipe, diff))
    
    setOffset(limitedDiff)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    if (Math.abs(offset) > threshold) {
      // Reveal actions
      setIsRevealed(true)
      setOffset(offset > 0 ? 100 : -100)
    } else {
      // Reset
      setOffset(0)
      setIsRevealed(false)
    }
  }

  const handleAction = (action: SwipeAction) => {
    action.onAction()
    setOffset(0)
    setIsRevealed(false)
  }

  const reset = () => {
    setOffset(0)
    setIsRevealed(false)
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Left Actions */}
      {leftActions.length > 0 && (
        <div className="absolute inset-y-0 left-0 flex">
          {leftActions.map((action, idx) => (
            <button
              key={idx}
              className={cn(
                "flex items-center justify-center px-6 transition-all",
                colorClasses[action.color],
                offset > 0 ? "opacity-100" : "opacity-0"
              )}
              onClick={() => handleAction(action)}
              style={{
                width: offset > 0 ? `${offset / leftActions.length}px` : "0px",
              }}
            >
              <div className="flex flex-col items-center gap-1">
                {action.icon}
                <span className="text-xs font-medium">{action.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Right Actions */}
      {rightActions.length > 0 && (
        <div className="absolute inset-y-0 right-0 flex">
          {rightActions.map((action, idx) => (
            <button
              key={idx}
              className={cn(
                "flex items-center justify-center px-6 transition-all",
                colorClasses[action.color],
                offset < 0 ? "opacity-100" : "opacity-0"
              )}
              onClick={() => handleAction(action)}
              style={{
                width: offset < 0 ? `${Math.abs(offset) / rightActions.length}px` : "0px",
              }}
            >
              <div className="flex flex-col items-center gap-1">
                {action.icon}
                <span className="text-xs font-medium">{action.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div
        className="relative bg-background transition-transform touch-pan-y"
        style={{
          transform: `translateX(${offset}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  )
}

// Pre-configured swipe actions
export const SwipeActions = {
  delete: {
    icon: <Trash2 className="size-5" />,
    label: "Delete",
    color: "red" as const,
  },
  edit: {
    icon: <Edit className="size-5" />,
    label: "Edit",
    color: "blue" as const,
  },
  favorite: {
    icon: <Star className="size-5" />,
    label: "Favorite",
    color: "yellow" as const,
  },
  archive: {
    icon: <Archive className="size-5" />,
    label: "Archive",
    color: "purple" as const,
  },
  email: {
    icon: <Mail className="size-5" />,
    label: "Email",
    color: "green" as const,
  },
  call: {
    icon: <Phone className="size-5" />,
    label: "Call",
    color: "blue" as const,
  },
}
