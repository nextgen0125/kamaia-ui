"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
}

// ============================================
// Profile Card Skeleton
// ============================================
export function ProfileCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-1">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Task Card Skeleton
// ============================================
export function TaskCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <Skeleton className="size-4 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Assignee */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Case Card Skeleton
// ============================================
export function CaseCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="size-4 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Footer */}
          <div className="flex justify-between pt-2 border-t">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Financial Card Skeleton
// ============================================
export function FinancialCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>

          {/* Amount */}
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Document Card Skeleton
// ============================================
export function DocumentCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <Skeleton className="size-10 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-2 border-t">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-7 w-16 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Service Card Skeleton
// ============================================
export function ServiceCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>

          {/* Price */}
          <div className="flex justify-between items-center pt-2 border-t">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Category */}
          <Skeleton className="h-5 w-20 rounded-full" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            {[1, 2].map((i) => (
              <div key={i} className="text-center space-y-1">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Stat Card Skeleton
// ============================================
export function StatCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="size-10 rounded-lg" />
          </div>

          {/* Change */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Generic List of Skeletons
// ============================================
interface SkeletonListProps {
  type: "profile" | "task" | "case" | "financial" | "document" | "service" | "stat"
  count?: number
  className?: string
}

export function SkeletonList({ type, count = 3, className }: SkeletonListProps) {
  const SkeletonComponent = {
    profile: ProfileCardSkeleton,
    task: TaskCardSkeleton,
    case: CaseCardSkeleton,
    financial: FinancialCardSkeleton,
    document: DocumentCardSkeleton,
    service: ServiceCardSkeleton,
    stat: StatCardSkeleton,
  }[type]

  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  )
}
