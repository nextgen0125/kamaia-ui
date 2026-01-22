"use client"

import { ReactNode } from "react"
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh"
import { Loader2, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
  threshold?: number
  disabled?: boolean
  className?: string
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  disabled = false,
  className,
}: PullToRefreshProps) {
  const { isPulling, pullDistance, isRefreshing, progress } = usePullToRefresh({
    onRefresh,
    threshold,
    disabled,
  })

  const showIndicator = isPulling || isRefreshing
  const shouldRefresh = pullDistance >= threshold

  return (
    <div className={cn("relative", className)}>
      {/* Pull Indicator */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 flex items-center justify-center transition-all duration-200",
          showIndicator ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{
          transform: `translateY(${Math.max(0, pullDistance - 40)}px)`,
          height: "40px",
        }}
      >
        <div className="relative">
          {isRefreshing ? (
            <Loader2 className="size-6 animate-spin text-primary" />
          ) : (
            <div className="relative">
              {/* Progress Circle */}
              <svg className="size-10 -rotate-90" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-muted opacity-20"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
                  className="text-primary transition-all duration-100"
                  strokeLinecap="round"
                />
              </svg>
              {/* Arrow Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ArrowDown
                  className={cn(
                    "size-5 text-primary transition-transform duration-200",
                    shouldRefresh && "rotate-180"
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          transform: showIndicator ? `translateY(${Math.min(pullDistance, 60)}px)` : "translateY(0)",
          transition: isPulling ? "none" : "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}
