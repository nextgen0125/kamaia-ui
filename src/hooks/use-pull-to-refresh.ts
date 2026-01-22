"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface PullToRefreshOptions {
  onRefresh: () => Promise<void>
  threshold?: number
  disabled?: boolean
  resistance?: number
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  disabled = false,
  resistance = 2.5,
}: PullToRefreshOptions) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const touchStartY = useRef(0)
  const scrollContainer = useRef<HTMLElement | null>(null)

  const canPull = useCallback(() => {
    if (disabled || isRefreshing) return false
    
    // Check if at top of page
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return scrollTop === 0
  }, [disabled, isRefreshing])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!canPull()) return
    
    touchStartY.current = e.touches[0].clientY
    setIsPulling(true)
  }, [canPull])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling || !canPull()) return

    const touchY = e.touches[0].clientY
    const distance = touchY - touchStartY.current

    if (distance > 0) {
      // Apply resistance
      const adjustedDistance = distance / resistance
      setPullDistance(Math.min(adjustedDistance, threshold * 1.5))
      
      // Prevent default scroll when pulling
      if (adjustedDistance > 10) {
        e.preventDefault()
      }
    }
  }, [isPulling, canPull, resistance, threshold])

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return

    setIsPulling(false)

    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      setPullDistance(threshold) // Lock at threshold during refresh

      try {
        await onRefresh()
      } catch (error) {
        console.error("Refresh failed:", error)
      } finally {
        setIsRefreshing(false)
        setPullDistance(0)
      }
    } else {
      setPullDistance(0)
    }
  }, [isPulling, pullDistance, threshold, onRefresh])

  useEffect(() => {
    if (typeof window === "undefined") return

    const options: AddEventListenerOptions = { passive: false }

    document.addEventListener("touchstart", handleTouchStart, options)
    document.addEventListener("touchmove", handleTouchMove, options)
    document.addEventListener("touchend", handleTouchEnd, options)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return {
    isPulling,
    pullDistance,
    isRefreshing,
    progress: Math.min((pullDistance / threshold) * 100, 100),
  }
}
