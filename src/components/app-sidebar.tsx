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
import { useParams } from "next/navigation"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const params = useParams();

    const data = React.useMemo(
      () => ({
        user: {
          name: "shadcn",
          email: "m@example.com",
          avatar: "/avatars/shadcn.jpg",
        },
        navMain: [
          {
            title: "Dashboard",
            url: `/${params?.company_id}/dashboard`,
            icon: LayoutDashboard,
            isActive: true,
          },
          {
            title: "Workspace",
            url: `/${params?.company_id}/workspace`,
            icon: SquarePen,
          },
          {
            title: "Tarefas",
            url: `/${params?.company_id}/tasks`,
            icon: ListTodo,
          },
          {
            title: "Agenda",
            url: `/${params?.company_id}/agenda`,
            icon: Calendar,
          },
          {
            title: "Documentos",
            url: `/${params?.company_id}/documents`,
            icon: File,
          }
        ],
        navSecondary: [
          {
            title: "Serviços",
            url: `/${params?.company_id}/services`,
            icon: SquarePen,
          },
          {
            title: "Relatórios",
            url: `/${params?.company_id}/reports`,
            icon: LifeBuoy,
          },
          {
            title: "Templates",
            url: `/${params?.company_id}/templates`,
            icon: File,
          },
          {
            title: "Integrações",
            url: `/${params?.company_id}/integrations`,
            icon: Zap,
          },
          {
            title: "BI Dashboard",
            url: `/${params?.company_id}/bi`,
            icon: BarChart3,
          },
          {
            title: "Configurações",
            url: `/${params?.company_id}/settings`,
            icon: Settings,
          },
        ],
        projects: [
          {
            name: "Processos",
            url: `/${params?.company_id}/cases`,
            icon: Folder,
          },
          {
            name: "Clientes",
            url: `/${params?.company_id}/clients`,
            icon: User2,
          },
          {
            name: "Contactos",
            url: `/${params?.company_id}/contacts`,
            icon: Users,
          },
          {
            name: "Advogados",
            url: `/${params?.company_id}/lawyers`,
            icon: Users,
          },
          {
            name: "Financeiro",
            url: `/${params?.company_id}/finances`,
            icon: DollarSign,
          },
        ],
      }), 
      []
    )

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
