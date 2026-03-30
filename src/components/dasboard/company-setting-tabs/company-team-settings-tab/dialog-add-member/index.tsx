"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area"

import z, { array, string, union, null as zodNull } from "zod";
import { IUser } from "@/interfaces/IUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { KeyboardEvent, useRef, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

export const AVAILABLE_ROLES: { value: string; label: string }[] = [
  { value: "ADMINISTRATOR", label: "Administrador" },
  { value: "ATTORNEY", label: "Advogado" },
  { value: "ASSISTANT", label: "Assistente" },
  { value: "VIEWER", label: "Visualizador" },
]

export const AVAILABLE_PERMISSIONS: { value: string; label: string }[] = [
  { value: "LIST:ATTORNEY", label: "Listar Advogados" },
  { value: "CREATE:ATTORNEY", label: "Criar Advogados" },
  { value: "EDIT:ATTORNEY", label: "Editar Advogados" },
  { value: "DELETE:ATTORNEY", label: "Remover Advogados" },
  { value: "LIST:CASE", label: "Listar Processos" },
  { value: "CREATE:CASE", label: "Criar Processos" },
  { value: "EDIT:CASE", label: "Editar Processos" },
  { value: "DELETE:CASE", label: "Remover Processos" },
  { value: "LIST:FINANCE", label: "Listar Finanças" },
]



// ─── Schema Zod (espelho do backend createCompanyACLSchema) ───────────────────

export const memberFormSchema = z.object({
  user_id: union([string()]).optional(),

  firstName: string().min(1, "Nome é obrigatório."),

  lastName: string().min(1, "Último nome é obrigatório."),

  phone: string().min(1, "Telemóvel é obrigatório."),

  email: string()
    .trim()
    .min(1, "Email é obrigatório.")
    .email("Digite um email válido."),

  password: string()
    .trim()
    .min(8, "A senha deve conter no mínimo 8 caracteres.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "A senha deve conter pelo menos uma letra maiúscula e uma minúscula."
    )
    .optional()
    .or(z.literal("")),

  company_roles: array(string()).min(1, "Deve haver pelo menos um cargo atribuído."),

  company_permissions: union([array(string()), zodNull()]).optional(),
})


export type MemberFormValues = z.infer<typeof memberFormSchema>


// ─── MultiSelect ──────────────────────────────────────────────────────────────
 
interface MultiSelectOption {
  value: string
  label: string
}
 
interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  /** Máximo de badges visíveis antes de mostrar "+N" */
  maxVisible?: number
}
 
export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  disabled = false,
  maxVisible = 2,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
 
  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )
 
  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue))
    } else {
      onChange([...value, optValue])
    }
  }
 
  const remove = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter((v) => v !== optValue))
  }
 
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setOpen(false)
  }
 
  const visible = value.slice(0, maxVisible)
  const overflow = value.length - maxVisible
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            // Mesmos tokens visuais do SelectTrigger do design system
            "flex min-h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            open && "border-ring ring-[3px] ring-ring/50"
          )}
          onClick={() => {
            setOpen((o) => !o)
            setTimeout(() => inputRef.current?.focus(), 50)
          }}
        >
          {/* Badges dos itens seleccionados */}
          <span className="flex flex-1 flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              <>
                {visible.map((v) => {
                  const label = options.find((o) => o.value === v)?.label ?? v
                  return (
                    <Badge
                      key={v}
                      variant="secondary"
                      className="gap-1 pr-1 text-xs font-normal"
                    >
                      {label}
                      <span
                        role="button"
                        aria-label={`Remover ${label}`}
                        onClick={(e) => remove(v, e)}
                        className="ml-0.5 cursor-pointer rounded-sm opacity-60 hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </span>
                    </Badge>
                  )
                })}
                {overflow > 0 && (
                  <Badge variant="outline" className="text-xs font-normal">
                    +{overflow}
                  </Badge>
                )}
              </>
            )}
          </span>
 
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground/80" />
        </button>
      </PopoverTrigger>
 
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        sideOffset={4}
      >
        {/* Campo de pesquisa */}
        <div className="border-b px-3 py-2">
          <Input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pesquisar..."
            className="h-7 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
          />
        </div>
 
        <ScrollArea className="max-h-52">
          {filtered.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Nenhum resultado.
            </p>
          ) : (
            <div className="p-1">
              {filtered.map((opt) => {
                const selected = value.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => toggle(opt.value)}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      selected && "font-medium"
                    )}
                  >
                    {/* Check à esquerda */}
                    <span className="mr-2 flex h-4 w-4 items-center justify-center">
                      {selected && <Check className="h-3.5 w-3.5 text-primary" />}
                    </span>
                    {opt.label}
                  </button>
                )
              })}
            </div>
          )}
        </ScrollArea>
 
        {/* Rodapé com acção "limpar tudo" — só aparece se houver selecção */}
        {value.length > 0 && (
          <div className="border-t p-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full justify-center text-xs text-muted-foreground"
              onClick={() => {
                onChange([])
                setSearch("")
              }}
            >
              Limpar selecção
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}


// ─── Sub-componente: Formulário de membro (create & edit) ─────────────────────

interface MemberFormFieldsProps {
  form: ReturnType<typeof import("react-hook-form").useForm<any>>
  isLoading: boolean
  mode: "create" | "edit"
}
 
export function MemberFormFields({ form, isLoading, mode }: MemberFormFieldsProps) {
  return (
    <div className="space-y-4 py-1">
      {/* Nome e Último nome lado a lado */}
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="firstName"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Último nome</FormLabel>
              <FormControl>
                <Input placeholder="Sobrenome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
 
      <FormField
        control={form.control}
        name="email"
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="membro@escritorio.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
 
      <FormField
        control={form.control}
        name="phone"
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telemóvel</FormLabel>
            <FormControl>
              <Input placeholder="+244 924 585 752" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
 
      <FormField
        control={form.control}
        name="password"
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Senha{" "}
              {mode === "edit" && (
                <span className="text-muted-foreground font-normal text-xs">
                  (deixe em branco para manter a actual)
                </span>
              )}
            </FormLabel>
            <FormControl>
              <Input type="password" placeholder="••••••••" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
 
      {/* Cargos e Permissões lado a lado em grid — cada um com o MultiSelect */}
      <div className="grid grid-cols-1 gap-3">
        <FormField
          control={form.control}
          name="company_roles"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargos</FormLabel>
              <FormControl>
                <MultiSelect
                  options={AVAILABLE_ROLES}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  placeholder="Selecione cargos..."
                  disabled={isLoading}
                  maxVisible={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <FormField
          control={form.control}
          name="company_permissions"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Permissões{" "}
                <span className="text-muted-foreground font-normal text-xs">(opcional)</span>
              </FormLabel>
              <FormControl>
                <MultiSelect
                  options={AVAILABLE_PERMISSIONS}
                  value={(field.value as string[]) ?? []}
                  onChange={field.onChange}
                  placeholder="Selecione permissões..."
                  disabled={isLoading}
                  maxVisible={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

// ─── Dialog: Adicionar membro ─────────────────────────────────────────────────

interface DialogAddMemberProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSuccess: (member: IUser) => void
}

export function DialogAddMember({ open, onOpenChange, onSuccess }: DialogAddMemberProps) {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      company_roles: [],
      company_permissions: [],
    },
  })

  const isLoading = form.formState.isSubmitting

  const handleSubmit = async (data: MemberFormValues) => {
    // Simulação de request
    await new Promise((r) => setTimeout(r, 900))

    const newMember: any = {
      id: `acl-${Date.now()}`,
      user_id: `usr-${Date.now()}`,
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
      created_at: new Date(),
    }

    onSuccess(newMember)
    toast.success("Membro adicionado com sucesso!")
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Membro</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar um novo membro à equipe.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <MemberFormFields form={form} isLoading={isLoading} mode="create" />
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
                {isLoading ? "A adicionar..." : "Adicionar Membro"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
