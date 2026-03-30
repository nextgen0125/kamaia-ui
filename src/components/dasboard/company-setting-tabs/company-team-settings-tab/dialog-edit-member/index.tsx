"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { ICompanyACL } from "@/interfaces/ICompanyACL"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z, { string } from "zod"
import { AVAILABLE_PERMISSIONS, AVAILABLE_ROLES, MemberFormFields, memberFormSchema } from "../dialog-add-member"
import { useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import { ICompanyRole } from "@/interfaces/ICompanyRole"
import { ICompanyPermission } from "@/interfaces/ICompanyPermission"



// ─── Dialog: Editar membro ────────────────────────────────────────────────────

interface DialogEditMemberProps {
  member: ICompanyACL | null
  open: boolean
  onOpenChange: (v: boolean) => void
}

// Edição não exige password
const editMemberFormSchema = memberFormSchema.extend({
  password: string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "A senha deve conter pelo menos uma letra maiúscula e uma minúscula.")
    .optional()
    .or(z.literal("")),
})


type EditMemberFormValues = z.infer<typeof editMemberFormSchema>

export function DialogEditMember({ member, open, onOpenChange }: DialogEditMemberProps) {
    const params = useParams();

  const form = useForm<EditMemberFormValues>({
    resolver: zodResolver(editMemberFormSchema),
    defaultValues: {
      firstName: member?.user?.firstName,
      lastName: member?.user?.lastName,
      email: member?.user?.email ?? "",
      phone: member?.user?.phone ?? "",
      password: "",
      company_roles: member?.company_roles.map((r: ICompanyRole) => r.type) ?? [],
      company_permissions: member?.company_permissions.map((p: ICompanyPermission) => p.type) ?? [],
    },
  })

  // Sincroniza quando o member muda
  useEffect(() => {
    if (member) {
      form.reset({
        firstName: member?.user?.firstName,
        lastName: member?.user?.lastName,
        email: member?.user?.email,
        phone: member?.user?.phone,
        password: "",
        company_roles: member?.company_roles.map((r: ICompanyRole) => r.type),
        company_permissions: member?.company_permissions.map((p: ICompanyPermission) => p.type),
      })
    }
  }, [member, form])

  const isLoading = form.formState.isSubmitting

  const handleSubmit = async (data: EditMemberFormValues) => {
    if (!member) return
    await new Promise((r) => setTimeout(r, 900))

    const updated: any = {
      ...member,
      full_name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      company_roles: data.company_roles.map((r) => ({
        id: r,
        name: AVAILABLE_ROLES.find((x) => x.value === r)?.label ?? r,
        type: r,
      })),
      company_permissions: (data.company_permissions ?? []).map((p) => ({
        id: p,
        name: AVAILABLE_PERMISSIONS.find((x) => x.value === p)?.label ?? p,
        type: p,
      })),
    }

    toast.success("Membro actualizado com sucesso!")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Membro</DialogTitle>
          <DialogDescription>
            Actualize os dados de <strong>{member?.user?.full_name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <MemberFormFields form={form as any} isLoading={isLoading} mode="edit" />
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "A guardar..." : "Guardar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
