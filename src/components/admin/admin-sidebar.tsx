"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  Database,
  Activity,
  Bell,
  DollarSign,
  Package,
  FileText,
  BarChart3,
  Lock,
  Mail,
  Workflow,
  Globe,
  Zap,
  AlertTriangle,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Visão Geral",
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          href: "/admin/dashboard",
          badge: null,
        },
        {
          title: "Analytics",
          icon: BarChart3,
          href: "/admin/analytics",
          badge: null,
        },
        {
          title: "Monitoramento",
          icon: Activity,
          href: "/admin/monitoring",
          badge: "Live",
        },
      ],
    },
    {
      title: "Gestão",
      items: [
        {
          title: "Tenants",
          icon: Building2,
          href: "/admin/tenants",
          badge: "45",
        },
        {
          title: "Usuários",
          icon: Users,
          href: "/admin/users",
          badge: "234",
        },
        {
          title: "Planos",
          icon: Package,
          href: "/admin/plans",
          badge: null,
        },
        {
          title: "Assinaturas",
          icon: DollarSign,
          href: "/admin/subscriptions",
          badge: null,
        },
      ],
    },
    {
      title: "Sistema",
      items: [
        {
          title: "Configurações",
          icon: Settings,
          href: "/admin/settings",
          badge: null,
        },
        {
          title: "Banco de Dados",
          icon: Database,
          href: "/admin/database",
          badge: null,
        },
        {
          title: "Logs",
          icon: FileText,
          href: "/admin/logs",
          badge: "12",
        },
        {
          title: "Segurança",
          icon: Lock,
          href: "/admin/security",
          badge: null,
        },
      ],
    },
    {
      title: "Comunicação",
      items: [
        {
          title: "Notificações",
          icon: Bell,
          href: "/admin/notifications",
          badge: "5",
        },
        {
          title: "Email",
          icon: Mail,
          href: "/admin/email",
          badge: null,
        },
        {
          title: "Webhooks",
          icon: Workflow,
          href: "/admin/webhooks",
          badge: null,
        },
      ],
    },
    {
      title: "Avançado",
      items: [
        {
          title: "API Management",
          icon: Globe,
          href: "/admin/api",
          badge: null,
        },
        {
          title: "Integrações",
          icon: Zap,
          href: "/admin/integrations",
          badge: null,
        },
        {
          title: "Incidentes",
          icon: AlertTriangle,
          href: "/admin/incidents",
          badge: "2",
        },
      ],
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">SuperAdmin</h2>
            <p className="text-xs text-muted-foreground">Kamaia Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant={item.badge === "Live" ? "destructive" : "secondary"}
                              className="ml-auto"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">
              SA
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Super Admin</p>
            <p className="text-xs text-muted-foreground truncate">admin@kamaia.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
