"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  CheckCircle2
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Selecione um assunto"),
  message: z.string().min(10, "Mensagem deve ter no mínimo 10 caracteres"),
  company: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      company: "",
    },
  })

  function onSubmit(values: ContactFormValues) {
    console.log(values)
    toast.success("Mensagem enviada com sucesso!", {
      description: "Retornaremos em breve.",
    })
    setIsSubmitted(true)
    form.reset()
    
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  const contactInfo = [
    {
      icon: <Mail className="size-5" />,
      title: "Email",
      content: "contato@kamaia.com",
      link: "mailto:contato@kamaia.com",
      description: "Resposta em até 24 horas"
    },
    {
      icon: <Phone className="size-5" />,
      title: "Telefone",
      content: "+244 949 273 453",
      link: "tel:+244945837234",
      description: "Seg-Sex, 9h às 18h"
    },
    {
      icon: <MapPin className="size-5" />,
      title: "Endereço",
      content: "Luanda, Angola",
      link: "#",
      description: "Av. Paulista, 1000"
    },
    {
      icon: <Clock className="size-5" />,
      title: "Horário",
      content: "Segunda a Sexta",
      link: "#",
      description: "9h às 18h (BRT)"
    },
  ]

  const reasons = [
    {
      icon: <MessageSquare className="size-6" />,
      title: "Dúvidas sobre o produto",
      description: "Tire suas dúvidas sobre funcionalidades e recursos"
    },
    {
      icon: <Calendar className="size-6" />,
      title: "Agendar demonstração",
      description: "Veja o Kamaia em ação com um especialista"
    },
    {
      icon: <Phone className="size-6" />,
      title: "Suporte técnico",
      description: "Ajuda com problemas técnicos ou bugs"
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              <Mail className="size-3.5 mr-1.5" />
              Entre em Contato
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Estamos aqui para ajudar
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Fale com nossa equipe de especialistas e descubra como o Kamaia pode transformar seu escritório
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white mx-auto mb-4">
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                  <CardDescription>
                    <a 
                      href={info.link}
                      className="font-medium text-foreground hover:text-violet-600 transition-colors"
                    >
                      {info.content}
                    </a>
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">
                    {info.description}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div>
              {isSubmitted ? (
                <Card className="border-green-500 bg-green-50 dark:bg-green-950/20">
                  <CardHeader className="text-center">
                    <div className="size-16 rounded-full bg-green-500 flex items-center justify-center text-white mx-auto mb-4">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <CardTitle className="text-2xl">Mensagem Enviada!</CardTitle>
                    <CardDescription className="text-base">
                      Recebemos sua mensagem e retornaremos em breve.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Envie sua mensagem</CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo e entraremos em contato em breve
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome completo *</FormLabel>
                                <FormControl>
                                  <Input placeholder="João Silva" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="joao@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                  <Input placeholder="+244 932938932" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Escritório/Empresa</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nome do escritório" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assunto *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um assunto" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sales">Vendas e planos</SelectItem>
                                  <SelectItem value="demo">Agendar demonstração</SelectItem>
                                  <SelectItem value="support">Suporte técnico</SelectItem>
                                  <SelectItem value="partnership">Parcerias</SelectItem>
                                  <SelectItem value="other">Outro assunto</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mensagem *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Conte-nos como podemos ajudar..."
                                  className="min-h-[150px] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" size="lg" className="w-full">
                          <Send className="mr-2 size-4" />
                          Enviar mensagem
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Como podemos ajudar?</h2>
                <div className="space-y-4">
                  {reasons.map((reason, index) => (
                    <Card key={index} className="hover:shadow-md transition-all">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white shrink-0">
                            {reason.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg mb-1">{reason.title}</CardTitle>
                            <CardDescription>{reason.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border-violet-200 dark:border-violet-800">
                <CardHeader>
                  <CardTitle>Prefere falar ao vivo?</CardTitle>
                  <CardDescription className="text-base">
                    Agende uma demonstração gratuita e veja o Kamaia em ação com um de nossos especialistas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">
                    <Calendar className="mr-2 size-4" />
                    Agendar demonstração
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Central de ajuda</CardTitle>
                  <CardDescription>
                    Encontre respostas rápidas na nossa base de conhecimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <a href="/docs" className="text-sm text-violet-600 hover:underline flex items-center gap-2">
                        📚 Documentação completa
                      </a>
                    </li>
                    <li>
                      <a href="/docs#faq" className="text-sm text-violet-600 hover:underline flex items-center gap-2">
                        ❓ Perguntas frequentes
                      </a>
                    </li>
                    <li>
                      <a href="/docs#videos" className="text-sm text-violet-600 hover:underline flex items-center gap-2">
                        🎥 Tutoriais em vídeo
                      </a>
                    </li>
                    <li>
                      {/* <a href="/docs#api" className="text-sm text-violet-600 hover:underline flex items-center gap-2">
                        ⚙️ Documentação da API
                      </a> */}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nosso escritório</h2>
              <p className="text-muted-foreground">
                Venha nos visitar pessoalmente
              </p>
            </div>
            
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Mapa do escritório</p>
                  <p className="text-sm text-muted-foreground">Av. Paulista, 1000 - Luanda, Angola</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
