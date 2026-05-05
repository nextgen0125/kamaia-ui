"use client";

import { use } from "react";
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard";
import { useProcess } from "@/hooks/queries/use-process";
import { CaseProfileHeader } from "@/components/companies/cases/case-profile-header";
import { CaseProfileKPIs } from "@/components/companies/cases/case-profile-kpis";
import { CaseProfileTabs } from "@/components/companies/cases/case-profile-tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, User, Users, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          O processo que você está procurando não existe ou você não tem acesso a ele.
        </AlertDescription>
      </Alert>
    );
  }

  // Dados dos clientes envolvidos
  const clients = caseData.involveds?.map((inv) => inv.client).filter(Boolean) || [];

  // Iniciais do advogado
  const lawyerInitials = caseData.company_acl?.user
    ? `${caseData.company_acl.user.firstName?.[0]}${caseData.company_acl.user.lastName?.[0]}`.toUpperCase()
    : "AD";

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
          {/* Clientes Envolvidos */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Clientes Envolvidos</CardTitle>
              </div>
              <CardDescription className="text-xs">
                {clients.length} {clients.length === 1 ? "cliente" : "clientes"} vinculado{clients.length === 1 ? "" : "s"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {clients.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">Nenhum cliente vinculado</p>
              ) : (
                clients.map((client, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                      <AvatarImage src={client?.user?.avatar_url} alt={client.name || client?.user?.full_name} />
                      <AvatarFallback className="text-xs">
                        {client.name?.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() || "CL"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{client.name || client?.user?.full_name}</p>
                      {client?.user?.email && (
                        <p className="text-xs text-muted-foreground truncate">{client?.user?.email}</p>
                      )}
                      {client?.user?.phone && (
                        <p className="text-xs text-muted-foreground">{client?.user?.phone}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Advogado Responsável */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Responsável</CardTitle>
              </div>
              <CardDescription className="text-xs">Advogado/Gestor do processo</CardDescription>
            </CardHeader>
            <CardContent>
              {caseData.company_acl?.user ? (
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={caseData.company_acl.user.avatar_url} alt="Advogado" />
                    <AvatarFallback className="text-xs font-semibold">{lawyerInitials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">
                      {caseData.company_acl.user.firstName} {caseData.company_acl.user.lastName}
                    </p>
                    {caseData.company_acl.user.email && (
                      <p className="text-xs text-muted-foreground truncate">
                        {caseData.company_acl.user.email}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {caseData.company_acl?.company_roles?.[0]?.name || "Advogado"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-2">Nenhum advogado atribuído</p>
              )}
            </CardContent>
          </Card>

          {/* Estatísticas Rápidas */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Estatísticas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Prioridade</p>
                  <Badge variant="outline" className="w-full justify-center text-xs">
                    {caseData.priority === "high"
                      ? "Alta"
                      : caseData.priority === "medium"
                        ? "Média"
                        : "Baixa"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Status</p>
                  <Badge variant="secondary" className="w-full justify-center text-xs">
                    {caseData.status === "active"
                      ? "Activo"
                      : caseData.status === "pending"
                        ? "Pendente"
                        : "Concluído"}
                  </Badge>
                </div>
              </div>

              <div className="pt-2 border-t space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Valor do Processo</span>
                  <span className="text-sm font-semibold">
                    {caseData.case_value
                      ? new Intl.NumberFormat("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      }).format(caseData.case_value)
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Valor da Sentença</span>
                  <span className="text-sm font-semibold">
                    {caseData.sentence_value
                      ? new Intl.NumberFormat("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      }).format(caseData.sentence_value)
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Instância</span>
                  <span className="text-sm font-semibold">{caseData.instance}ª</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
