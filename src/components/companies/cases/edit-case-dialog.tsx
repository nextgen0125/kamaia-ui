"use client"

/**
 * EditCaseDialog.tsx
 *
 * Dialog para edição de processos jurídicos existentes.
 * Utiliza o componente CaseFormBody partilhado.
 */

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Gavel, Loader2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
import { cn } from "@/lib/utils"
import { toast } from "sonner"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { useUpdateProcess } from "@/hooks/queries/use-process"
import { useAttorneyACL } from "@/hooks/queries/use-company-acl"
import { useClients } from "@/hooks/queries/clients/use-clients"
import {
  processFormSchema,
  type ProcessFormValues,
} from "@/schemas/process-schema"
import type { IProcess } from "@/interfaces/IProcess"
import { CaseFormBody } from "./case-form-body"

interface EditCaseDialogProps {
  caseData: IProcess
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditCaseDialog({
  caseData,
  open,
  onOpenChange,
}: EditCaseDialogProps) {
  const { company } = useCompanyDashboardContext()
  const { mutate: updateProcess, isPending } = useUpdateProcess()

  // Carregar dados de clientes e advogados
  const { data: clientsData, isLoading: isLoadingClients } = useClients(
    company?.id as string,
    1,
    100
  )

  const { data: lawyersData, isLoading: isLoadingLawyers } = useAttorneyACL(
    company?.id as string,
    { page: 1, take: 100 }
  )

  // Mapear dados para o formato esperado pelo formulário
  const clients = (clientsData?.clients ?? []).map((c) => ({
    id: c.id,
    name: c.name ?? c.name,
  }))

  const lawyers = (lawyersData?.company_acls ?? []).map((acl) => ({
    id: acl.id,
    name: acl.user.full_name || `${acl.user.firstName} ${acl.user.lastName}`.trim(),
  }))

  const form = useForm<ProcessFormValues>({
    resolver: zodResolver(processFormSchema),
    defaultValues: {
      title: "",
      process_number: "",
      description: "",
      status: "active",
      priority: "medium",
      legal_area: undefined as any,
      case_value: 0,
      sentence_value: 0,
      instance: 1,
      court: "",
      court_type: "Estadual",
      jurisdiction: "",
      distributed_in: new Date().toISOString().split("T")[0],
      client_id: "",
      company_acl_id: "",
      object: "",
      access: "private",
    },
  })

  // Preencher formulário ao abrir o dialog
  useEffect(() => {
    if (!caseData || !open) return

    form.reset({
      title: caseData.title ?? "",
      process_number: caseData.process_number ?? "",
      description: caseData.description ?? "",
      status: (caseData.status as any) ?? "active",
      priority: (caseData.priority as any) ?? "medium",
      legal_area: (caseData.legal_area as any) ?? undefined,
      case_value: caseData.case_value ?? 0,
      sentence_value: caseData.sentence_value ?? 0,
      instance: caseData.instance ?? 1,
      court: caseData.court ?? "",
      court_type: caseData.court_type ?? "Estadual",
      jurisdiction: caseData.jurisdiction ?? "",
      distributed_in: caseData.distributed_in
        ? new Date(caseData.distributed_in).toISOString().split("T")[0]
        : "",
      client_id: caseData.involveds?.[0]?.client?.id ?? "",
      company_acl_id: caseData.company_acl?.id ?? "",
      object: caseData.object ?? "",
      access: (caseData.access as any) ?? "private",
    })
  }, [caseData, open, form])

  function onSubmit(values: ProcessFormValues) {
    if (!company) return

    // Mapear para o formato esperado pelo backend
    const processData: any = {
      ...values,
      id: caseData.id,
      company_id: company.id,
      distributed_in: new Date(values.distributed_in).toISOString(),
      case_value: Number(values.case_value) || 0,
      sentence_value: Number(values.sentence_value) || 0,
      instance: Number(values.instance) || 1,
    }

    updateProcess(
      {
        companyId: company.id,
        processId: caseData.id,
        processData,
      },
      {
        onSuccess: () => {
          toast.success("Processo actualizado com sucesso!")
          onOpenChange(false)
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message ?? "Erro ao actualizar processo."
          )
        },
      }
    )
  }

  const priorityColor = {
    high: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
    medium: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    low: "border-slate-400/30 bg-slate-400/10 text-slate-600 dark:text-slate-400",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 p-0 min-w-2xl w-[95vw] min-h-[92vh]">
        {/* Header */}
        <div className="flex items-start gap-4 border-b bg-muted/30 px-6 py-5 rounded-t-xl">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 shadow-sm dark:text-amber-400">
            <Gavel className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-base font-semibold truncate">
              Editar Processo
            </DialogTitle>
            <DialogDescription className="text-xs mt-0.5 truncate">
              {caseData.process_number ? (
                <span className="font-mono">{caseData.process_number}</span>
              ) : (
                caseData.title
              )}
            </DialogDescription>
          </div>

          {/* Priority Badge */}
          <Badge
            variant="outline"
            className={cn(
              "ml-auto shrink-0 text-xs",
              priorityColor[caseData.priority as keyof typeof priorityColor] ||
              priorityColor.medium
            )}
          >
            {caseData.priority === "high"
              ? "Alta"
              : caseData.priority === "medium"
                ? "Média"
                : "Baixa"}
          </Badge>
        </div>

        {/* Body with scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <Form {...form}>
            <form
              id="edit-case-form"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <CaseFormBody
                form={form}
                isPending={isPending}
                clients={clients}
                lawyers={lawyers}
                isLoadingClients={isLoadingClients}
                isLoadingLawyers={isLoadingLawyers}
              />
            </form>
          </Form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t bg-muted/20 px-6 py-4 rounded-b-xl">
          <p className="text-xs text-muted-foreground">
            Campos marcados com <span className="text-destructive">*</span> são
            obrigatórios
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="edit-case-form"
              size="sm"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 size-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 size-3.5" />
              )}
              {isPending ? "A guardar..." : "Guardar Alterações"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


