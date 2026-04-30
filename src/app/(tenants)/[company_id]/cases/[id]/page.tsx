"use client";

import { use } from "react";
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard";
import { useProcess } from "@/hooks/queries/use-process";
import { CaseProfileHeader } from "@/components/companies/cases/case-profile-header";
import { CaseProfileKPIs } from "@/components/companies/cases/case-profile-kpis";
import { CaseProfileTabs } from "@/components/companies/cases/case-profile-tabs";
import { AlertCircle } from "lucide-react";

export default function CaseProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { company } = useCompanyDashboardContext();

  const { data: caseData, isLoading, error } = useProcess(company?.id || "", id);

  if (isLoading || !company) {
    return <div className="py-8 text-center text-muted-foreground animate-pulse">Carregando detalhes do processo...</div>;
  }

  if (error || !caseData) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Processo não encontrado</h2>
          <p className="text-muted-foreground">O processo que você está procurando não existe ou você não tem acesso a ele.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CaseProfileHeader companyId={company.id} caseData={caseData} />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Main Details (KPIs and Tabs) */}
        <div className="md:col-span-2 space-y-6">
          <CaseProfileKPIs caseData={caseData} />

          <div className="bg-card rounded-xl border p-1 shadow-sm animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="bg-background rounded-lg outline-none border-0 ring-0 focus-visible:ring-0">
              <CaseProfileTabs companyId={company.id} caseId={id} />
            </div>
          </div>
        </div>

        {/* Right Column - Side Cards (Client Info, Lawyers, Stats) */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="font-semibold leading-none tracking-tight mb-2">Cliente</h3>
              <p className="text-sm text-muted-foreground">
                {caseData.involveds?.[0]?.client?.name || "Sem cliente vinculado"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="font-semibold leading-none tracking-tight mb-2">Advogado/Responsável</h3>
              <p className="text-sm text-muted-foreground">
                {caseData.company_acl?.user ? `${caseData.company_acl.user.firstName} ${caseData.company_acl.user.lastName}` : "Sem advogado"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
