

export function roleBadgeVariant(type: string): "default" | "secondary" | "outline" | "destructive" {
  switch (type) {
    case "ADMINISTRATOR": return "default"
    case "ATTORNEY":      return "secondary"
    default:              return "outline"
  }
}
