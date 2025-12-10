"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen,
  Video,
  FileText,
  Send
} from "lucide-react"

export default function CustomerHelpPage() {
  const faqs = [
    {
      q: "Como acompanhar o andamento do meu processo?",
      a: "Você pode acompanhar seu processo acessando a seção 'Meus Processos' no menu lateral. Lá você verá todas as atualizações em tempo real."
    },
    {
      q: "Como fazer o upload de documentos?",
      a: "Acesse a seção 'Documentos', clique no botão 'Enviar Documento' e selecione os arquivos do seu computador. Os documentos serão enviados de forma segura e criptografada."
    },
    {
      q: "Como entro em contato com meu advogado?",
      a: "Use a seção 'Mensagens' para enviar mensagens diretas ao seu advogado. Você receberá notificações quando houver resposta."
    },
    {
      q: "Posso alterar meus dados cadastrais?",
      a: "Sim, acesse 'Meu Perfil' e clique em 'Editar Informações'. Algumas alterações podem precisar de verificação."
    },
    {
      q: "Como visualizar minhas faturas?",
      a: "Todas as faturas estão disponíveis na seção 'Pagamentos'. Você pode visualizar, baixar e pagar faturas pendentes."
    }
  ]

  const resources = [
    {
      icon: <Video className="size-6" />,
      title: "Tutoriais em Vídeo",
      description: "Aprenda a usar a plataforma com vídeos explicativos",
      badge: "5 vídeos"
    },
    {
      icon: <BookOpen className="size-6" />,
      title: "Central de Ajuda",
      description: "Documentação completa sobre todos os recursos",
      badge: "50+ artigos"
    },
    {
      icon: <FileText className="size-6" />,
      title: "Guia Rápido",
      description: "Comece rapidamente com nosso guia para iniciantes",
      badge: "PDF"
    }
  ]

  const supportChannels = [
    {
      icon: <MessageCircle className="size-10 text-violet-600" />,
      title: "Chat ao Vivo",
      description: "Fale com nosso time em tempo real",
      availability: "Seg-Sex: 8h-20h",
      action: "Iniciar Chat"
    },
    {
      icon: <Mail className="size-10 text-blue-600" />,
      title: "Email",
      description: "Envie sua dúvida por email",
      availability: "Resposta em até 24h",
      action: "Enviar Email"
    },
    {
      icon: <Phone className="size-10 text-green-600" />,
      title: "Telefone",
      description: "Ligue para nossa central",
      availability: "(11) 99999-9999",
      action: "Ligar Agora"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Central de Ajuda</h1>
        <p className="text-muted-foreground">
          Encontre respostas ou entre em contato com o suporte
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="Buscar ajuda... Ex: 'como enviar documentos'"
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recursos de Aprendizado</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="size-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-600 mb-3">
                  {resource.icon}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <Badge variant="secondary">{resource.badge}</Badge>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
          <CardDescription>
            Respostas rápidas para as dúvidas mais comuns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Support Channels */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Entre em Contato</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {supportChannels.map((channel, index) => (
            <Card key={index}>
              <CardHeader className="text-center">
                <div className="size-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  {channel.icon}
                </div>
                <CardTitle>{channel.title}</CardTitle>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  {channel.availability}
                </p>
                <Button className="w-full">
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Envie sua Dúvida</CardTitle>
          <CardDescription>
            Não encontrou o que procurava? Envie uma mensagem para nossa equipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Assunto</label>
                <Input placeholder="Ex: Dúvida sobre processo" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <select className="w-full h-10 px-3 rounded-md border bg-background">
                  <option>Processos</option>
                  <option>Documentos</option>
                  <option>Pagamentos</option>
                  <option>Conta</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mensagem</label>
              <Textarea 
                placeholder="Descreva sua dúvida em detalhes..."
                rows={5}
              />
            </div>
            <Button>
              <Send className="size-4 mr-2" />
              Enviar Mensagem
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
