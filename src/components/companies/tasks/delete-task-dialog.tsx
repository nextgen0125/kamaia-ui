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
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { useDeleteTask } from "@/hooks/queries/tasks/use-task"
import { Loader2 } from "lucide-react"

interface DeleteTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: {
    id: string
    title: string
  }
}

export function DeleteTaskDialog({ open, onOpenChange, task }: DeleteTaskDialogProps) {
  const params = useParams()
  const companyId = params.company_id as string
  const { mutate: deleteTask, isPending } = useDeleteTask()

  const handleDelete = () => {
    deleteTask(
      { companyId, taskId: task.id },
      {
        onSuccess: () => {
          toast.success("Tarefa removida com sucesso!")
          onOpenChange(false)
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Erro ao remover tarefa")
        },
      }
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. A tarefa <strong>{task.title}</strong> será permanentemente removida.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }} 
            className="bg-destructive hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

