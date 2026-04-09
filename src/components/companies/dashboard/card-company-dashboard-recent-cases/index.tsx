"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import Link from "next/link"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { CaseCardSkeleton } from "@/components/ui/skeleton-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  FolderOpen,
} from "lucide-react"
import { getPriorityColor } from "@/utils/getPriorityColor"
import { formatDate } from "@/utils/formatDate"
import { useProcesses } from "@/hooks/queries/use-process"

export default function CardCompanyDashboardRecentCases () {

  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isLoadingProcesses, data } = useProcesses(company?.id as string, { page: 1, take: 5 });

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
                {data?.processes?.map((case_) => (
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
                    <p className="text-xs text-muted-foreground">{
                        case_.involveds?.length
                            ? case_.involveds[0]?.client?.user?.full_name
                                ? case_.involveds[0].client.user.full_name + (case_.involveds.length > 1 ? <Badge variant={"secondary"}>+{case_.involveds.length -1}</Badge> : "")
                                : "Sem cliente"
                            : "Sem envolvidos"
                    } </p>
                    <p className="text-xs text-muted-foreground font-mono">{case_.process_number}</p>
                    </div>
                    <div className="text-right">
                    <p className="text-xs text-muted-foreground">{formatDate(case_.created_at, "short")}</p>
                    </div>
                </div>
                ))}
            </div>
            )}
        </CardContent>
        </Card>
    )
}
