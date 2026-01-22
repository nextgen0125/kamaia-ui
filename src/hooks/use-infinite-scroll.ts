"use client"

import { useEffect, useRef, useCallback, useState } from "react"

interface InfiniteScrollOptions {
  onLoadMore: () => Promise<void>
  hasMore: boolean
  threshold?: number
  disabled?: boolean
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  threshold = 300,
  disabled = false,
}: InfiniteScrollOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)

  const handleLoadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore || disabled) return

    isLoadingRef.current = true
    setIsLoading(true)

    try {
      await onLoadMore()
    } catch (error) {
      console.error("Failed to load more:", error)
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }, [onLoadMore, hasMore, disabled])

  useEffect(() => {
    const target = observerTarget.current
    if (!target || disabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !isLoadingRef.current) {
          handleLoadMore()
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0,
      }
    )

    observer.observe(target)

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [handleLoadMore, hasMore, threshold, disabled])

  return {
    observerTarget,
    isLoading,
  }
}
