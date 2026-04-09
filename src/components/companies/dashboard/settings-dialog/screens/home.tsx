"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Home</h2>
        <p className="text-sm text-muted-foreground">
          Configure your home dashboard experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="homepage">Homepage Title</Label>
          <Input id="homepage" placeholder="My Dashboard" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="welcome">Welcome Message</Label>
          <Input id="welcome" placeholder="Welcome back 👋" />
        </div>
      </div>
    </div>
  )
}
