"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  MoreHorizontal
} from "lucide-react";
import { useAllEventsInfinite } from "@/hooks/queries/use-events";
import { IEvent } from "@/interfaces/IEvent";
import { format } from "date-fns";
import { EditEventDialog } from "./edit-event-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { getEventTypeColor, getEventTypeIcon, getPriorityText } from "@/utils/eventUtils";
import { getPriorityColor } from "@/utils/getPriorityColor";

interface CompanyCalendarUpcomingEventsProps {
  companyId: string;
}



export default function CompanyCalendarUpcomingEvents({ companyId }: CompanyCalendarUpcomingEventsProps) {
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useAllEventsInfinite(companyId, {
    take: 5
  });

  // Filtrar apenas eventos futuros e adicionar à lista
  useEffect(() => {
    if (data?.pages) {
      // Agrupa todos os eventos de todas as páginas
      const allPagesEvents = data.pages.flatMap(page => page.events);

      // Filtrar apenas eventos futuros (comparando com a data atual)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const futureEvents = allPagesEvents.filter(event =>
        new Date(event.start_date) >= today
      ).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

      setAllEvents(futureEvents);
    }
  }, [data]);


  // Função para carregar mais eventos
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Detectar quando o usuário está próximo do final da lista para carregar mais eventos
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 // Carregar quando faltar 1000px para o final
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  const handleEditClick = (event: IEvent) => {
    setSelectedEvent(event);
    setIsEditDialogOpen(true);
  };

  if (isLoading && allEvents.length === 0) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Carregando...</CardTitle>
          <CardDescription>Carregando próximos compromissos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded bg-muted"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-muted rounded w-32"></div>
                    <div className="h-3 bg-muted rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Erro</CardTitle>
          <CardDescription>Não foi possível carregar os próximos compromissos</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Tente novamente mais tarde</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Próximos Compromissos</CardTitle>
          <CardDescription>Agenda dos próximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum evento futuro encontrado</p>
            ) : (
              allEvents.map((event: IEvent) => (
                <div
                  key={event.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 transition-colors space-y-2 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`size-8 rounded flex items-center justify-center ${getEventTypeColor(event.type)}`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(event.start_date), "dd/MM/yyyy")} às {format(new Date(event.start_date), "HH:mm")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(event.priority)} className="text-xs">
                        {getPriorityText(event.priority)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleEditClick(event)}
                        aria-label="Editar evento"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {event.location}
                    </div>
                  )}

                  {event.process?.title && (
                    <div className="text-xs">
                      <Badge variant="outline">{event.process.title}</Badge>
                    </div>
                  )}
                </div>
              ))
            )}
            {isFetchingNextPage && (
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            )}
            {!isFetchingNextPage && !hasNextPage && allEvents.length > 0 && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Não há mais eventos para carregar
              </div>
            )}
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