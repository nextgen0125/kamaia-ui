import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export function formatDate(iso: string | Date, type: "long" | "short" = "long"): string {
  return type === "long"
      ? new Intl.DateTimeFormat("pt-AO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(iso))
      : new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })
}

export function formatTimeAgo(iso: string): string {
  return formatDistanceToNow(new Date(iso), {
    addSuffix: true,
    locale: ptBR,
  })
}