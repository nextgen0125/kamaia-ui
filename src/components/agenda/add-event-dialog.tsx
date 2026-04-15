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
import { toast } from "sonner"
import { Plus, Save } from "lucide-react"
import { eventService } from "@/services/event-service"
import { IEventType, IEventPriority } from "@/interfaces/IEvent"
import { useAllProcessesInfinite } from "@/hooks/queries/processes/use-processes"
import { Loader2 } from "lucide-react"

const eventSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  type: z.nativeEnum(IEventType),
  date: z.string().min(1, "Selecione a data"),
  time: z.string().min(1, "Selecione o horário"),
  duration: z.string().optional(),
  location: z.string().min(1, "Localização é obrigatória").optional(),
  process_id: z.string().optional(),
  priority: z.nativeEnum(IEventPriority),
  notes: z.string().optional(),
})

type EventFormValues = z.infer<typeof eventSchema>

interface AddEventDialogProps {
  onSuccess?: () => void
  companyId: string
}

export function AddEventDialog({ onSuccess, companyId }: AddEventDialogProps) {
  const [open, setOpen] = useState(false)

  // Adicionando o hook para buscar os processos
  const { data: processesData, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useAllProcessesInfinite(companyId)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      type: IEventType.MEETING,
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      duration: "60",
      location: "",
      process_id: "",
      priority: IEventPriority.MEDIUM,
      notes: "",
    },
  })

  // Função para carregar mais processos quando necessário
  const loadMoreProcesses = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  async function onSubmit(values: EventFormValues) {
    try {
      // Convert the form values to the expected format for the API
      const startDateString = `${values.date}T${values.time}:00.000Z`
      const startDate = new Date(startDateString)
      const duration = parseInt(values.duration || "60", 10)
      const endDate = new Date(startDate.getTime() + duration * 60000) // Add duration in minutes

      const eventData = {
        company_id: companyId,
        title: values.title,
        type: values.type,
        priority: values.priority,
        start_date: startDate,
        end_date: endDate,
        location: values.location || "",
        observations: values.notes,
        process_id: values.process_id || "", // May be empty if not associated with a process
        all_day: false, // We can extend this later if needed
        internal_advance_alerts: duration,
      }

      await eventService.createEvent(companyId, eventData)
      toast.success("Evento cadastrado com sucesso!")
      setOpen(false)
      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error("Error creating event:", error)
      toast.error("Erro ao cadastrar evento")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Novo Evento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Evento</DialogTitle>
          <DialogDescription>
            Agende um compromisso, audiência ou prazo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Audiência de Conciliação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hearing">Audiência</SelectItem>
                        <SelectItem value="meeting">Reunião</SelectItem>
                        <SelectItem value="deadline">Prazo</SelectItem>
                        <SelectItem value="video">Videoconferência</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
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
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração (min)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="60" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Fórum Central - Sala 201" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="process_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vincular a Processo (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um processo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {processesData?.pages.flatMap(page => page.processes).map((process) => (
                        <SelectItem key={process.id} value={process.id}>
                          {process.process_number} - {process.name}
                        </SelectItem>
                      ))}
                      {isLoading && (
                        <SelectItem value="" disabled>
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Carregando processos...
                          </div>
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="mr-2 size-4" />
                Salvar Evento
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
