"use client"

/**
 * CreateCaseDialog.tsx
 *
 * Dialog para criação de novos processos jurídicos.
 * Utiliza o componente CaseFormBody partilhado.
 */

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Gavel, Loader2, Plus, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { toast } from "sonner"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { useCreateProcess } from "@/hooks/queries/use-process"
import { useAttorneyACL } from "@/hooks/queries/use-company-acl"
import { useClients } from "@/hooks/queries/clients/use-clients"
import {
  processFormSchema,
  type ProcessFormValues,
} from "@/schemas/process-schema"
import { CaseFormBody } from "./case-form-body"

// ─── Valores padrão ───────────────────────────────────────────────────────

const DEFAULT_VALUES: ProcessFormValues = {
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
}

interface CreateCaseDialogProps {
  onSuccess?: () => void
}

export function CreateCaseDialog({ onSuccess }: CreateCaseDialogProps) {
  const [open, setOpen] = useState(false)
  const { company } = useCompanyDashboardContext()
  const { mutate: createProcess, isPending } = useCreateProcess()

  // Carregar dados de clientes e advogados
  const { data: clientsData, isLoading: isLoadingClients } = useClients(
    company?.id as string,
    1,
    100
  )

  const { data: lawyersData, isLoading: isLoadingLawyers, error } = useAttorneyACL(
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
    defaultValues: DEFAULT_VALUES,
  })

  function onSubmit(values: ProcessFormValues) {
    if (!company) return

    // Mapear para o formato esperado pelo backend
    const processData: any = {
      ...values,
      company_id: company.id,
      distributed_in: new Date(values.distributed_in).toISOString(),
      case_value: Number(values.case_value) || 0,
      sentence_value: Number(values.sentence_value) || 0,
      instance: Number(values.instance) || 1,
    }

    createProcess(
      {
        companyId: company.id,
        processData,
      },
      {
        onSuccess: () => {
          toast.success("Processo cadastrado com sucesso!")
          setOpen(false)
          form.reset(DEFAULT_VALUES)
          onSuccess?.()
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message ?? "Erro ao criar processo."
          )
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 size-4" />
          Novo Processo
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 p-0 min-w-2xl w-[95vw] min-h-[92vh]">
        {/* Header */}
        <div className="flex items-start gap-4 border-b bg-muted/30 px-6 py-5 rounded-t-xl">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Gavel className="size-5" />
          </div>
          <div>
            <DialogTitle className="text-base font-semibold">
              Novo Processo
            </DialogTitle>
            <DialogDescription className="text-xs mt-0.5">
              Preencha os dados judiciais nos passos abaixo.
            </DialogDescription>
          </div>
        </div>

        {/* Body with scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <Form {...form}>
            <form
              id="create-case-form"
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
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="create-case-form"
              size="sm"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 size-3.5 animate-spin" />
              ) : (
                <Save className="mr-2 size-3.5" />
              )}
              {isPending ? "A guardar..." : "Criar Processo"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
