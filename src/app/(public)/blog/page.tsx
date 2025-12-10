"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      title: "10 Dicas para Otimizar a Gestão do Seu Escritório",
      excerpt: "Descubra como melhorar a produtividade e organização do seu escritório de advocacia com essas práticas essenciais.",
      date: "15 Jan 2025",
      author: "Maria Santos",
      category: "Gestão",
      image: "📊"
    },
    {
      title: "Como a IA Está Transformando o Direito",
      excerpt: "Entenda como a inteligência artificial está revolucionando a prática jurídica e o que esperar para o futuro.",
      date: "10 Jan 2025",
      author: "João Silva",
      category: "Tecnologia",
      image: "🤖"
    },
    {
      title: "LGPD: Guia Completo para Escritórios de Advocacia",
      excerpt: "Tudo o que você precisa saber sobre conformidade com a Lei Geral de Proteção de Dados no contexto jurídico.",
      date: "5 Jan 2025",
      author: "Ana Oliveira",
      category: "Compliance",
      image: "🔒"
    },
    {
      title: "Automatização de Processos Jurídicos: Por Onde Começar",
      excerpt: "Um guia prático para iniciar a jornada de digitalização e automatização do seu escritório.",
      date: "28 Dez 2024",
      author: "Pedro Costa",
      category: "Automação",
      image: "⚡"
    },
    {
      title: "Gestão Financeira para Advogados: Melhores Práticas",
      excerpt: "Aprenda a gerenciar as finanças do seu escritório de forma eficiente e profissional.",
      date: "20 Dez 2024",
      author: "Maria Santos",
      category: "Finanças",
      image: "💰"
    },
    {
      title: "Marketing Jurídico: Como Atrair Mais Clientes",
      excerpt: "Estratégias éticas e eficazes de marketing para crescer sua base de clientes.",
      date: "15 Dez 2024",
      author: "João Silva",
      category: "Marketing",
      image: "📢"
    }
  ]

  const categories = ["Todos", "Gestão", "Tecnologia", "Compliance", "Automação", "Finanças", "Marketing"]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Insights e Novidades
            </h1>
            <p className="text-xl text-muted-foreground">
              Artigos, guias e dicas para modernizar seu escritório de advocacia
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button 
                key={index} 
                variant={index === 0 ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="text-6xl mb-4">{post.image}</div>
                  <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="group-hover:text-violet-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="size-4" />
                      {post.author}
                    </div>
                  </div>
                  <Button variant="ghost" className="group/btn p-0 h-auto">
                    Ler mais
                    <ArrowRight className="ml-2 size-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Receba novos artigos por email
          </h2>
          <p className="text-muted-foreground mb-6">
            Inscreva-se para receber insights e atualizações diretamente na sua caixa de entrada
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="seu@email.com" 
              className="flex-1 px-4 py-2 rounded-lg border bg-background"
            />
            <Button>Inscrever</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
