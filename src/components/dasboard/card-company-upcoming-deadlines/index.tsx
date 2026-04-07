"use client"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { TaskCardSkeleton } from "@/components/ui/skeleton-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate } from "@/utils/formatDate"
import { useAllEvents } from "@/hooks/queries/use-events"
import { getRemainingDays } from "@/utils/getRemainingDays"


export default function CardCompanyUpcomingDeadlines () {

  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isLoadingEvents, data } = useAllEvents(company?.id as string, { page: 1, take: 3})

  return isLoading || isLoadingEvents
    ? <TaskCardSkeleton />
    : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Próximos Prazos</CardTitle>
                <CardDescription>Prazos que vencem em breve</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${company?.id}/agenda`}>
                  Ver todos
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.events?.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${
                    getRemainingDays(new Date(), deadline.start_date) <= 5 ? "bg-red-100 dark:bg-red-950" : "bg-blue-100 dark:bg-blue-950"
                  }`}>
                    <Calendar className={`size-5 ${
                      getRemainingDays(new Date(), deadline.start_date) <= 5 ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                    }`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground">{deadline?.process?.title || "Processo não especificado"}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {formatDate(deadline.start_date, "short")}
                      </Badge>
                      <Badge variant={getRemainingDays(new Date(), deadline.start_date) <= 5 ? "destructive" : "default"} className="text-xs">
                        {getRemainingDays(new Date(), deadline.start_date)} dias
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    )
}
