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

interface DeleteLawyerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lawyer: {
    id: number
    name: string
    cases: number
  }
}

export function DeleteLawyerDialog({ open, onOpenChange, lawyer }: DeleteLawyerDialogProps) {
  const handleDelete = () => {
    toast.success("Advogado removido com sucesso!", {
      description: `${lawyer.name} foi removido do sistema.`,
    })
    console.log("Deleting lawyer:", lawyer.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O advogado <strong>{lawyer.name}</strong> será permanentemente removido do sistema.
            {lawyer.cases > 0 && (
              <span className="block mt-2 text-amber-600">
                ⚠️ Este advogado tem {lawyer.cases} caso(s) associado(s).
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
