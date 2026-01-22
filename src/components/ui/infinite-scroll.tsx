"use client"

import { ReactNode } from "react"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface InfiniteScrollProps {
  onLoadMore: () => Promise<void>
  hasMore: boolean
  children: ReactNode
  threshold?: number
  disabled?: boolean
  loadingMessage?: string
  endMessage?: ReactNode
  className?: string
}

export function InfiniteScroll({
  onLoadMore,
  hasMore,
  children,
  threshold = 300,
  disabled = false,
  loadingMessage = "Carregando mais...",
  endMessage,
  className,
}: InfiniteScrollProps) {
  const { observerTarget, isLoading } = useInfiniteScroll({
    onLoadMore,
    hasMore,
    threshold,
    disabled,
  })

  return (
    <div className={cn("relative", className)}>
      {children}
      
      {/* Observer Target */}
      <div ref={observerTarget} className="h-1" />

      {/* Loading Indicator */}
      {isLoading && hasMore && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-sm">{loadingMessage}</span>
          </div>
        </div>
      )}

      {/* End Message */}
      {!hasMore && endMessage && (
        <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
          {endMessage}
        </div>
      )}
    </div>
  )
}
