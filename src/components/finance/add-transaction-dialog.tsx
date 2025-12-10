"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus, Save, ArrowUpRight, ArrowDownRight } from "lucide-react"

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Selecione uma categoria"),
  description: z.string().min(3, "Descrição deve ter no mínimo 3 caracteres"),
  amount: z.string().min(1, "Informe o valor"),
  date: z.string().min(1, "Selecione a data"),
  status: z.enum(["completed", "pending"]),
  clientId: z.string().optional(),
  caseId: z.string().optional(),
})

type TransactionFormValues = z.infer<typeof transactionSchema>

interface AddTransactionDialogProps {
  onSuccess?: () => void
}

export function AddTransactionDialog({ onSuccess }: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income")

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "income",
      category: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      status: "completed",
      clientId: "",
      caseId: "",
    },
  })

  function onSubmit(values: TransactionFormValues) {
    console.log(values)
    toast.success("Lançamento cadastrado com sucesso!")
    setOpen(false)
    form.reset()
    onSuccess?.()
  }

  const incomeCategories = [
    "Honorários",
    "Consultoria",
    "Assessoria",
    "Outros",
  ]

  const expenseCategories = [
    "Custas Processuais",
    "Infraestrutura",
    "Pessoal",
    "Marketing",
    "Impostos",
    "Outros",
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Novo Lançamento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Lançamento</DialogTitle>
          <DialogDescription>
            Registre uma receita ou despesa
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Lançamento *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value)
                        setTransactionType(value as "income" | "expense")
                        form.setValue("category", "")
                      }}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="income"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-green-500"
                      >
                        <RadioGroupItem value="income" id="income" className="sr-only" />
                        <ArrowUpRight className="mb-3 size-6 text-green-500" />
                        <div className="space-y-1 text-center">
                          <p className="text-sm font-medium">Receita</p>
                          <p className="text-xs text-muted-foreground">Entrada de dinheiro</p>
                        </div>
                      </Label>
                      <Label
                        htmlFor="expense"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-red-500"
                      >
                        <RadioGroupItem value="expense" id="expense" className="sr-only" />
                        <ArrowDownRight className="mb-3 size-6 text-red-500" />
                        <div className="space-y-1 text-center">
                          <p className="text-sm font-medium">Despesa</p>
                          <p className="text-xs text-muted-foreground">Saída de dinheiro</p>
                        </div>
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(transactionType === "income" ? incomeCategories : expenseCategories).map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o lançamento..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="mr-2 size-4" />
                Salvar Lançamento
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
