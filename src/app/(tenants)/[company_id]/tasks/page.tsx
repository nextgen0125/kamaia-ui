"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddTaskDialog } from "@/components/companies/tasks/add-task-dialog"
import { TasksKPICards } from "@/components/companies/tasks/TasksKPICards"
import { TasksProgressCard } from "@/components/companies/tasks/TasksProgressCard"
import { TasksListCard } from "@/components/companies/tasks/TasksListCard"
import { TaskListsCard } from "@/components/companies/task-lists/TaskListsCard"
import { ListTodo, Settings2 } from "lucide-react"

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
        <div className="flex items-center gap-2">
           <AddTaskDialog />
        </div>
      </div>

      <Tabs defaultValue="tasks" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="tasks" className="gap-2">
            <ListTodo className="size-4" />
            Tarefas
          </TabsTrigger>
          <TabsTrigger value="lists" className="gap-2">
            <Settings2 className="size-4" />
            Gerenciar Listas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-8">
          {/* KPI Section */}
          <TasksKPICards />

          {/* Mid Section: Statistics and General Progress */}
          <div className="grid gap-6 lg:grid-cols-1">
            <TasksProgressCard />
          </div>

          {/* Main Section: Task List with Filters and Search */}
          <TasksListCard />
        </TabsContent>

        <TabsContent value="lists">
          <TaskListsCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

