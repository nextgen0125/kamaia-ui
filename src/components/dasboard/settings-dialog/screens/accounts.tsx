"use client"

import { Button } from "@/components/ui/button"

export default function Accounts() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Connected Accounts</h2>
        <p className="text-sm text-muted-foreground">
          Manage accounts connected to your profile.
        </p>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full">
          Connect Google
        </Button>
        <Button variant="outline" className="w-full">
          Connect GitHub
        </Button>
        <Button variant="outline" className="w-full">
          Connect Twitter
        </Button>
      </div>
    </div>
  )
}
