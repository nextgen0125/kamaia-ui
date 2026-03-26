"use client"


import { Bell, Building, CreditCard, Palette, Shield, Users } from "lucide-react"
import CompanyGeneralSettingTab from "./company-general-settings-tab"
import CompanyTeamSettingTab from "./company-team-settings-tab"
import CompanyNotificationsSettingTab from "./company-notifications-settings-tab"
import CompanySecuritySettingsTab from "./company-security-settings-tab"
import CompanyAppearanceSettingsTab from "./company-appearance-settings-tab"
import CompanyBillingSettingsTab from "./company-billing-settings-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompanySettingTabs() {


  return (
    <Tabs defaultValue="general" className="space-y-4">
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
