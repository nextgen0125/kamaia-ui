"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Sparkles, Rocket } from "lucide-react"

export default function RoadmapPage() {
  const roadmapItems = [
    {
      quarter: "Q1 2025",
      status: "completed",
      items: [
        { title: "Dashboard Avançado de BI", completed: true },
        { title: "Integração com Tribunais", completed: true },
        { title: "App Mobile iOS/Android", completed: true },
        { title: "Sistema de Notificações Push", completed: true }
      ]
    },
    {
      quarter: "Q2 2025",
      status: "in-progress",
      items: [
        { title: "IA para Análise de Documentos", completed: true },
        { title: "Assinatura Digital Integrada", completed: true },
        { title: "Marketplace de Integrações", completed: false },
        { title: "Sistema de Videoconferência", completed: false }
      ]
    },
    {
      quarter: "Q3 2025",
      status: "planned",
      items: [
        { title: "IA para Predição de Resultados", completed: false },
        { title: "Blockchain para Certificação", completed: false },
        { title: "API Pública v2.0", completed: false },
        { title: "White-label Completo", completed: false }
      ]
    },
    {
      quarter: "Q4 2025",
      status: "planned",
      items: [
        { title: "Assistente Virtual com IA", completed: false },
        { title: "Gestão de Recursos Humanos", completed: false },
        { title: "Integração com ERP Contábil", completed: false },
        { title: "Módulo de Compliance Avançado", completed: false }
      ]
    }
  ]

  const statusConfig = {
    completed: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", label: "Concluído" },
    "in-progress": { icon: Rocket, color: "text-blue-500", bg: "bg-blue-500/10", label: "Em Desenvolvimento" },
    planned: { icon: Clock, color: "text-violet-500", bg: "bg-violet-500/10", label: "Planejado" }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="size-3.5 mr-1.5" />
              Roadmap
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              O futuro do Kamaia
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe as novidades e recursos que estamos desenvolvendo para revolucionar 
              ainda mais a gestão jurídica.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-8">
            {roadmapItems.map((quarter, index) => {
              const status = statusConfig[quarter.status as keyof typeof statusConfig]
              const StatusIcon = status.icon

              return (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{quarter.quarter}</CardTitle>
                        <Badge className={`${status.bg} ${status.color} border-0`}>
                          <StatusIcon className="size-3.5 mr-1.5" />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {quarter.items.filter(i => i.completed).length} de {quarter.items.length}
                        </div>
                        <div className="text-2xl font-bold">
                          {Math.round((quarter.items.filter(i => i.completed).length / quarter.items.length) * 100)}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {quarter.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          {item.completed ? (
                            <CheckCircle2 className="size-5 text-green-500 shrink-0" />
                          ) : (
                            <Clock className="size-5 text-muted-foreground shrink-0" />
                          )}
                          <span className={item.completed ? "line-through text-muted-foreground" : ""}>
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 bg-gradient-to-br from-violet-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tem uma sugestão?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Queremos ouvir você! Sua opinião nos ajuda a construir um produto melhor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:feedback@kamaia.com" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-violet-600 font-medium hover:bg-white/90 transition-colors"
            >
              Enviar Sugestão
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
