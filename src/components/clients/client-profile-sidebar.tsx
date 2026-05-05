"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare, Calendar } from "lucide-react";
import { IClient } from "@/services/clients.service";
import { useClientProfileKPIs } from "@/hooks/queries/clients/use-client-kpis";
import { useClientAttorneys } from "@/hooks/queries/clients/use-clients";
import { ProfileCardSkeleton, TaskCardSkeleton } from "../ui/skeleton-cards";
import { Badge } from "../ui/badge";
import { useAllClientEvents } from "@/hooks/queries/use-events";
import { IEvent } from "@/interfaces/IEvent";
import { getEventTypeColor, getEventTypeIcon, getPriorityColor, getPriorityText } from "@/utils/eventUtils";
import { format } from "date-fns";

interface ClientProfileSidebarProps {
  companyId: string;
  clientId: string;
  client?: IClient;
}

export function ClientProfileSidebar({ companyId, clientId, client }: ClientProfileSidebarProps) {

  const { data, isLoading } = useClientAttorneys(companyId, clientId, { take: 100, page: 1 });
  const { data: eventsData, isLoading: eventsLoading } = useAllClientEvents(companyId, clientId, { take: 10, page: 1, order: "DESC", orderBy: "created_at" });

  if (!client) return null;


  return (
    <div className="space-y-4">
      {/* Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{client.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{client.phone || "N/A"}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>{client.address || "N/A"}, {client.city || ""}</span>
            </div>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Mensagem
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Ligar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Responsible Lawyer - Placeholder for now as we don't have it in Client entity directly yet, usually it's the one who created it or assigned in processes */}
      {
        isLoading
          ? <ProfileCardSkeleton />
          : (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Advogados Responsáveis <Badge> {data?.total || 0}</Badge></CardTitle>
              </CardHeader>
              <CardContent>
                {
                  !data?.total
                    ? <p className="text-sm text-muted-foreground">Nenhum advogado responsável encontrado.</p>
                    : data?.company_acls?.map(acl => (
                      <div className="flex items-center space-x-3" key={acl.id}>
                        <Avatar>
                          <AvatarFallback>
                            {acl?.user?.firstName.charAt(0)}{acl?.user?.lastName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{acl?.user?.firstName} {acl?.user?.lastName}</p>
                          <p className="text-xs text-muted-foreground">
                            {
                              acl.company_roles?.map(role => <Badge variant={"secondary"} key={role.id}>{role.name}</Badge>)
                            }
                          </p>
                        </div>
                      </div>
                    ))
                }
              </CardContent>
            </Card>
          )
      }


      {/* Upcoming Meetings */}
      {
        eventsLoading
          ? <TaskCardSkeleton />
          : (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Próximas Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {
                    !eventsData?.total
                      ? (
                        <p className="text-sm text-muted-foreground">Nenhuma reunião agendada.</p>
                      )
                      : (
                        eventsData?.events?.map((event: IEvent) => (
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
                      )
                  }
                </div>
              </CardContent>
            </Card>
          )
      }

    </div>
  );
}
