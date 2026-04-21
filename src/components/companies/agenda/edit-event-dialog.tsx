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
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Save, Trash, Clock, MapPin, Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { eventService } from "@/services/event-service"
import { IEvent, IEventType, IEventPriority, IEventTypeLabels } from "@/interfaces/IEvent"
import { useAllProcessesInfinite } from "@/hooks/queries/use-process"

const eventSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  type: z.nativeEnum(IEventType),
  startDate: z.string().min(1, "Selecione a data de início"),
  startTime: z.string().min(1, "Selecione o horário de início"),
  endDate: z.string().min(1, "Selecione a data de término"),
  endTime: z.string().min(1, "Selecione o horário de término"),
  all_day: z.boolean().default(false),
  location: z.string().min(1, "Localização é obrigatória"),
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

  // Hook para buscar os processos
  const { 
    data: processesData, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage, 
    isLoading: isLoadingProcesses 
  } = useAllProcessesInfinite(companyId)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      type: IEventType.MEETING,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      all_day: false,
      location: "",
      process_id: "",
      priority: IEventPriority.MEDIUM,
      observations: "",
    },
  })

  // Update form values when event changes
  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_date)
      const endDate = new Date(event.end_date)
      
      const formattedStartDate = startDate.toISOString().split('T')[0]
      const formattedStartTime = startDate.toTimeString().slice(0, 5)
      
      const formattedEndDate = endDate.toISOString().split('T')[0]
      const formattedEndTime = endDate.toTimeString().slice(0, 5)

      form.reset({
        title: event.title || "",
        type: event.type || IEventType.MEETING,
        startDate: formattedStartDate,
        startTime: formattedStartTime,
        endDate: formattedEndDate,
        endTime: formattedEndTime,
        all_day: event.all_day || false,
        location: event.location || "",
        process_id: event.process_id || "",
        priority: event.priority || IEventPriority.MEDIUM,
        observations: event.observations || "",
      })
    }
  }, [event, form])

  const isAllDay = form.watch("all_day")

  async function onSubmit(values: EventFormValues) {
    if (!event) return

    try {
      const startIso = `${values.startDate}T${isAllDay ? "00:00:00.000Z" : `${values.startTime}:00.000Z`}`
      const endIso = `${values.endDate}T${isAllDay ? "23:59:59.999Z" : `${values.endTime}:00.000Z`}`

      const updateData = {
        title: values.title,
        type: values.type,
        priority: values.priority,
        start_date: new Date(startIso),
        end_date: new Date(endIso),
        location: values.location,
        observations: values.observations || "",
        process_id: values.process_id,
        all_day: values.all_day,
        internal_advance_alerts: 60,
      }

      await eventService.updateEvent(companyId, event.id, updateData as any)
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

  const allProcesses = processesData?.pages.flatMap(page => page.processes) || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Editar Evento" : "Novo Evento"}</DialogTitle>
          <DialogDescription>
            {event
              ? "Atualize as informações do evento"
              : "Agende um compromisso, audiência ou prazo"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(IEventType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {IEventTypeLabels[type] || type}
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
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
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

            <div className="flex items-center space-x-2 py-2 border-y border-border/50">
              <FormField
                control={form.control}
                name="all_day"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Dia Inteiro</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Início</FormLabel>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" className="pl-9" {...field} />
                            <CalendarIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!isAllDay && (
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input type="time" className="pl-9" {...field} />
                              <Clock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Término</FormLabel>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" className="pl-9" {...field} />
                            <CalendarIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!isAllDay && (
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input type="time" className="pl-9" {...field} />
                              <Clock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
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
                      <div className="max-h-[200px] overflow-y-auto">
                        {allProcesses.map((process) => (
                          <SelectItem key={process.id} value={process.id}>
                            {process.process_number} - {process.title}
                          </SelectItem>
                        ))}
                        {hasNextPage && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            className="w-full text-xs py-1 h-8 text-primary"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              fetchNextPage()
                            }}
                            disabled={isFetchingNextPage}
                          >
                            {isFetchingNextPage ? (
                              <Loader2 className="size-3 animate-spin mr-2" />
                            ) : null}
                            Carregar mais processos...
                          </Button>
                        )}
                        {isLoadingProcesses && (
                          <div className="p-2 text-center">
                            <Loader2 className="size-4 animate-spin inline-block mr-2" />
                            <span className="text-xs text-muted-foreground">Carregando...</span>
                          </div>
                        )}
                      </div>
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
                  className="px-6 border-red-500 text-red-500 hover:bg-red-50"
                >
                  {isDeleting ? (
                    <Loader2 className="size-4 animate-spin mr-2" />
                  ) : (
                    <Trash className="mr-2 size-4" />
                  )}
                  Excluir
                </Button>
              )}

              <div className="flex gap-2 ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="px-6 bg-primary">
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
