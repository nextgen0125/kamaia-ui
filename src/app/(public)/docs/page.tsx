"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Code,
  HelpCircle,
  Rocket,
  Shield,
  Zap,
  Users,
  Settings,
  CreditCard,
  Download,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      icon: <Rocket className="size-6" />,
      title: "Primeiros Passos",
      description: "Comece a usar a Kamaia rapidamente",
      color: "from-blue-500 to-cyan-500",
      articles: [
        { title: "Como criar sua conta", href: "#create-account", time: "3 min" },
        { title: "Configuração inicial do escritório", href: "#setup", time: "5 min" },
        { title: "Adicionar usuários e definir permissões", href: "#users", time: "4 min" },
        { title: "Importar dados existentes", href: "#import", time: "10 min" },
      ]
    },
    {
      icon: <FileText className="size-6" />,
      title: "Gestão de Processos",
      description: "Organize e acompanhe seus casos jurídicos",
      color: "from-violet-500 to-purple-500",
      articles: [
        { title: "Cadastrar novo processo", href: "#new-process", time: "3 min" },
        { title: "Vincular documentos ao processo", href: "#link-docs", time: "2 min" },
        { title: "Acompanhar andamentos processuais", href: "#track", time: "5 min" },
        { title: "Configurar notificações automáticas", href: "#notifications", time: "4 min" },
      ]
    },
    {
      icon: <Users className="size-6" />,
      title: "Gestão de Clientes",
      description: "Mantenha relacionamento organizado",
      color: "from-green-500 to-emerald-500",
      articles: [
        { title: "Cadastrar clientes", href: "#new-client", time: "2 min" },
        { title: "Portal do cliente", href: "#client-portal", time: "4 min" },
        { title: "Histórico de atendimentos", href: "#history", time: "3 min" },
        { title: "Comunicação com clientes", href: "#communication", time: "5 min" },
      ]
    },
    {
      icon: <CreditCard className="size-6" />,
      title: "Financeiro",
      description: "Controle receitas e despesas",
      color: "from-amber-500 to-orange-500",
      articles: [
        { title: "Lançamentos financeiros", href: "#transactions", time: "4 min" },
        { title: "Emitir faturas", href: "#invoices", time: "3 min" },
        { title: "Relatórios financeiros", href: "#reports", time: "6 min" },
        { title: "Integração com bancos", href: "#bank-integration", time: "8 min" },
      ]
    },
    {
      icon: <Settings className="size-6" />,
      title: "Configurações",
      description: "Personalize sua experiência",
      color: "from-gray-500 to-slate-500",
      articles: [
        { title: "Personalizar dashboard", href: "#dashboard", time: "3 min" },
        { title: "Configurar tema e aparência", href: "#theme", time: "2 min" },
        { title: "Integrações e API", href: "#integrations", time: "10 min" },
        { title: "Backup e exportação de dados", href: "#backup", time: "5 min" },
      ]
    },
    {
      icon: <Shield className="size-6" />,
      title: "Segurança e Privacidade",
      description: "Proteção de dados e conformidade",
      color: "from-red-500 to-rose-500",
      articles: [
        { title: "Segurança de dados (LGPD)", href: "#lgpd", time: "8 min" },
        { title: "Autenticação de dois fatores", href: "#2fa", time: "3 min" },
        { title: "Controle de acesso e permissões", href: "#permissions", time: "6 min" },
        { title: "Auditoria de ações", href: "#audit", time: "4 min" },
      ]
    },
  ]

  const faqs = [
    {
      category: "Conta e Assinatura",
      questions: [
        {
          question: "Como criar minha conta na Kamaia?",
          answer: "Para criar sua conta, clique em 'Começar Grátis' no topo da página, preencha seus dados e confirme o email. Você terá 14 dias de teste gratuito em todas as funcionalidades."
        },
        {
          question: "Posso trocar de plano durante o período de teste?",
          answer: "Sim! Durante o teste você pode experimentar qualquer plano. Após o período, você escolhe qual plano deseja contratar."
        },
        {
          question: "Como funciona o cancelamento?",
          answer: "Você pode cancelar sua assinatura a qualquer momento através das configurações da conta. Não há multas ou taxas de cancelamento."
        },
        {
          question: "Meus dados ficam salvos após o cancelamento?",
          answer: "Sim, mantemos seus dados por 30 dias após o cancelamento. Neste período você pode reativar sua conta sem perder nenhuma informação."
        }
      ]
    },
    {
      category: "Funcionalidades",
      questions: [
        {
          question: "Quantos processos posso cadastrar?",
          answer: "No plano Starter você pode cadastrar até 50 processos. Nos planos Professional e Enterprise o número de processos é ilimitado."
        },
        {
          question: "Posso importar dados de outro sistema?",
          answer: "Sim! Oferecemos ferramentas de importação para os principais sistemas do mercado. Nossa equipe pode auxiliar na migração de dados."
        },
        {
          question: "O sistema funciona offline?",
          answer: "O Kamaia é uma plataforma cloud-based que requer conexão à internet. Porém, alguns recursos como visualização de documentos baixados funcionam offline."
        },
        {
          question: "Como funciona o controle de permissões?",
          answer: "Você define perfis de acesso (Admin, Advogado, Assistente, etc.) e controla exatamente o que cada usuário pode visualizar e editar no sistema."
        }
      ]
    },
    {
      category: "Suporte e Segurança",
      questions: [
        {
          question: "Qual o horário do suporte?",
          answer: "O suporte por email está disponível 24/7. Para planos Professional e Enterprise, oferecemos suporte prioritário com resposta em até 2 horas."
        },
        {
          question: "Meus dados estão seguros?",
          answer: "Sim! Utilizamos criptografia de ponta a ponta, certificação SSL, servidores redundantes e backup automático diário. Somos totalmente compatíveis com a LGPD."
        },
        {
          question: "Onde os dados ficam armazenados?",
          answer: "Todos os dados são armazenados em data centers no Brasil, garantindo conformidade com a legislação brasileira de proteção de dados."
        },
        {
          question: "Vocês oferecem treinamento?",
          answer: "Sim! Todos os planos incluem acesso à nossa base de conhecimento e vídeos tutoriais. Planos Enterprise incluem treinamento personalizado para sua equipe."
        }
      ]
    }
  ]

  const videos = [
    {
      title: "Introdução à Kamaia",
      duration: "5:30",
      thumbnail: "🎬",
      category: "Iniciante",
      description: "Visão geral da plataforma e principais recursos"
    },
    {
      title: "Como cadastrar processos",
      duration: "8:15",
      thumbnail: "📁",
      category: "Processos",
      description: "Tutorial completo sobre gestão processual"
    },
    {
      title: "Configurando o financeiro",
      duration: "12:40",
      thumbnail: "💰",
      category: "Financeiro",
      description: "Configure o módulo financeiro do zero"
    },
    {
      title: "Portal do cliente",
      duration: "6:20",
      thumbnail: "👥",
      category: "Clientes",
      description: "Como seus clientes acessam informações"
    },
    {
      title: "Relatórios e Analytics",
      duration: "10:05",
      thumbnail: "📊",
      category: "Avançado",
      description: "Extraia insights dos seus dados"
    },
    {
      title: "API e Integrações",
      duration: "15:30",
      thumbnail: "⚙️",
      category: "Avançado",
      description: "Integre a Kamaia com outras ferramentas"
    }
  ]

  const downloads = [
    {
      title: "Guia Completo do Usuário",
      description: "Manual detalhado com todas as funcionalidades",
      type: "PDF",
      size: "2.5 MB",
      icon: <FileText className="size-5" />
    },
    {
      title: "Guia de Início Rápido",
      description: "Configure sua conta em 10 minutos",
      type: "PDF",
      size: "850 KB",
      icon: <Rocket className="size-5" />
    },
    {
      title: "Documentação da API",
      description: "Referência completa para desenvolvedores",
      type: "PDF",
      size: "1.8 MB",
      icon: <Code className="size-5" />
    },
    {
      title: "Checklist LGPD",
      description: "Conformidade com a lei de proteção de dados",
      type: "PDF",
      size: "650 KB",
      icon: <Shield className="size-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              <BookOpen className="size-3.5 mr-1.5" />
              Central de Ajuda
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Como podemos ajudar você?
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Encontre respostas, tutoriais e documentação completa
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar na documentação..."
                className="h-14 pl-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-violet-600 mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Artigos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Vídeos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Suporte</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">&lt;2h</div>
              <div className="text-sm text-muted-foreground">Resposta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="articles" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="articles">
                <FileText className="size-4 mr-2" />
                <span className="hidden sm:inline">Artigos</span>
              </TabsTrigger>
              <TabsTrigger value="videos">
                <Video className="size-4 mr-2" />
                <span className="hidden sm:inline">Vídeos</span>
              </TabsTrigger>
              <TabsTrigger value="faq">
                <HelpCircle className="size-4 mr-2" />
                <span className="hidden sm:inline">FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="downloads">
                <Download className="size-4 mr-2" />
                <span className="hidden sm:inline">Downloads</span>
              </TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className={`size-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                        {category.icon}
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.articles.map((article, i) => (
                          <li key={i}>
                            <Link
                              href={article.href}
                              className="flex items-center justify-between group/link hover:text-violet-600 transition-colors"
                            >
                              <span className="text-sm group-hover/link:underline">
                                {article.title}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {article.time}
                              </Badge>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
                        <Link href="#">
                          Ver todos
                          <ExternalLink className="ml-2 size-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Tutoriais em Vídeo</h2>
                <p className="text-muted-foreground">
                  Aprenda visualmente com nossos tutoriais passo a passo
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="aspect-video bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform">
                        {video.thumbnail}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{video.category}</Badge>
                        <span className="text-sm text-muted-foreground">{video.duration}</span>
                      </div>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
                <p className="text-muted-foreground">
                  Respostas rápidas para as dúvidas mais comuns
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                {faqs.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <div className="size-2 rounded-full bg-violet-600" />
                      {section.category}
                    </h3>
                    <Accordion type="single" collapsible className="space-y-2">
                      {section.questions.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`${sectionIndex}-${faqIndex}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Downloads Tab */}
            <TabsContent value="downloads" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Materiais para Download</h2>
                <p className="text-muted-foreground">
                  Guias e documentação para consulta offline
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {downloads.map((download, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white shrink-0">
                          {download.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-lg">{download.title}</CardTitle>
                            <Badge variant="secondary">{download.type}</Badge>
                          </div>
                          <CardDescription className="mb-4">
                            {download.description}
                          </CardDescription>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{download.size}</span>
                            <Button size="sm" className="group-hover:translate-x-1 transition-transform">
                              <Download className="size-4 mr-2" />
                              Baixar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border-y">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto text-center border-0 shadow-lg">
            <CardHeader>
              <div className="size-16 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white mx-auto mb-4">
                <HelpCircle className="size-8" />
              </div>
              <CardTitle className="text-2xl mb-2">Não encontrou o que procurava?</CardTitle>
              <CardDescription className="text-base">
                Nossa equipe de suporte está pronta para ajudar você
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Entrar em contato</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:suporte@kamaia.com">
                  Enviar email
                  <ExternalLink className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
