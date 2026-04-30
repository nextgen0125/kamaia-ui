"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard";
import { useProcesses, useProcessesKPIs, useProcessesStatistics } from "@/hooks/queries/use-process";
import { CasesPageHeader } from "@/components/companies/cases/cases-page-header";
import { CasesKPICards } from "@/components/companies/cases/cases-kpi-cards";
import { CasesFilters } from "@/components/companies/cases/cases-filters";
import { CasesTable } from "@/components/companies/cases/cases-table";

export default function CasesPage() {
  const { company } = useCompanyDashboardContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const queryFilters: any = {};
  if (searchQuery) queryFilters.search = searchQuery;
  if (filterStatus !== "all") queryFilters.status = filterStatus;

  const { data: processesData, isLoading } = useProcesses(company?.id || "", queryFilters);
  const { data: statsData } = useProcessesKPIs(company?.id || "");

  const cases = processesData?.processes || [];

  // Map our backend statistics properly, or mock temporarily if we don't have them in exact format
  const stats = statsData || {
    total: 0, // Should be calculated by GetProcessTotalKPIService
    active: 0,
    pending: 0,
    completed: 0,
    totalValue: 0,
  };


  if (!company) return null;

  return (
    <div className="space-y-6">
      <CasesPageHeader />
      <CasesKPICards stats={stats} />

      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader>
          <CardTitle>Lista de Processos</CardTitle>
          <CardDescription>Visualize e gerencie todos os processos</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={(v) => setFilterStatus(v)}>
            <CasesFilters stats={stats} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <TabsContent value={filterStatus} className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">Carregando processos...</div>
              ) : (
                <CasesTable cases={cases} companyId={company.id} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
