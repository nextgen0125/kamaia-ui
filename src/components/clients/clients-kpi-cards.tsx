"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, UserCircle, Briefcase, Activity } from "lucide-react";
import { useCompanyClientsKPIs } from "@/hooks/queries/clients/use-client-kpis";
import { Skeleton } from "@/components/ui/skeleton";

export function ClientsKpiCards({ companyId }: { companyId?: string }) {
  const { data: stats, isLoading } = useCompanyClientsKPIs(companyId || "");

  if (isLoading || !companyId) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-xl" />
        ))}
      </div>
    );
  }

  // fallback to 0 if no stats
  const total = stats?.total_clients || 0;
  const active = stats?.active_clients || 0;
  const newThisMonth = stats?.new_this_month || 0;
  const withActiveProcess = stats?.clients_with_active_process || 0;
  const inactive = stats?.inactive_clients || 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">+{newThisMonth} neste mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{active}</div>
          <p className="text-xs text-muted-foreground">Estado activo no sistema</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes Inactivos</CardTitle>
          <UserCircle className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inactive}</div>
          <p className="text-xs text-muted-foreground">Estado inactivo no sistema</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Com Processos</CardTitle>
          <Briefcase className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{withActiveProcess}</div>
          <p className="text-xs text-muted-foreground">Em andamento ou pendente</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Adoção Mensal</CardTitle>
          <Building2 className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{newThisMonth}</div>
          <p className="text-xs text-muted-foreground">Novos clientes este mês</p>
        </CardContent>
      </Card>
    </div>
  );
}
