"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useParams } from "next/navigation"
import { useDeleteTaskList } from "@/hooks/queries/tasks/use-task-list"
import { Loader2 } from "lucide-react"

interface DeleteTaskListDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  taskList: {
    id: string
    name: string
  }
}

export function DeleteTaskListDialog({ open, onOpenChange, taskList }: DeleteTaskListDialogProps) {
  const params = useParams()
  const companyId = params.company_id as string
  const { mutate: deleteTaskList, isPending } = useDeleteTaskList()

  const handleDelete = () => {
    deleteTaskList(
      { companyId, id: taskList.id },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a lista
            <strong> "{taskList.name}"</strong> e todas as tarefas associadas a ela podem ficar sem categoria.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Excluir Lista
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
