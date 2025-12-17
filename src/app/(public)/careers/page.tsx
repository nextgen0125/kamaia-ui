"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, Heart, Users, Zap, Coffee, Laptop } from "lucide-react"

export default function CareersPage() {
  const positions = [
    {
      title: "Desenvolvedor Full Stack Sênior",
      department: "Engenharia",
      location: "Luanda, Cazenga (Híbrido)",
      type: "Tempo Integral",
      description: "Buscamos um desenvolvedor experiente em React, Node.js e cloud para liderar projetos desafiadores."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remoto",
      type: "Tempo Integral",
      description: "Procuramos um designer apaixonado por UX/UI para criar experiências incríveis para nossos usuários."
    },
    {
      title: "Customer Success Manager",
      department: "Atendimento",
      location: "Luanda, Cazenga",
      type: "Tempo Integral",
      description: "Ajude nossos clientes a terem sucesso e construa relacionamentos duradouros."
    },
    {
      title: "Desenvolvedor Frontend React",
      department: "Engenharia",
      location: "Remoto",
      type: "Tempo Integral",
      description: "Desenvolva interfaces modernas e performáticas com React, TypeScript e Next.js."
    }
  ]

  const benefits = [
    { icon: <Heart className="size-6" />, title: "Saúde e Bem-estar", description: "Plano de saúde e dental completo" },
    { icon: <Users className="size-6" />, title: "Ambiente Colaborativo", description: "Time engajado e cultura inclusiva" },
    { icon: <Zap className="size-6" />, title: "Crescimento Rápido", description: "Oportunidades de desenvolvimento" },
    { icon: <Coffee className="size-6" />, title: "Flexibilidade", description: "Horários flexíveis e home office" },
    { icon: <Laptop className="size-6" />, title: "Equipamentos", description: "Notebook e setup completo" },
    { icon: <Briefcase className="size-6" />, title: "Vale Alimentação", description: "Benefício flexível para refeições" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Briefcase className="size-3.5 mr-1.5" />
              Carreiras
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Construa o futuro do direito conosco
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a um time apaixonado por inovação e tecnologia jurídica. 
              Estamos sempre em busca de talentos excepcionais.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que trabalhar na Kamaia?
            </h2>
            <p className="text-xl text-muted-foreground">
              Benefícios e vantagens para nosso time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vagas Abertas
            </h2>
            <p className="text-xl text-muted-foreground">
              Encontre a oportunidade perfeita para você
            </p>
          </div>

          <div className="space-y-4">
            {positions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                      <CardDescription className="mb-3">{position.description}</CardDescription>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Briefcase className="size-4" />
                          {position.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          {position.type}
                        </div>
                      </div>
                    </div>
                    <Button>Candidatar</Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Não encontrou a vaga ideal?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Envie seu currículo para nosso banco de talentos. Entraremos em contato quando surgir uma oportunidade.
          </p>
          <Button size="lg" asChild>
            <a href="mailto:rh@kamaia.com">Enviar Currículo</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
