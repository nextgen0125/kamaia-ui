"use client"

import {
  Calendar,
  DollarSign,
  File,
  Folder,
  LayoutDashboard,
  LifeBuoy,
  ListTodo,
  Send,
  SquarePen,
  User2,
  Users,
  Zap,
  BarChart3,
  Settings,
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "./logo"
import { NavSecondary } from "./nav-secondary"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Workspace",
      url: "/dashboard/workspace",
      icon: SquarePen,
    },
    {
      title: "Tarefas",
      url: "/dashboard/task",
      icon: ListTodo,
    },
    {
      title: "Agenda",
      url: "/dashboard/agenda",
      icon: Calendar,
    },
    {
      title: "Documentos",
      url: "/dashboard/document",
      icon: File,
    }
  ],
  navSecondary: [
    {
      title: "Serviços",
      url: "/dashboard/service",
      icon: SquarePen,
    },
    {
      title: "Relatórios",
      url: "/dashboard/reports",
      icon: LifeBuoy,
    },
    {
      title: "Templates",
      url: "/dashboard/templates",
      icon: File,
    },
    {
      title: "Integrações",
      url: "/dashboard/integrations",
      icon: Zap,
    },
    {
      title: "BI Dashboard",
      url: "/dashboard/bi",
      icon: BarChart3,
    },
    {
      title: "Configurações",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Processos",
      url: "/dashboard/cases",
      icon: Folder,
    },
    {
      name: "Clientes",
      url: "/dashboard/clients",
      icon: User2,
    },
    {
      name: "Advogados",
      url: "/dashboard/lawyers",
      icon: Users,
    },
    {
      name: "Financeiro",
      url: "/dashboard/finance",
      icon: DollarSign,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Logo />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} />
      </SidebarFooter>
    </Sidebar>
  )
}
