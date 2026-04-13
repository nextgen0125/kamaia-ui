"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Edit, Trash2, FolderOpen, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { useTaskLists } from "@/hooks/queries/tasks/use-task-list"
import { AddTaskListDialog } from "./AddTaskListDialog"
import { EditTaskListDialog } from "./EditTaskListDialog"
import { DeleteTaskListDialog } from "./DeleteTaskListDialog"
import { ITaskList } from "@/interfaces/ITaskList"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ICompanyACL } from "@/interfaces/ICompanyACL"
import { getFullName } from "../workspace/card-company-team-members"

export function TaskListsCard() {
  const params = useParams()
  const companyId = params.company_id as string
  
  const [search, setSearch] = useState("")
  const [editList, setEditList] = useState<ITaskList | null>(null)
  const [deleteList, setDeleteList] = useState<ITaskList | null>(null)

  const { data, isLoading } = useTaskLists(companyId)

  const filteredLists = data?.taskLists?.filter(list => 
    list.name.toLowerCase().includes(search.toLowerCase())
  ) || []

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Listas de Tarefas</CardTitle>
          <CardDescription>
            Organize suas tarefas em diferentes categorias ou projetos
          </CardDescription>
        </div>
        <AddTaskListDialog />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar listas..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        ) : filteredLists.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <FolderOpen className="size-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">Nenhuma lista encontrada</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLists.map((list) => (
              <div
                key={list.id}
                className="group relative flex flex-col justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg leading-none group-hover:text-primary transition-colors">
                      {list.name}
                    </h3>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setEditList(list)}>
                        <Edit className="mr-2 size-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => setDeleteList(list)}>
                        <Trash2 className="mr-2 size-4" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-2">
                        <Avatar className="size-5 border">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getFullName(list.company_acl as ICompanyACL) || "Member"}`} />
                            <AvatarFallback className="text-[10px]">
                              {getFullName(list.company_acl as ICompanyACL)?.substring(0, 2).toUpperCase() || "MB"}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-[11px] text-muted-foreground">
                          {getFullName(list.company_acl as ICompanyACL) || "Sem responsável"}
                        </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {editList && (
        <EditTaskListDialog
          open={!!editList}
          onOpenChange={(open) => !open && setEditList(null)}
          taskList={editList}
        />
      )}

      {deleteList && (
        <DeleteTaskListDialog
          open={!!deleteList}
          onOpenChange={(open) => !open && setDeleteList(null)}
          taskList={{
            id: deleteList.id,
            name: deleteList.name,
          }}
        />
      )}
    </Card>
  )
}
