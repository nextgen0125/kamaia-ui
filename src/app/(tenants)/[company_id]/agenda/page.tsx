"use client"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { AddEventDialog } from "@/components/agenda/add-event-dialog"
import CompanyAgendaKpiCards from "@/components/companies/agenda/company-agenda-kpis-cards"
import CompanyCalendarCard from "@/components/companies/agenda/company-calendar-card"
import CompanyCalendarUpcomingEvents from "@/components/companies/agenda/company-calendar-upcoming-events"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

export default function AgendaPage() {
  const params = useParams<{ company_id: string }>();
  const companyId = params.company_id;
  const queryClient = useQueryClient();

  const handleEventChange = () => {
    // Invalidate and refetch event-related queries when an event is created, updated, or deleted
    queryClient.invalidateQueries({ queryKey: ['events', companyId] });
    queryClient.invalidateQueries({ queryKey: ['kpis', companyId, 'agenda'] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie compromissos, audiências e prazos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 size-4" />
            Filtrar
          </Button>
          <AddEventDialog onSuccess={handleEventChange} companyId={companyId} />
        </div>
      </div>

      {/* KPI Cards */}
      <CompanyAgendaKpiCards companyId={companyId} />

      {/* Calendar and Upcoming Events */}
      <div className="grid gap-4 lg:grid-cols-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Calendar */}
        <CompanyCalendarCard companyId={companyId} />

        {/* Upcoming Events */}
        <CompanyCalendarUpcomingEvents companyId={companyId} />
      </div>
    </div>
  )
}
