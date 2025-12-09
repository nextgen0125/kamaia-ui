"use client"

import { Switch } from "@/components/ui/switch"

export default function Privacy() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Privacy & Visibility</h2>
        <p className="text-sm text-muted-foreground">
          Control what others can see about you.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Show profile picture</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span>Show online status</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>Allow friend requests</span>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  )
}
