"use client"

import { AddTaskDialog } from "@/components/companies/tasks/add-task-dialog"
import { CardsKPIs } from "@/components/companies/tasks/cards-kpis"
import { CardProgressoGeral } from "@/components/companies/tasks/card-progresso-geral"
import { CardListaTarefas } from "@/components/companies/tasks/card-lista-tarefas"

export default function TaskPage() {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Tarefas
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie o fluxo de trabalho jurídico e acompanhe SLAs de entrega
          </p>
        </div>
        <AddTaskDialog />
      </div>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* KPI Section */}
        <CardsKPIs />

        {/* Mid Section: Statistics and General Progress */}
        <div className="grid gap-6 lg:grid-cols-1">
           <CardProgressoGeral />
        </div>

        {/* Main Section: Task List with Filters and Search */}
        <CardListaTarefas />
      </div>
    </div>
  )
}

