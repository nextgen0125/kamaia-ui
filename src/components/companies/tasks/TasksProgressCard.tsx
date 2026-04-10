"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useParams } from "next/navigation"
import { useTaskProgress } from "@/hooks/queries/tasks/use-task"
import { Skeleton } from "@/components/ui/skeleton"

export function TasksProgressCard() {
  const params = useParams()
  const companyId = params.company_id as string
  const { data: progress, isLoading } = useTaskProgress(companyId)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-8 w-12" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-2 w-full" />
        </CardContent>
      </Card>
    )
  }

  const completionRate = progress?.completionRate || 0
  const total = progress?.total || 0
  const done = progress?.done || 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Progresso Geral</CardTitle>
            <CardDescription>
              {done} de {total} tarefas concluídas
            </CardDescription>
          </div>
          <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={completionRate} className="h-2" />
      </CardContent>
    </Card>
  )
}
