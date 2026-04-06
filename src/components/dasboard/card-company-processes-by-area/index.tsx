"use client"



import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { CaseCardSkeleton } from "@/components/ui/skeleton-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useProcessesStatistics } from "@/hooks/queries/use-process"
import { Badge } from "@/components/ui/badge"
import { FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function CardCompanyProcessesByArea () {

  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isStatisticsLoading, data } = useProcessesStatistics(company?.id as string)

  return isLoading || isStatisticsLoading
    ? <CaseCardSkeleton className="lg:col-span-3" />
    : (
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Processos por Área <Badge>{data?.total_processes || 0}</Badge></CardTitle>
            <CardDescription>Distribuição de casos</CardDescription>
          </CardHeader>
          <CardContent>
            {
                data?.total_processes === 0
                ?   (
                        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                <FolderOpen className="size-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Nenhum processo encontrado</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    A estatística de processos cadastrados aparecerão aqui.
                                </p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                                <Link href={`/${company?.id}/cases`}>
                                    Cadastrar processo
                                </Link>
                            </Button>
                        </div>
                    )
                :   (
                        <div className="space-y-4">
                            {data?.by_area?.map((item) => (
                                <div key={item.legal_area} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium capitalize">{item.legal_area}</span>
                                    <span className="text-muted-foreground">{item.total} casos</span>
                                </div>
                                <Progress value={item.percentage} className="h-2" />
                                </div>
                            ))}
                        </div>
                    )
            }
            
          </CardContent>
        </Card>
    )
}
