"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Logo } from "@/components/logo"
import {
  LayoutDashboard,
  Scale,
  FileText,
  MessageSquare,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/customers/dashboard",
  },
  {
    title: "Meus Processos",
    icon: Scale,
    href: "/customers/dashboard/cases",
  },
  {
    title: "Documentos",
    icon: FileText,
    href: "/customers/dashboard/documents",
  },
  {
    title: "Mensagens",
    icon: MessageSquare,
    href: "/customers/dashboard/messages",
    badge: 2,
  },
  {
    title: "Pagamentos",
    icon: CreditCard,
    href: "/customers/dashboard/payments",
  },
  {
    title: "Notificações",
    icon: Bell,
    href: "/customers/dashboard/notifications",
    badge: 3,
  },
]

const bottomMenuItems = [
  {
    title: "Ajuda",
    icon: HelpCircle,
    href: "/customers/dashboard/help",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/customers/dashboard/settings",
  },
]

export function CustomerSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <Link href="/customers/dashboard" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <Logo size={80} />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(collapsed && "mx-auto")}
        >
          {collapsed ? <Menu className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <span className="size-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-2 mt-auto border-t space-y-1">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  {!collapsed && <span className="flex-1 text-left">{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </aside>
  )
}
