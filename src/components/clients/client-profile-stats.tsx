"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { useClientProfileKPIs } from "@/hooks/queries/clients/use-client-kpis";
import { Skeleton } from "@/components/ui/skeleton";
import { IClient } from "@/services/clients.service";

interface ClientProfileStatsProps {
  companyId: string;
  clientId: string;
  client?: IClient;
}

export function ClientProfileStats({ companyId, clientId, client }: ClientProfileStatsProps) {
  const { data: stats, isLoading } = useClientProfileKPIs(companyId, clientId);

  if (isLoading || !client) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(value);
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("pt-AO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estado</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Badge variant={client.is_active ? "default" : "secondary"}>
            {client.is_active ? "Activo" : "Inactivo"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processos Activos</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.in_progress_processes || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats?.total_processes || 0} no total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Honorários Recebidos</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats?.total_financial || 0)}</div>
          <p className="text-xs text-muted-foreground">
            Total liquidado
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cliente desde</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">
            {formatDate(client.created_at)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
