"use client"

import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageCircle, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      category: "Geral",
      questions: [
        {
          q: "O que é o Kamaia?",
          a: "O Kamaia é uma plataforma completa de gestão para escritórios de advocacia e departamentos jurídicos, que integra gestão de processos, clientes, documentos, finanças e muito mais em um único sistema."
        },
        {
          q: "Como funciona o período de teste gratuito?",
          a: "Oferecemos 14 dias de teste gratuito com acesso completo a todos os recursos. Não é necessário cartão de crédito para começar e você pode cancelar a qualquer momento."
        },
        {
          q: "Posso migrar meus dados de outro sistema?",
          a: "Sim! Nossa equipe oferece suporte completo para migração de dados de outros sistemas. O processo é seguro e não causa interrupções no seu trabalho."
        }
      ]
    },
    {
      category: "Preços e Planos",
      questions: [
        {
          q: "Quais são as formas de pagamento aceitas?",
          a: "Aceitamos cartão de crédito, boleto bancário e PIX. Para planos anuais, também oferecemos condições especiais de pagamento."
        },
        {
          q: "Posso mudar de plano depois?",
          a: "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor no próximo ciclo de cobrança."
        },
        {
          q: "Existe desconto para pagamento anual?",
          a: "Sim! Oferecemos 20% de desconto para pagamentos anuais e 10% para semestrais."
        }
      ]
    },
    {
      category: "Segurança",
      questions: [
        {
          q: "Meus dados estão seguros?",
          a: "Absolutamente. Utilizamos criptografia AES-256, backups diários, servidores em nuvem redundantes e somos certificados ISO 27001. Seus dados estão protegidos com os mais altos padrões de segurança."
        },
        {
          q: "O sistema é compatível com a LGPD?",
          a: "Sim, o Kamaia está 100% em conformidade com a Lei Geral de Proteção de Dados (LGPD) e outras regulamentações de privacidade."
        },
        {
          q: "Como funciona o backup dos dados?",
          a: "Realizamos backups automáticos diários com retenção de 30 dias. Você também pode solicitar backups sob demanda a qualquer momento."
        }
      ]
    },
    {
      category: "Recursos",
      questions: [
        {
          q: "Posso acessar o sistema de qualquer lugar?",
          a: "Sim, o Kamaia é 100% baseado na nuvem e pode ser acessado de qualquer dispositivo com internet, incluindo computadores, tablets e smartphones."
        },
        {
          q: "Existe aplicativo mobile?",
          a: "Sim! Temos aplicativos nativos para iOS e Android com as principais funcionalidades da plataforma."
        },
        {
          q: "O sistema possui API para integrações?",
          a: "Sim, oferecemos uma API REST completa que permite integração com outros sistemas e ferramentas."
        }
      ]
    },
    {
      category: "Suporte",
      questions: [
        {
          q: "Qual o horário de atendimento do suporte?",
          a: "Nosso suporte está disponível de segunda a sexta, das 8h às 20h, e aos sábados das 9h às 13h. Clientes do plano Enterprise têm suporte 24/7."
        },
        {
          q: "Como posso entrar em contato com o suporte?",
          a: "Você pode nos contatar por email, chat ao vivo, telefone ou abrir um ticket diretamente no sistema."
        },
        {
          q: "Vocês oferecem treinamento?",
          a: "Sim! Oferecemos treinamento online gratuito para todos os clientes, além de treinamento personalizado para planos Enterprise."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <HelpCircle className="size-3.5 mr-1.5" />
              FAQ
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-muted-foreground">
              Encontre respostas para as dúvidas mais comuns sobre o Kamaia
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg px-6 bg-card"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Não encontrou sua resposta?</h2>
            <p className="text-muted-foreground">Entre em contato com nossa equipe</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <MessageCircle className="size-10 mx-auto mb-4 text-violet-600" />
                <CardTitle>Chat ao Vivo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Fale com nosso time em tempo real
                </p>
                <Button className="w-full">Iniciar Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Mail className="size-10 mx-auto mb-4 text-blue-600" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Envie um email para suporte
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:suporte@kamaia.com">Enviar Email</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Phone className="size-10 mx-auto mb-4 text-green-600" />
                <CardTitle>Telefone</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Ligue para nossa central
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="tel:+5511999999999">Ligar Agora</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
