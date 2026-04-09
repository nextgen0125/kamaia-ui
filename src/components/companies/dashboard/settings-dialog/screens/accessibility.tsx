"use client"

import { Switch } from "@/components/ui/switch"

export default function Accessibility() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Accessibility</h2>
        <p className="text-sm text-muted-foreground">
          Make the app easier to use for everyone.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>High contrast mode</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Reduce motion</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Screen reader hints</span>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  )
}
