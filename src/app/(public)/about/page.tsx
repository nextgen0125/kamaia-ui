"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Users, Zap, Heart, Globe, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="size-6" />,
      title: "Inovação Constante",
      description: "Buscamos sempre as melhores tecnologias para facilitar o trabalho jurídico."
    },
    {
      icon: <Users className="size-6" />,
      title: "Foco no Cliente",
      description: "Nossos clientes estão no centro de cada decisão que tomamos."
    },
    {
      icon: <Zap className="size-6" />,
      title: "Simplicidade",
      description: "Transformamos complexidade em soluções simples e intuitivas."
    },
    {
      icon: <Heart className="size-6" />,
      title: "Transparência",
      description: "Construímos confiança através da honestidade e comunicação clara."
    }
  ]

  const stats = [
    { value: "2020", label: "Fundação" },
    { value: "500+", label: "Escritórios" },
    { value: "15k+", label: "Processos" },
    { value: "50+", label: "Colaboradores" }
  ]

  const team = [
    { name: "João Silva", role: "CEO & Co-fundador", avatar: "👨‍💼" },
    { name: "Maria Santos", role: "CTO & Co-fundadora", avatar: "👩‍💻" },
    { name: "Pedro Costa", role: "CPO", avatar: "👨‍🎨" },
    { name: "Ana Oliveira", role: "Head of Customer Success", avatar: "👩‍💼" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Globe className="size-3.5 mr-1.5" />
              Sobre Nós
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transformando a gestão jurídica no Mundo
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Fundada em 20xx, a Kamaia nasceu da necessidade de modernizar e simplificar 
              a gestão de escritórios de advocacia através da tecnologia.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <Target className="size-10 mb-4 text-violet-600" />
                <CardTitle className="text-2xl">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Democratizar o acesso à tecnologia jurídica de alta qualidade, tornando a gestão 
                  de processos mais eficiente, transparente e acessível para escritórios de todos os tamanhos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Award className="size-10 mb-4 text-blue-600" />
                <CardTitle className="text-2xl">Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ser a plataforma líder em gestão jurídica no Mundo, reconhecida pela 
                  inovação, qualidade e impacto positivo na vida dos profissionais do direito.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-muted-foreground">
              Os princípios que guiam tudo o que fazemos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="size-12 mx-auto rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-muted-foreground">
              Conheça as pessoas que tornam tudo isso possível
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-violet-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Faça parte da transformação
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Junte-se a centenas de escritórios que já modernizaram sua gestão jurídica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Começar agora</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white" asChild>
              <Link href="/contact">Falar com vendas</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
