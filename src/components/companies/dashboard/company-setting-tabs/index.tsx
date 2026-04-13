"use client"


import { Bell, Building, CreditCard, Palette, Shield, Users } from "lucide-react"
import CompanyGeneralSettingTab from "./company-general-settings-tab"
import CompanyTeamSettingTab from "./company-team-settings-tab"
import CompanyNotificationsSettingTab from "./company-notifications-settings-tab"
import CompanySecuritySettingsTab from "./company-security-settings-tab"
import CompanyAppearanceSettingsTab from "./company-appearance-settings-tab"
import CompanyBillingSettingsTab from "./company-billing-settings-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { SkeletonList } from "@/components/ui/skeleton-cards"
import { Skeleton } from "@/components/ui/skeleton"

export default function CompanySettingTabs() {

  const { isLoading } = useCompanyDashboardContext();


  return isLoading
    ? <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-40 h-8" />
          </div>

          <SkeletonList type="task" count={1} />
      </div>
    : (
      <Tabs defaultValue="general" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabsList>
            <TabsTrigger value="general">
              <Building className="mr-2 h-4 w-4" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="mr-2 h-4 w-4" />
              Equipe
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="mr-2 h-4 w-4" />
              Aparência
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="mr-2 h-4 w-4" />
              Faturamento
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <CompanyGeneralSettingTab />

          {/* Team Settings */}
          <CompanyTeamSettingTab />

          {/* Notifications Settings */}
          <CompanyNotificationsSettingTab />

          {/* Security Settings */}
          <CompanySecuritySettingsTab />

          {/* Appearance Settings */}
          <CompanyAppearanceSettingsTab />

          {/* Billing Settings */}
          <CompanyBillingSettingsTab />
      </Tabs>
    )
}
