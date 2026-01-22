"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, PlayCircle, FileText, Video, Clock } from "lucide-react"
import Link from "next/link"

export default function TutorialsPage() {
  const tutorials = [
    {
      title: "Primeiros Passos com a Kamaia",
      type: "video",
      duration: "15 min",
      level: "Iniciante",
      description: "Aprenda a configurar sua conta e navegar pela plataforma pela primeira vez.",
      icon: "🚀"
    },
    {
      title: "Gerenciando Processos Jurídicos",
      type: "video",
      duration: "20 min",
      level: "Iniciante",
      description: "Como criar, editar e acompanhar processos no sistema.",
      icon: "⚖️"
    },
    {
      title: "Organizando Documentos",
      type: "article",
      duration: "10 min",
      level: "Iniciante",
      description: "Melhores práticas para organizar e gerenciar documentos jurídicos.",
      icon: "📁"
    },
    {
      title: "Configurando Permissões de Usuários",
      type: "video",
      duration: "12 min",
      level: "Intermediário",
      description: "Como configurar diferentes níveis de acesso para sua equipe.",
      icon: "👥"
    },
    {
      title: "Usando Filtros Avançados",
      type: "article",
      duration: "8 min",
      level: "Intermediário",
      description: "Domine os filtros avançados para encontrar informações rapidamente.",
      icon: "🔍"
    },
    {
      title: "Criando Relatórios Personalizados",
      type: "video",
      duration: "18 min",
      level: "Avançado",
      description: "Aprenda a criar relatórios personalizados e dashboards.",
      icon: "📊"
    },
    {
      title: "Integrações via API",
      type: "article",
      duration: "25 min",
      level: "Avançado",
      description: "Guia completo para integrar a Kamaia com outros sistemas.",
      icon: "🔌"
    },
    {
      title: "Automação de Fluxos de Trabalho",
      type: "video",
      duration: "22 min",
      level: "Avançado",
      description: "Automatize tarefas repetitivas e otimize processos.",
      icon: "⚡"
    }
  ]

  const categories = [
    { name: "Todos", count: 8 },
    { name: "Iniciante", count: 3 },
    { name: "Intermediário", count: 2 },
    { name: "Avançado", count: 3 }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <BookOpen className="size-3.5 mr-1.5" />
              Tutoriais
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Aprenda a usar a Kamaia
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Tutoriais em vídeo e artigos para ajudar você a dominar a plataforma
            </p>
            <Button size="lg" asChild>
              <Link href="/docs">
                <FileText className="mr-2 size-4" />
                Ver Documentação Completa
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button 
                key={index} 
                variant={index === 0 ? "default" : "outline"}
                size="sm"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">{category.count}</Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{tutorial.icon}</div>
                    <Badge variant={tutorial.level === "Iniciante" ? "default" : tutorial.level === "Intermediário" ? "secondary" : "outline"}>
                      {tutorial.level}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-violet-600 transition-colors">
                    {tutorial.title}
                  </CardTitle>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      {tutorial.type === "video" ? (
                        <Video className="size-4" />
                      ) : (
                        <FileText className="size-4" />
                      )}
                      {tutorial.type === "video" ? "Vídeo" : "Artigo"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {tutorial.duration}
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full group/btn">
                    {tutorial.type === "video" ? (
                      <>
                        <PlayCircle className="mr-2 size-4" />
                        Assistir
                      </>
                    ) : (
                      <>
                        <BookOpen className="mr-2 size-4" />
                        Ler
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-violet-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Precisa de ajuda personalizada?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Nossa equipe de suporte está pronta para ajudar você
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Entrar em Contato</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
