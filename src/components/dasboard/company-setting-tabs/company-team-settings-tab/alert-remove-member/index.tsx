"use client";

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
import { ICompanyACL } from "@/interfaces/ICompanyACL";
import { useState } from "react";
import { toast } from "sonner";

// ─── Dialog: Confirmar remoção ────────────────────────────────────────────────

interface AlertRemoveMemberProps {
  member: ICompanyACL | null
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function AlertRemoveMember({ member, open, onOpenChange }: AlertRemoveMemberProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    if (!member) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    toast.success("Membro removido com sucesso!")
    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover membro</AlertDialogTitle>
          <AlertDialogDescription>
            Tem a certeza que pretende remover{" "}
            <strong>{member?.user?.full_name}</strong> da equipe? Esta acção não pode
            ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "A remover..." : "Remover"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
