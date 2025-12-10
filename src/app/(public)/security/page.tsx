"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Lock, Key, Eye, FileCheck, Server, AlertTriangle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: <ShieldCheck className="size-6" />,
      title: "Criptografia de Ponta a Ponta",
      description: "Todos os dados são criptografados usando AES-256, tanto em trânsito quanto em repouso."
    },
    {
      icon: <Lock className="size-6" />,
      title: "Autenticação Multifator (MFA)",
      description: "Proteção adicional com autenticação de dois fatores para todas as contas."
    },
    {
      icon: <Key className="size-6" />,
      title: "Controle de Acesso Granular",
      description: "Defina permissões específicas para cada usuário e função na organização."
    },
    {
      icon: <Eye className="size-6" />,
      title: "Auditoria Completa",
      description: "Registro detalhado de todas as ações realizadas no sistema para compliance."
    },
    {
      icon: <FileCheck className="size-6" />,
      title: "Conformidade LGPD",
      description: "100% em conformidade com a Lei Geral de Proteção de Dados Pessoais."
    },
    {
      icon: <Server className="size-6" />,
      title: "Backup Automático",
      description: "Backups diários automatizados com retenção de 30 dias e recuperação rápida."
    }
  ]

  const certifications = [
    { name: "ISO 27001", description: "Gestão de Segurança da Informação" },
    { name: "LGPD", description: "Lei Geral de Proteção de Dados" },
    { name: "SOC 2 Type II", description: "Controles de Segurança e Disponibilidade" },
    { name: "PCI DSS", description: "Segurança de Dados de Cartão de Pagamento" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <ShieldCheck className="size-3.5 mr-1.5" />
              Segurança e Privacidade
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Segurança em primeiro lugar
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Protegemos seus dados jurídicos com os mais altos padrões de segurança da indústria. 
              Sua confiança é nossa prioridade.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Falar com especialista em segurança</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos de Segurança
            </h2>
            <p className="text-xl text-muted-foreground">
              Proteção em múltiplas camadas para seus dados mais sensíveis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Certificações e Conformidade
            </h2>
            <p className="text-xl text-muted-foreground">
              Reconhecidos internacionalmente por nossos padrões de segurança
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <CheckCircle2 className="size-12 mx-auto mb-4 text-green-500" />
                  <CardTitle className="text-xl">{cert.name}</CardTitle>
                  <CardDescription>{cert.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2 border-violet-500/20">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <AlertTriangle className="size-8 text-violet-600" />
                <div>
                  <CardTitle className="text-2xl">Resposta a Incidentes</CardTitle>
                  <CardDescription>Equipe dedicada 24/7 para segurança</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nossa equipe de segurança monitora constantemente a plataforma e está pronta para 
                responder a qualquer incidente de segurança em tempo real.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/contact">Reportar Incidente</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Ver Política de Segurança</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
