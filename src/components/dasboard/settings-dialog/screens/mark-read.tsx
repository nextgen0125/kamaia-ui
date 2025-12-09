"use client"

import { Button } from "@/components/ui/button"

export default function MarkRead() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Mark as Read</h2>
        <p className="text-sm text-muted-foreground">
          Manage how messages and notifications are marked as read.
        </p>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full">
          Mark all as read
        </Button>
        <Button variant="outline" className="w-full">
          Auto-mark on open
        </Button>
        <Button variant="outline" className="w-full">
          Mark after 5 seconds
        </Button>
      </div>
    </div>
  )
}
