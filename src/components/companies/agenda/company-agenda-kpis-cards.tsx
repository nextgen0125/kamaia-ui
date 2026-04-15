"use client";

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard";
import { SkeletonList, StatCardSkeleton } from "@/components/ui/skeleton-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";
import { useCompanyKPIs } from "@/hooks/queries/use-companies";
import { useParams } from "next/navigation";
import { ICompanyAgendaKPIs } from "@/interfaces/ICompanyKPIS";

interface CompanyAgendaKpiCardsProps {
  companyId: string;
}

export default function CompanyAgendaKpiCards({ companyId }: CompanyAgendaKpiCardsProps) {
  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isLoadingCompany, data: kpis } = useCompanyKPIs(companyId, "agenda");

  return isLoading || isLoadingCompany
    ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(item => <StatCardSkeleton key={item} />)}
      </div>
    : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(kpis as ICompanyAgendaKPIs)?.todayEvents?.value}</div>
            <p className="text-xs text-muted-foreground">Compromissos agendados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(kpis as ICompanyAgendaKPIs)?.thisWeekEvents?.value}</div>
            <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(kpis as ICompanyAgendaKPIs)?.thisMonthEvents?.value}</div>
            <p className="text-xs text-muted-foreground">Total no mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prazos</CardTitle>
            <AlertCircle className="size-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{(kpis as ICompanyAgendaKPIs)?.deadlines?.value}</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>
      </div>
    );
}