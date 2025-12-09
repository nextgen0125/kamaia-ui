"use client"

import { Switch } from "@/components/ui/switch"

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Manage how you want to be notified.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Email alerts</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Push notifications</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Weekly summary</span>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  )
}
