"use client"

import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"

function normalizePath(p?: string) {
  if (!p) return "/"
  // remove trailing slash, excepto quando for apenas "/"
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = normalizePath(usePathname() ?? "/")

  // função para saber se um item tem "filhos" no próprio menu (ex: /dashboard tem /dashboard/task)
  const hasChild = (url: string) =>
    items.some(
      (other) =>
        other.url !== url &&
        normalizePath(other.url).startsWith(normalizePath(url) + "/")
    )
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const itemUrl = normalizePath(item.url)
          const isParent = hasChild(item.url)

          // Se for pai (tem subrotas no menu), só marca como activo em match exacto.
          // Caso contrário (item final / folha), aceita match exacto ou subrota (startsWith)
          const isActive = isParent
            ? pathname === itemUrl
            : pathname === itemUrl || pathname.startsWith(itemUrl + "/")


          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className={isActive ? "bg-muted font-medium text-primary border-l border-primary" : ""}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
