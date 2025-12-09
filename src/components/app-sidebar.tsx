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
  Users
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
      title: "Area de Trabalho",
      url: "/dashboard/workspace",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Tarefas",
      url: "/dashboard/task",
      icon: ListTodo,
    },
    {
      title: "Atendimento",
      url: "/dashboard/service",
      icon: SquarePen,
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
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Contactos",
      url: "/dashboard/contact",
      icon: User2,
    },
    {
      name: "Processos",
      url: "/dashboard/process",
      icon: Folder,
    },
    {
      name: "Advogados",
      url: "/dashboard/avocadoto",
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
