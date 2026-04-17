"use client"

import { useEffect, useState } from "react"
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
import { Save, Trash, Clock, MapPin, Calendar as CalendarIcon } from "lucide-react"
import { eventService } from "@/services/event-service"
import { IEvent, IEventType, IEventPriority } from "@/interfaces/IEvent"
import { Loader2 } from "lucide-react"
import { useAllProcessesInfinite } from "@/hooks/queries/use-process"

const eventSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  type: z.nativeEnum(IEventType),
  date: z.string().min(1, "Selecione a data"),
  time: z.string().min(1, "Selecione o horário"),
  duration: z.string().optional(),
  location: z.string().min(1, "Localização é obrigatória").optional(),
  process_id: z.string().optional(),
  priority: z.nativeEnum(IEventPriority),
  observations: z.string().optional(),
})

type EventFormValues = z.infer<typeof eventSchema>

interface EditEventDialogProps {
  event: IEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  companyId: string
}

export function EditEventDialog({
  event,
  open,
  onOpenChange,
  onSuccess,
  companyId
}: EditEventDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  // Adicionando o hook para buscar os processos
  const { data: processesData, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useAllProcessesInfinite(companyId)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      type: IEventType.MEETING,
      date: "",
      time: "",
      duration: "60",
      location: "",
      process_id: "",
      priority: IEventPriority.MEDIUM,
      observations: "",
    },
  })

  // Função para carregar mais processos quando necessário
  const loadMoreProcesses = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  // Update form values when event changes
  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_date)
      const formattedDate = startDate.toISOString().split('T')[0]
      const formattedTime = startDate.toTimeString().slice(0, 5)

      form.reset({
        title: event.title || "",
        type: event.type || IEventType.MEETING,
        date: formattedDate,
        time: formattedTime,
        duration: String(event.internal_advance_alerts || 60),
        location: event.location || "",
        process_id: event.process_id || "",
        priority: event.priority || IEventPriority.MEDIUM,
        observations: event.observations || "",
      })
    }
  }, [event, form])

  async function onSubmit(values: EventFormValues) {
    if (!event) return

    try {
      // Convert the form values to the expected format for the API
      const startDateString = `${values.date}T${values.time}:00.000Z`
      const startDate = new Date(startDateString)
      const duration = parseInt(values.duration || "60", 10)
      const endDate = new Date(startDate.getTime() + duration * 60000) // Add duration in minutes

      const updateData = {
        title: values.title,
        type: values.type,
        priority: values.priority,
        start_date: startDate,
        end_date: endDate,
        location: values.location || "",
        observations: values.observations,
        process_id: values.process_id,
        all_day: false, // We can extend this later if needed
        internal_advance_alerts: duration,
      }

      await eventService.updateEvent(companyId, event.id, updateData)
      toast.success("Evento atualizado com sucesso!")
      onOpenChange(false)
      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error("Error updating event:", error)
      toast.error("Erro ao atualizar evento")
    }
  }

  const handleDelete = async () => {
    if (!event) return

    try {
      setIsDeleting(true)
      await eventService.deleteEvent(companyId, event.id)
      toast.success("Evento excluído com sucesso!")
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Error deleting event:", error)
      toast.error("Erro ao excluir evento")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{event ? "Editar Evento" : "Novo Evento"}</DialogTitle>
          <DialogDescription>
            {event
              ? "Atualize as informações do evento"
              : "Agende um compromisso, audiência ou prazo"}
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={IEventType.HEARING}>{IEventType.HEARING}</SelectItem>
                        <SelectItem value={IEventType.MEETING}>{IEventType.MEETING}</SelectItem>
                        <SelectItem value={IEventType.TERM}>{IEventType.TERM}</SelectItem>
                        <SelectItem value={IEventType.VIDEO}>{IEventType.VIDEO}</SelectItem>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={IEventPriority.LOW}>Baixa</SelectItem>
                        <SelectItem value={IEventPriority.MEDIUM}>Média</SelectItem>
                        <SelectItem value={IEventPriority.HIGH}>Alta</SelectItem>
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
                  <FormItem className="relative">
                    <FormLabel>Data *</FormLabel>
                    <FormControl>
                      <>
                        <Input type="date" className="pl-8" {...field} />
                        <CalendarIcon className="absolute left-2 top-9 h-4 w-4 text-muted-foreground" />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Horário *</FormLabel>
                    <FormControl>
                      <>
                        <Input type="time" className="pl-8" {...field} />
                        <Clock className="absolute left-2 top-9 h-4 w-4 text-muted-foreground" />
                      </>
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
                <FormItem className="relative">
                  <FormLabel>Local *</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="Ex: Fórum Central - Sala 201"
                        className="pl-8"
                        {...field}
                      />
                      <MapPin className="absolute left-2 top-9 h-4 w-4 text-muted-foreground" />
                    </>
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
                          {process.process_number} - {process.title}
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
              name="observations"
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

            <DialogFooter className="flex sm:justify-between gap-2">
              {event && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>Excluindo...</>
                  ) : (
                    <>
                      <Trash className="mr-2 size-4" />
                      Excluir
                    </>
                  )}
                </Button>
              )}

              <div className="flex gap-2 ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="mr-2 size-4" />
                  Salvar Evento
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}