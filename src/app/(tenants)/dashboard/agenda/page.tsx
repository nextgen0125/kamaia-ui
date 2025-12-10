"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Video,
  MapPin,
  Users,
  Filter,
  AlertCircle,
} from "lucide-react"
import { AddEventDialog } from "@/components/agenda/add-event-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data
const events = [
  {
    id: 1,
    title: "Audiência de Conciliação",
    type: "hearing",
    date: "2024-03-20",
    time: "10:00",
    duration: 60,
    location: "Fórum Central - Sala 201",
    case: "Divórcio Consensual",
    caseNumber: "0002345-67.2024.8.26.0000",
    attendees: ["Dra. Maria Santos", "Ana Paula Oliveira"],
    priority: "high",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Reunião com Cliente",
    type: "meeting",
    date: "2024-03-20",
    time: "14:00",
    duration: 30,
    location: "Escritório",
    case: null,
    caseNumber: null,
    attendees: ["Dr. João Silva", "Carlos Mendes"],
    priority: "medium",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Prazo: Apresentar Contestação",
    type: "deadline",
    date: "2024-03-20",
    time: "23:59",
    duration: 0,
    location: null,
    case: "Ação Trabalhista - Horas Extras",
    caseNumber: "0001234-56.2024.8.26.0100",
    attendees: ["Dr. João Silva"],
    priority: "high",
    status: "pending",
  },
  {
    id: 4,
    title: "Videoconferência - Consultoria",
    type: "video",
    date: "2024-03-21",
    time: "15:00",
    duration: 45,
    location: "Google Meet",
    case: null,
    caseNumber: null,
    attendees: ["Dr. Pedro Costa", "Tech Solutions S/A"],
    priority: "medium",
    status: "scheduled",
  },
  {
    id: 5,
    title: "Audiência de Instrução",
    type: "hearing",
    date: "2024-03-22",
    time: "09:30",
    duration: 120,
    location: "TRT 2ª Região - Sala 105",
    case: "Ação Trabalhista - Horas Extras",
    caseNumber: "0001234-56.2024.8.26.0100",
    attendees: ["Dra. Maria Santos", "Carlos Mendes"],
    priority: "high",
    status: "scheduled",
  },
]

const upcomingEvents = events
  .filter(e => new Date(e.date) >= new Date())
  .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
  .slice(0, 5)

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const stats = {
    today: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
    thisWeek: 12,
    thisMonth: 25,
    deadlines: events.filter(e => e.type === "deadline").length,
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
  }

  const formatTime = (time: string) => {
    return time.substring(0, 5)
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "hearing":
        return <Calendar className="size-4" />
      case "meeting":
        return <Users className="size-4" />
      case "deadline":
        return <AlertCircle className="size-4" />
      case "video":
        return <Video className="size-4" />
      default:
        return <Clock className="size-4" />
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "hearing":
        return "Audiência"
      case "meeting":
        return "Reunião"
      case "deadline":
        return "Prazo"
      case "video":
        return "Videoconferência"
      default:
        return type
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "hearing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
      case "meeting":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
      case "deadline":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
      case "video":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

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
          <AddEventDialog />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
            <p className="text-xs text-muted-foreground">Compromissos agendados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisMonth}</div>
            <p className="text-xs text-muted-foreground">Total no mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prazos</CardTitle>
            <AlertCircle className="size-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.deadlines}</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar and Events */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Calendar */}
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
                  {currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
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
              {/* Week days header */}
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : []
                const isToday = day === new Date().getDate() && 
                               currentDate.getMonth() === new Date().getMonth() &&
                               currentDate.getFullYear() === new Date().getFullYear()

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border rounded-lg ${
                      !day ? "bg-muted/30" : "hover:bg-muted/50 cursor-pointer"
                    } ${isToday ? "ring-2 ring-violet-500" : ""}`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${isToday ? "text-violet-600" : ""}`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                            >
                              {formatTime(event.time)} {event.title}
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
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Próximos Compromissos</CardTitle>
            <CardDescription>Agenda dos próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`size-8 rounded flex items-center justify-center ${getEventTypeColor(event.type)}`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(event.date)} às {formatTime(event.time)}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(event.priority)} className="text-xs">
                      {event.priority === "high" ? "Alta" : event.priority === "medium" ? "Média" : "Baixa"}
                    </Badge>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {event.location}
                    </div>
                  )}

                  {event.case && (
                    <div className="text-xs">
                      <Badge variant="outline">{event.case}</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
