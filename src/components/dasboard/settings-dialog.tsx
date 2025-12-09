"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useQueryState } from "nuqs"

import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link as LinkIcon,
  Lock,
  Menu,
  Paintbrush,
  Settings
} from "lucide-react"
import SettingsContent from "./settings-dialog/settings-content"

const data = {
  nav: [
    { name: "Notifications", icon: Bell, value: "notifications" },
    { name: "Navigation", icon: Menu, value: "navigation" },
    { name: "Home", icon: Home, value: "home" },
    { name: "Appearance", icon: Paintbrush, value: "appearance" },
    { name: "Language & region", icon: Globe, value: "language" },
    { name: "Accessibility", icon: Keyboard, value: "accessibility" },
    { name: "Mark as read", icon: Check, value: "mark-read" },
    { name: "Connected accounts", icon: LinkIcon, value: "accounts" },
    { name: "Privacy & visibility", icon: Lock, value: "privacy" },
    { name: "Advanced", icon: Settings, value: "advanced" },
  ],
}

export default function SettingsDialog() {
  const [settings, setSettings] = useQueryState("settings")

  const currentItem = data.nav.find((item) => item.value === settings)

  return (
    <Dialog
      open={!!settings}
      onOpenChange={(open) => {
        if (!open) setSettings(null) // fecha limpando query param
      }}
    >
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>

        <SidebarProvider className="items-start">
          {/* Sidebar */}
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.value}>
                        <SidebarMenuButton
                          asChild
                          isActive={settings === item.value}
                        >
                          <button
                            onClick={() => setSettings(item.value)}
                            className="flex items-center gap-2"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Conteúdo da aba selecionada */}
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            {/* Header com breadcrumb */}
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  {currentItem && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{currentItem.name}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            {/* Conteúdo dinâmico */}
            <div className="flex-1 overflow-y-auto p-4">
              <SettingsContent value={settings} />
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
