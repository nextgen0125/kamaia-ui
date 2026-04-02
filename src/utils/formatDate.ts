
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