"use client"
import {
  MailIcon,
  Settings
} from "lucide-react"
import { useQueryState } from "nuqs"

import NotificationMenu from "@/components/dasboard/navbar-components/notification-menu"
import UserMenu from "@/components/dasboard/navbar-components/user-menu"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import SettingsDialog from "./settings-dialog"
import { GlobalSearch } from "@/components/search/global-search"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function DashboardHeader() {
  const [, setSettings] = useQueryState("settings")

  return (
    <header className="px-4 md:px-6 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-sidebar">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary/90">
              <SidebarTrigger className="-ml-1" />
            </a>
          </div>
          
          {/* Center - Global Search */}
          <div className="relative flex-1 max-w-md">
            <GlobalSearch />
          </div>
        </div>
        
       
        
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground relative size-8 rounded-full shadow-none"
              aria-label="Open Settings"
              onClick={() => setSettings("notifications")}
            >
              <Settings size={16} aria-hidden="true" />
            </Button>
            
            {/* Messages */}
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground relative size-8 rounded-full shadow-none"
              aria-label="Open notifications"
            >
              <MailIcon size={16} aria-hidden="true" />
              <div
                aria-hidden="true"
                className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full"
              />
            </Button>
            
            {/* Notification Center - New improved version */}
            <NotificationCenter />
          </div>
          
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
      <SettingsDialog />
    </header>
  )
}
