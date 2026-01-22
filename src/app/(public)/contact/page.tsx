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
import { useLanguage } from "@/contexts/language-context"

// Schema will be created inside component to access t() function

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useLanguage()

  const contactSchema = z.object({
    name: z.string().min(2, t("contact.validation.name.min")),
    email: z.string().email(t("contact.validation.email.invalid")),
    phone: z.string().optional(),
    subject: z.string().min(1, t("contact.validation.subject.required")),
    message: z.string().min(10, t("contact.validation.message.min")),
    company: z.string().optional(),
  })

  type ContactFormValues = z.infer<typeof contactSchema>

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
    toast.success(t("contact.toast.success"), {
      description: t("contact.toast.description"),
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
      title: t("contact.info.email"),
      content: t("contact.info.email.value"),
      link: "mailto:contato@kamaia.com",
      description: t("contact.info.email.description")
    },
    {
      icon: <Phone className="size-5" />,
      title: t("contact.info.phone"),
      content: t("contact.info.phone.value"),
      link: "tel:+244945837234",
      description: t("contact.info.phone.description")
    },
    {
      icon: <MapPin className="size-5" />,
      title: t("contact.info.address"),
      content: t("contact.info.address.value"),
      link: "#",
      description: t("contact.info.address.description")
    },
    {
      icon: <Clock className="size-5" />,
      title: t("contact.info.hours"),
      content: t("contact.info.hours.value"),
      link: "#",
      description: t("contact.info.hours.description")
    },
  ]

  const reasons = [
    {
      icon: <MessageSquare className="size-6" />,
      title: t("contact.reasons.product.title"),
      description: t("contact.reasons.product.description")
    },
    {
      icon: <Calendar className="size-6" />,
      title: t("contact.reasons.demo.title"),
      description: t("contact.reasons.demo.description")
    },
    {
      icon: <Phone className="size-6" />,
      title: t("contact.reasons.support.title"),
      description: t("contact.reasons.support.description")
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
              {t("contact.badge")}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("contact.title")}
            </h1>
            
            <p className="text-xl text-muted-foreground">
              {t("contact.subtitle")}
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
                    <CardTitle className="text-2xl">{t("contact.form.success.title")}</CardTitle>
                    <CardDescription className="text-base">
                      {t("contact.form.success.description")}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t("contact.form.title")}</CardTitle>
                    <CardDescription>
                      {t("contact.form.subtitle")}
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
                                <FormLabel>{t("contact.form.name")} *</FormLabel>
                                <FormControl>
                                  <Input placeholder={t("contact.form.name.placeholder")} {...field} />
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
                                <FormLabel>{t("contact.form.email")} *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder={t("contact.form.email.placeholder")} {...field} />
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
                                <FormLabel>{t("contact.form.phone")}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t("contact.form.phone.placeholder")} {...field} />
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
                                <FormLabel>{t("contact.form.company")}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t("contact.form.company.placeholder")} {...field} />
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
                              <FormLabel>{t("contact.form.subject")} *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t("contact.form.subject.placeholder")} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sales">{t("contact.form.subject.sales")}</SelectItem>
                                  <SelectItem value="demo">{t("contact.form.subject.demo")}</SelectItem>
                                  <SelectItem value="support">{t("contact.form.subject.support")}</SelectItem>
                                  <SelectItem value="partnership">{t("contact.form.subject.partnership")}</SelectItem>
                                  <SelectItem value="other">{t("contact.form.subject.other")}</SelectItem>
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
                              <FormLabel>{t("contact.form.message")} *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={t("contact.form.message.placeholder")}
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
                          {t("contact.form.submit")}
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
                <h2 className="text-2xl font-bold mb-6">{t("contact.reasons.title")}</h2>
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
                  <CardTitle>{t("contact.live.title")}</CardTitle>
                  <CardDescription className="text-base">
                    {t("contact.live.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">
                    <Calendar className="mr-2 size-4" />
                    {t("contact.live.cta")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("contact.help.title")}</CardTitle>
                  <CardDescription>
                    {t("contact.help.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <a href="/docs" className="text-sm text-violet-600 hover:underline flex items-center gap-2">
                        📚 {t("contact.help.docs")}
                      </a>
                    </li>
                    <li>
                      <a href="/docs#faq" className="text-sm text-violet-600 hover:underline flex items-center gap-2">
                        ❓ {t("contact.help.faq")}
                      </a>
                    </li>
                    <li>
                      <a href="/docs#videos" className="text-sm text-violet-600 hover:underline flex items-center gap-2">
                        🎥 {t("contact.help.videos")}
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
              <h2 className="text-3xl font-bold mb-4">{t("contact.office.title")}</h2>
              <p className="text-muted-foreground">
                {t("contact.office.description")}
              </p>
            </div>
            
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t("contact.office.map")}</p>
                  <p className="text-sm text-muted-foreground">{t("contact.office.address")}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
