"use client"

import CompanySettingTabs from "@/components/companies/dashboard/company-setting-tabs"



export default function SettingsPage() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do seu escritório
        </p>
      </div>

      {/* Main Content */}
      <CompanySettingTabs />
    </div>
  )
}
