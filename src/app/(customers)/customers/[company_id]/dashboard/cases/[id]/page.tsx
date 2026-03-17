"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  AlertCircle,
  DollarSign,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

const getCaseDetails = (id: string) => ({
  id,
  number: "0001234-56.2024.8.26.0100",
  title: "Ação Trabalhista - Horas Extras",
  description: "Reclamação trabalhista referente ao não pagamento de horas extras realizadas no período de 2022 a 2024.",
  status: "in_progress",
  priority: "high",
  progress: 65,
  court: "TRT 2ª Região - São Paulo",
  area: "Direito Trabalhista",
  value: 45000,
  startDate: "2024-01-15",
  lastUpdate: "2024-03-15",
  lawyer: {
    name: "Dr. João Silva",
    oab: "OAB/SP 123456",
    email: "joao.silva@escritorio.com",
    phone: "+244912345678",
  },
  timeline: [
    {
      id: 1,
      date: "2024-03-15",
      time: "14:30",
      title: "Audiência de Instrução realizada",
      description: "Foram ouvidas testemunhas de ambas as partes. Próxima etapa: apresentação de memoriais.",
      type: "hearing",
    },
    {
      id: 2,
      date: "2024-03-10",
      time: "10:00",
      title: "Documento anexado",
      description: "Petição de juntada de documentos - Contracheques do período.",
      type: "document",
    },
    {
      id: 3,
      date: "2024-03-01",
      time: "16:00",
      title: "Contestação apresentada",
      description: "Reclamada apresentou contestação refutando os pedidos.",
      type: "document",
    },
  ],
  documents: [
    {
      id: 1,
      name: "Petição Inicial.pdf",
      type: "Petição",
      size: "2.5 MB",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Procuração.pdf",
      type: "Procuração",
      size: "450 KB",
      date: "2024-01-15",
    },
    {
      id: 3,
      name: "Contracheques 2022-2024.pdf",
      type: "Documento",
      size: "3.2 MB",
      date: "2024-03-10",
    },
  ],
  nextEvents: [
    {
      id: 1,
      title: "Prazo para Memoriais",
      date: "2024-03-25",
      time: "23:59",
      type: "deadline",
      location: "Processo eletrônico",
    },
    {
      id: 2,
      title: "Possível data de sentença",
      date: "2024-04-15",
      time: "14:00",
      type: "estimate",
      location: "TRT 2ª Região",
    },
  ],
})

export default function CustomerCaseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const caseData = getCaseDetails(params.id as string)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(value)

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "hearing":
        return <Calendar className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{caseData.title}</h1>
          <p className="text-muted-foreground">{caseData.number}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge>Em Andamento</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseData.progress}%</div>
            <Progress value={caseData.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor da Causa</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(caseData.value)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">{formatDate(caseData.lastUpdate)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Processo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Descrição</h4>
                <p className="text-sm">{caseData.description}</p>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Área do Direito</h4>
                  <p className="text-sm font-medium">{caseData.area}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Tribunal</h4>
                  <p className="text-sm font-medium">{caseData.court}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Início</h4>
                  <p className="text-sm font-medium">{formatDate(caseData.startDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Prioridade</h4>
                  <Badge variant="destructive">Alta</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Tabs defaultValue="timeline">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {caseData.timeline.map((event, index) => (
                        <div key={event.id} className="relative">
                          {index !== caseData.timeline.length - 1 && (
                            <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />
                          )}
                          <div className="flex items-start space-x-4">
                            <div className="rounded-full p-2 bg-primary text-primary-foreground">
                              {getTimelineIcon(event.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{event.title}</p>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(event.date)} às {event.time}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <ScrollArea className="h-[400px]">
                    {caseData.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg mb-2"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{doc.type}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{formatDate(doc.date)}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Advogado Responsável</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">{caseData.lawyer.name}</p>
                <p className="text-sm text-muted-foreground">{caseData.lawyer.oab}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{caseData.lawyer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.lawyer.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseData.nextEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(event.date)} às {event.time}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
