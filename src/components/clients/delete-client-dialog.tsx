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

interface DeleteClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: {
    id: number
    name: string
    cases: number
  }
}

export function DeleteClientDialog({ open, onOpenChange, client }: DeleteClientDialogProps) {
  const handleDelete = () => {
    toast.success("Cliente removido com sucesso!", {
      description: `${client.name} foi removido do sistema.`,
    })
    console.log("Deleting client:", client.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O cliente <strong>{client.name}</strong> será permanentemente removido do sistema.
            {client.cases > 0 && (
              <span className="block mt-2 text-amber-600">
                ⚠️ Este cliente tem {client.cases} processo(s) associado(s).
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
