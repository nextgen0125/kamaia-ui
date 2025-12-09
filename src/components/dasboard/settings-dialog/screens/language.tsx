"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Language() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Language & Region</h2>
        <p className="text-sm text-muted-foreground">
          Set your preferred language and region settings.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Language</label>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Region</label>
          <Select defaultValue="us">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="br">Brazil</SelectItem>
              <SelectItem value="es">Spain</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
