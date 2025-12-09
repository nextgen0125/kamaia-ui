"use client"

import Accessibility from "./screens/accessibility"
import Accounts from "./screens/accounts"
import Advanced from "./screens/advanced"
import Appearance from "./screens/appearance"
import Home from "./screens/home"
import Language from "./screens/language"
import MarkRead from "./screens/mark-read"
import Navigation from "./screens/navigation"
import Notifications from "./screens/notifications"
import Privacy from "./screens/privacy"

type Props = {
  value: string | null
}

export default function SettingsContent({ value }: Props) {
  if (!value) return null

  switch (value) {
    case "notifications":
      return <Notifications />
    case "navigation":
      return <Navigation />
    case "home":
      return <Home />
    case "appearance":
      return <Appearance />
    case "language":
      return <Language />
    case "accessibility":
      return <Accessibility />
    case "mark-read":
      return <MarkRead />
    case "accounts":
      return <Accounts />
    case "privacy":
      return <Privacy />
    case "advanced":
      return <Advanced />
    default:
      return (
        <div className="p-4">
          <h2 className="text-lg font-semibold">{value}</h2>
          <p>Configuração de {value}.</p>
        </div>
      )
  }
}
