"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  MapPin,
  Users,
  Calendar as CalendarIcon,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAllEvents } from "@/hooks/queries/use-events";
import { IEvent } from "@/interfaces/IEvent";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EditEventDialog } from "./edit-event-dialog";
import { useQueryClient } from "@tanstack/react-query";

interface CompanyCalendarCardProps {
  companyId: string;
}

export default function CompanyCalendarCard({ companyId }: CompanyCalendarCardProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, data: eventsData } = useAllEvents(companyId, { page: 1, take: 100 });

  const events = eventsData?.events || [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "Audiência":
        return <CalendarIcon className="size-4" />;
      case "Reunião":
        return <Users className="size-4" />;
      case "Prazo":
        return <AlertCircle className="size-4" />;
      case "Videoconferência":
        return <Video className="size-4" />;
      default:
        return <Clock className="size-4" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "Audiência":
        return "Audiência";
      case "Reunião":
        return "Reunião";
      case "Prazo":
        return "Prazo";
      case "Videoconferência":
        return "Videoconferência";
      default:
        return type;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Audiência":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
      case "Reunião":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
      case "Prazo":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
      case "Videoconferência":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  // Função para converter data ISO para string no formato YYYY-MM-DD
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Gerar dias do calendário
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Adicionar células vazias para dias antes do início do mês
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Adicionar dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Obter eventos para um dia específico
  const getEventsForDay = (day: number) => {
    if (!day) return [];

    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => formatDateToString(new Date(e.start_date)) === dateStr);
  };

  // Verificar se é hoje
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const handleEditClick = (event: IEvent) => {
    setSelectedEvent(event);
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card className="lg:col-span-5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Carregando...</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="text-center text-sm font-medium text-muted-foreground p-2">
                  .
                </div>
              ))}
              {[...Array(42)].map((_, i) => (
                <div key={i} className="min-h-[100px] p-2 border rounded-lg bg-muted/30" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="lg:col-span-5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <CardTitle>
                {format(currentDate, "MMMM yyyy", { locale: ptBR })}
              </CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList>
                <TabsTrigger value="month">Mês</TabsTrigger>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="day">Dia</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Cabeçalho dos dias da semana */}
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}

            {/* Dias do calendário */}
            {calendarDays.map((day, index) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              const today = day && isToday(day);

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-lg ${
                    !day ? "bg-muted/30" : "hover:bg-muted/50 cursor-pointer"
                  } ${today ? "ring-2 ring-violet-500" : ""}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${today ? "text-violet-600" : ""}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event: IEvent) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate flex justify-between items-center ${getEventTypeColor(event.type)}`}
                          >
                            <span className="truncate">
                              {format(new Date(event.start_date), "HH:mm")} {event.title}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1 opacity-0 hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(event);
                              }}
                              aria-label="Editar evento"
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 2} mais
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <EditEventDialog
        event={selectedEvent}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        companyId={companyId}
        onSuccess={() => {
          // Refresh the events list after successful edit/delete
          queryClient.invalidateQueries({ queryKey: ['events', companyId] });
          queryClient.invalidateQueries({ queryKey: ['kpis', companyId, 'agenda'] });
          setIsEditDialogOpen(false);
        }}
      />
    </>
  );
}