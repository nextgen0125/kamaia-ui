"use client"

import { Switch } from "@/components/ui/switch"

export default function Navigation() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Navigation</h2>
        <p className="text-sm text-muted-foreground">
          Customize how you navigate through the app.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Show sidebar</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span>Enable keyboard shortcuts</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Compact navigation</span>
          <Switch />
        </div>
      </div>
    </div>
  )
}
