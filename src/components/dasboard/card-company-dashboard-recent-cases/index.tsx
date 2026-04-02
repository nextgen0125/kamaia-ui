"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import Link from "next/link"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { CaseCardSkeleton, StatCardSkeleton } from "@/components/ui/skeleton-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  FolderOpen,
} from "lucide-react"
import { useCompanyKPIs } from "@/hooks/queries/use-companies"
import { useParams } from "next/navigation"
import { getPriorityColor } from "@/utils/getPriorityColor"
import { formatDate } from "@/utils/formatDate"
import { useProcesses } from "@/hooks/queries/use-process"

export default function CardCompanyDashboardRecentCases () {

    const recentCases = [
    {
      id: 1,
      number: "0001234-56.2024.8.26.0100",
      title: "Ação Trabalhista - Horas Extras",
      client: "Carlos Mendes",
      status: "active",
      priority: "high",
      date: "2024-03-15",
    },
    {
      id: 2,
      number: "0002345-67.2024.8.26.0000",
      title: "Divórcio Consensual",
      client: "Ana Paula Oliveira",
      status: "active",
      priority: "medium",
      date: "2024-03-14",
    },
    {
      id: 3,
      number: "0003456-78.2024.8.26.0100",
      title: "Cobrança - Inadimplência",
      client: "Empresa ABC Ltda",
      status: "pending",
      priority: "low",
      date: "2024-03-13",
    },
  ]

  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isLoadingProcesses, data } = useProcesses(company?.id as string, { page: 1, take: 5 });

  console.log(data)

  return isLoading || isLoadingProcesses
    ? <CaseCardSkeleton className="lg:col-span-4" />
    : (
      <Card className="lg:col-span-4">
        <CardHeader>
            <div className="flex items-center justify-between">
            <div>
                <CardTitle>Processos Recentes</CardTitle>
                <CardDescription>Últimos processos cadastrados</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
                <Link href={`/${company?.id}/cases`}>
                Ver todos
                <ArrowRight className="ml-2 size-4" />
                </Link>
            </Button>
            </div>
        </CardHeader>
        <CardContent>
            {data?.total === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <FolderOpen className="size-6 text-muted-foreground" />
                </div>
                <div>
                <p className="text-sm font-medium">Nenhum processo encontrado</p>
                <p className="mt-1 text-xs text-muted-foreground">
                    Os processos cadastrados aparecerão aqui.
                </p>
                </div>
                <Button size="sm" variant="outline" asChild>
                <Link href={`/${company?.id}/cases`}>
                    Cadastrar processo
                </Link>
                </Button>
            </div>
            ) : (
            <div className="space-y-4">
                {recentCases.map((case_) => (
                <div
                    key={case_.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                    <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{case_.title}</p>
                        <Badge variant={getPriorityColor(case_.priority)} className="text-xs">
                        {case_.priority === "high" ? "Alta" : case_.priority === "medium" ? "Média" : "Baixa"}
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{case_.client}</p>
                    <p className="text-xs text-muted-foreground font-mono">{case_.number}</p>
                    </div>
                    <div className="text-right">
                    <p className="text-xs text-muted-foreground">{formatDate(case_.date, "short")}</p>
                    </div>
                </div>
                ))}
            </div>
            )}
        </CardContent>
        </Card>
    )
}
