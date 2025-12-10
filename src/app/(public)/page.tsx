"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Check,
  ArrowRight,
  Scale,
  FileText,
  Users,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  Star,
  Quote
} from 'lucide-react'

// Partículas animadas no Canvas
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    // Criar partículas
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Atualizar posição
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Desenhar partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`
        ctx.fill()

        // Conectar partículas próximas
        particles.slice(i + 1).forEach(p2 => {
          const dx = particle.x - p2.x
          const dy = particle.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-90"
    />
  )
}

// Componente de estatísticas animadas
const AnimatedStat = ({ value, label, suffix = '' }: { value: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  )
}

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'semester' | 'annual'>('monthly')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const plans = [
    {
      name: 'Starter',
      description: 'Perfeito para escritórios iniciantes',
      price: { monthly: 99, semester: 89, annual: 79 },
      users: 5,
      features: [
        'Até 5 usuários',
        'Gestão de processos básica',
        '10GB de armazenamento',
        'Suporte por email',
        'Relatórios básicos'
      ],
      popular: false
    },
    {
      name: 'Professional',
      description: 'Para escritórios em crescimento',
      price: { monthly: 199, semester: 179, annual: 159 },
      users: 15,
      features: [
        'Até 15 usuários',
        'Gestão completa de processos',
        '100GB de armazenamento',
        'Suporte prioritário 24/7',
        'Relatórios avançados',
        'Integrações via API',
        'Agenda inteligente',
        'Dashboard personalizado'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Para grandes escritórios',
      price: { monthly: 399, semester: 359, annual: 319 },
      users: 'Ilimitado',
      features: [
        'Usuários ilimitados',
        'Todos os recursos Professional',
        'Armazenamento ilimitado',
        'Gerente de conta dedicado',
        'Treinamento personalizado',
        'SLA garantido',
        'White-label disponível',
        'Auditoria e compliance'
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: 'Dr. Ricardo Santos',
      role: 'Sócio-fundador, Santos & Associados',
      content: 'O Kamaia revolucionou nossa gestão processual. Aumentamos a produtividade em 40% no primeiro trimestre.',
      avatar: '👨‍⚖️',
      rating: 5
    },
    {
      name: 'Dra. Marina Costa',
      role: 'Advogada, Costa Lima Advogados',
      content: 'Interface intuitiva e suporte excepcional. Finalmente um sistema que entende as necessidades jurídicas.',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      name: 'Dr. Paulo Ferreira',
      role: 'Diretor Jurídico, TechCorp',
      content: 'Migramos 500 processos sem problemas. A equipe do Kamaia nos deu todo o suporte necessário.',
      avatar: '👨‍💻',
      rating: 5
    }
  ]

  const features = [
    {
      icon: <Scale className="size-6" />,
      title: 'Gestão Processual Completa',
      description: 'Controle total sobre todos os seus processos jurídicos em uma única plataforma.'
    },
    {
      icon: <FileText className="size-6" />,
      title: 'Documentos Inteligentes',
      description: 'Versionamento, controle de acesso e busca avançada para todos os documentos.'
    },
    {
      icon: <Users className="size-6" />,
      title: 'Colaboração em Tempo Real',
      description: 'Equipe sempre conectada com notificações instantâneas e chat integrado.'
    },
    {
      icon: <TrendingUp className="size-6" />,
      title: 'Analytics Avançado',
      description: 'Dashboards e relatórios personalizados para decisões baseadas em dados.'
    },
    {
      icon: <ShieldCheck className="size-6" />,
      title: 'Segurança Máxima',
      description: 'Criptografia de ponta a ponta e conformidade com LGPD e ISO 27001.'
    },
    {
      icon: <Zap className="size-6" />,
      title: 'Automação Inteligente',
      description: 'Automatize tarefas repetitivas e foque no que realmente importa.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <ParticleCanvas />
        
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge variant="outline" className="mb-6 text-sm px-4 py-1.5">
              <Sparkles className="size-3.5 mr-1.5" />
              Plataforma líder em gestão jurídica
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight">
              O futuro da gestão jurídica está aqui
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Transforme seu escritório com a plataforma mais completa e intuitiva do mercado. 
              Gestão de processos, clientes e finanças em um só lugar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-base px-8 group">
                Começar agora gratuitamente
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                Agendar demonstração
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                <span>14 dias grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20 fill-background">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedStat value={500} label="Escritórios ativos" suffix="+" />
            <AnimatedStat value={15000} label="Processos gerenciados" suffix="+" />
            <AnimatedStat value={98} label="Satisfação dos clientes" suffix="%" />
            <AnimatedStat value={40} label="Aumento de produtividade" suffix="%" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Recursos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos poderosos para otimizar cada aspecto da sua prática jurídica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-violet-500/50"
              >
                <CardHeader>
                  <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Preços
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Planos para cada escritório
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Escolha o plano ideal para o seu negócio
            </p>

            <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as any)} className="inline-flex">
              <TabsList>
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
                <TabsTrigger value="semester">
                  Semestral
                  <Badge variant="secondary" className="ml-2">-10%</Badge>
                </TabsTrigger>
                <TabsTrigger value="annual">
                  Anual
                  <Badge variant="secondary" className="ml-2">-20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative ${plan.popular ? 'border-violet-500 shadow-xl shadow-violet-500/20 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-blue-600">
                      Mais popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        ${plan.price[billingCycle]}
                      </span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {billingCycle === 'semester' && 'Faturado semestralmente'}
                      {billingCycle === 'annual' && 'Faturado anualmente'}
                      {billingCycle === 'monthly' && 'Faturado mensalmente'}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Começar agora
                  </Button>

                  <div className="space-y-3">
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
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Depoimentos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Escritórios de todo o Brasil confiam no Kamaia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <Quote className="absolute top-4 right-4 size-8 text-violet-500/20 group-hover:scale-125 transition-transform" />
                
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {testimonial.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-violet-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para transformar seu escritório?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Junte-se a centenas de escritórios que já modernizaram sua gestão jurídica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-8">
                Começar teste gratuito
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 bg-white/10 border-white/20 hover:bg-white/20 text-white">
                Falar com vendas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600" />
              <span className="font-bold text-xl">Kamaia</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2025 Kamaia SaaS. Todos os direitos reservados.
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-violet-600 transition-colors">Termos</a>
              <a href="#" className="hover:text-violet-600 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-violet-600 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  )
}