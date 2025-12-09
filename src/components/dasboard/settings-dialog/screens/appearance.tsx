"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckIcon, MinusIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useId } from "react"


const items = [
  { value: "light", label: "Light", image: "/ui-light.png" },
  { value: "dark", label: "Dark", image: "/ui-dark.png" },
  { value: "system", label: "System", image: "/ui-system.png" },
]

export default function Appearance() {
  const id = useId()
  const { setTheme, theme } = useTheme()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Choose your theme and customize how the app looks.
        </p>
      </div>

      {/* Theme selector */}
      <fieldset className="space-y-4">
        <legend className="text-foreground text-sm leading-none font-medium">
          Theme
        </legend>
        <RadioGroup className="flex gap-4" defaultValue={theme ?? "light"}>
          {items.map((item) => (
            <label key={`${id}-${item.value}`} className="flex flex-col items-center">
              <RadioGroupItem
                id={`${id}-${item.value}`}
                value={item.value}
                className="peer sr-only after:absolute after:inset-0"
                onClick={() => setTheme(item.value)}
              />
              <img
                src={item.image}
                alt={item.label}
                width={88}
                height={70}
                className="border-input peer-focus-visible:ring-ring/50 peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent relative cursor-pointer overflow-hidden rounded-md border shadow-sm transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px] peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50"
              />
              <span className="group mt-2 flex items-center gap-1 text-xs font-medium">
                <CheckIcon
                  size={14}
                  className="group-peer-data-[state=unchecked]:hidden"
                  aria-hidden="true"
                />
                <MinusIcon
                  size={14}
                  className="group-peer-data-[state=checked]:hidden"
                  aria-hidden="true"
                />
                {item.label}
              </span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  )
}
