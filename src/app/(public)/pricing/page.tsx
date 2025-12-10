"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Sparkles, Shield, Zap, Users, HardDrive, HeadphonesIcon, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'semester' | 'annual'>('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Perfeito para escritórios iniciantes',
      price: { monthly: 99, semester: 89, annual: 79 },
      users: 5,
      storage: '10GB',
      processes: '50',
      features: [
        'Até 5 usuários',
        'Gestão de processos básica',
        '10GB de armazenamento',
        'Suporte por email',
        'Relatórios básicos',
        'Agenda simples',
        'Gestão de documentos',
        'Dashboard básico'
      ],
      popular: false,
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Professional',
      description: 'Para escritórios em crescimento',
      price: { monthly: 199, semester: 179, annual: 159 },
      users: 15,
      storage: '100GB',
      processes: 'Ilimitado',
      features: [
        'Até 15 usuários',
        'Gestão completa de processos',
        '100GB de armazenamento',
        'Suporte prioritário 24/7',
        'Relatórios avançados',
        'Integrações via API',
        'Agenda inteligente',
        'Dashboard personalizado',
        'Automação de tarefas',
        'Notificações em tempo real',
        'Controle financeiro completo',
        'Backup automático diário'
      ],
      popular: true,
      color: 'from-violet-600 to-blue-600'
    },
    {
      name: 'Enterprise',
      description: 'Para grandes escritórios',
      price: { monthly: 399, semester: 359, annual: 319 },
      users: 'Ilimitado',
      storage: 'Ilimitado',
      processes: 'Ilimitado',
      features: [
        'Usuários ilimitados',
        'Todos os recursos Professional',
        'Armazenamento ilimitado',
        'Gerente de conta dedicado',
        'Treinamento personalizado',
        'SLA garantido 99.9%',
        'White-label disponível',
        'Auditoria e compliance',
        'Migração de dados assistida',
        'Integrações customizadas',
        'Suporte telefônico premium',
        'Consultoria estratégica'
      ],
      popular: false,
      color: 'from-amber-500 to-orange-600'
    }
  ]

  const features = [
    {
      icon: <Users className="size-5" />,
      title: 'Multi-usuário',
      description: 'Gestão de equipes com controle de permissões'
    },
    {
      icon: <Shield className="size-5" />,
      title: 'Segurança',
      description: 'Criptografia e conformidade com LGPD'
    },
    {
      icon: <Zap className="size-5" />,
      title: 'Performance',
      description: 'Sistema rápido e responsivo'
    },
    {
      icon: <HardDrive className="size-5" />,
      title: 'Armazenamento',
      description: 'Cloud seguro e escalável'
    },
    {
      icon: <HeadphonesIcon className="size-5" />,
      title: 'Suporte',
      description: 'Equipe especializada sempre disponível'
    },
    {
      icon: <BarChart3 className="size-5" />,
      title: 'Analytics',
      description: 'Relatórios e insights avançados'
    }
  ]

  const faqs = [
    {
      question: 'Posso mudar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor no próximo ciclo de faturamento.'
    },
    {
      question: 'Existe período de teste gratuito?',
      answer: 'Sim, oferecemos 14 dias de teste gratuito em todos os planos, sem necessidade de cartão de crédito.'
    },
    {
      question: 'Como funciona o cancelamento?',
      answer: 'Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais. Seus dados ficam disponíveis por 30 dias após o cancelamento.'
    },
    {
      question: 'Vocês oferecem desconto para ONGs?',
      answer: 'Sim! Oferecemos descontos especiais para organizações sem fins lucrativos. Entre em contato com nossa equipe comercial.'
    },
    {
      question: 'Os preços incluem suporte técnico?',
      answer: 'Sim, todos os planos incluem suporte técnico. O nível de suporte varia conforme o plano escolhido.'
    },
    {
      question: 'Há taxa de setup ou instalação?',
      answer: 'Não, não cobramos nenhuma taxa de setup. Você paga apenas a mensalidade do plano escolhido.'
    }
  ]

  const calculateSavings = (plan: typeof plans[0]) => {
    const monthly = plan.price.monthly
    const annual = plan.price.annual
    const yearlySavings = (monthly * 12) - (annual * 12)
    return yearlySavings
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              <Sparkles className="size-3.5 mr-1.5" />
              Planos e Preços
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Escolha o plano ideal para seu escritório
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Transparência total. Sem taxas ocultas. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as any)}>
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
                <TabsTrigger value="semester">
                  Semestral
                  <Badge variant="secondary" className="ml-2 text-xs">-10%</Badge>
                </TabsTrigger>
                <TabsTrigger value="annual">
                  Anual
                  <Badge variant="secondary" className="ml-2 text-xs">-20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Plans Grid */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative ${plan.popular ? 'border-violet-500 shadow-2xl shadow-violet-500/20 lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className={`bg-gradient-to-r ${plan.color} text-white shadow-lg`}>
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <div className={`size-12 rounded-2xl bg-gradient-to-br ${plan.color} mx-auto mb-4 flex items-center justify-center text-white`}>
                    <span className="text-2xl font-bold">{plan.name[0]}</span>
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold">
                        R$ {plan.price[billingCycle]}
                      </span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {billingCycle === 'semester' && 'Faturado R$ ' + (plan.price.semester * 6) + ' semestralmente'}
                      {billingCycle === 'annual' && 'Faturado R$ ' + (plan.price.annual * 12) + ' anualmente'}
                      {billingCycle === 'monthly' && 'Faturado mensalmente'}
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
                        Economize R$ {calculateSavings(plan)} por ano
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="size-4 text-muted-foreground" />
                      <span>{plan.users} usuários</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HardDrive className="size-4 text-muted-foreground" />
                      <span>{plan.storage}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className="w-full h-12 text-base font-semibold" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/register">
                      Começar agora
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>

                  <div className="space-y-3 pt-4">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Recursos incluídos:
                    </p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="size-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enterprise CTA */}
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border-violet-200 dark:border-violet-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Precisa de uma solução personalizada?</CardTitle>
              <CardDescription className="text-base">
                Para escritórios com necessidades específicas, oferecemos planos customizados com recursos exclusivos
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Falar com especialista</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">Ver documentação</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos disponíveis em todos os planos
            </h2>
            <p className="text-lg text-muted-foreground">
              Funcionalidades essenciais para sua gestão jurídica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Tudo o que você precisa saber sobre nossos planos
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    <CardDescription className="text-base pt-2">
                      {faq.answer}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Ainda tem dúvidas?
              </p>
              <Button asChild>
                <Link href="/contact">Entre em contato</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
