"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Newspaper, Download, Mail } from "lucide-react"

export default function PressPage() {
  const pressReleases = [
    {
      title: "Kamaia Levanta R$ 10 Milhões em Série A",
      date: "15 Jan 2025",
      description: "Investimento será usado para expandir operações e desenvolver novas funcionalidades de IA."
    },
    {
      title: "Kamaia Atinge Marca de 500 Escritórios Clientes",
      date: "20 Dez 2024",
      description: "Plataforma se consolida como líder em gestão jurídica no Brasil."
    },
    {
      title: "Kamaia Lança Módulo de IA para Análise de Documentos",
      date: "10 Nov 2024",
      description: "Nova funcionalidade reduz em 70% o tempo de revisão de contratos."
    }
  ]

  const media = [
    {
      outlet: "TechCrunch Brasil",
      title: "Como a Kamaia está revolucionando o setor jurídico",
      date: "Jan 2025"
    },
    {
      outlet: "Valor Econômico",
      title: "Startups brasileiras lideram inovação no direito",
      date: "Dez 2024"
    },
    {
      outlet: "Exame",
      title: "As 10 legaltechs mais promissoras do Brasil",
      date: "Nov 2024"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Newspaper className="size-3.5 mr-1.5" />
              Imprensa
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sala de Imprensa
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Notícias, comunicados e recursos para a imprensa sobre a Kamaia
            </p>
            <Button size="lg" asChild>
              <a href="mailto:imprensa@kamaia.com">
                <Mail className="mr-2 size-4" />
                Contato para Imprensa
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Comunicados à Imprensa</h2>
            <p className="text-muted-foreground">Últimas notícias e anúncios oficiais</p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{release.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">{release.date}</p>
                      <p className="text-muted-foreground">{release.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="size-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Na Mídia</h2>
            <p className="text-muted-foreground">Cobertura da imprensa sobre a Kamaia</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">{item.outlet}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto">Ler artigo →</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Kit de Imprensa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Baixe nosso kit de imprensa com logos, fotos da equipe, informações da empresa e muito mais.
              </p>
              <div className="flex gap-4">
                <Button>
                  <Download className="mr-2 size-4" />
                  Baixar Kit Completo
                </Button>
                <Button variant="outline">Ver Online</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
