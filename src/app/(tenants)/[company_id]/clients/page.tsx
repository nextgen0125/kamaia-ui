"use client";

import { AddClientDialog } from "@/components/clients/add-client-dialog";
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard";
import { ClientsKpiCards } from "@/components/clients/clients-kpi-cards";
import { ClientsTable } from "@/components/clients/clients-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientsPage() {
  const { company } = useCompanyDashboardContext();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes e seus processos
          </p>
        </div>
        <AddClientDialog />
      </div>

      <ClientsKpiCards companyId={company?.id} />

      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os seus clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientsTable companyId={company?.id} />
        </CardContent>
      </Card>
    </div>
  );
}
