"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  MessageSquare,
  Send,
  Paperclip,
  Search,
  Mail,
} from "lucide-react"
import { toast } from "sonner"

const mockConversations = [
  {
    id: "1",
    from: "Dr. João Silva",
    subject: "Atualização sobre o processo",
    preview: "Olá Carlos, gostaria de informar que houve uma movimentação importante...",
    date: "2024-03-18T10:30:00",
    unread: true,
    messages: [
      {
        id: "1",
        from: "Dr. João Silva",
        content: "Olá Carlos, gostaria de informar que houve uma movimentação importante no seu processo de horas extras. A audiência de instrução foi concluída com sucesso e as testemunhas foram ouvidas.",
        date: "2024-03-18T10:30:00",
        isOwn: false,
      },
      {
        id: "2",
        from: "Você",
        content: "Ótima notícia, Dr. João! Quais são os próximos passos?",
        date: "2024-03-18T11:15:00",
        isOwn: true,
      },
      {
        id: "3",
        from: "Dr. João Silva",
        content: "Agora vamos aguardar o prazo para apresentação dos memoriais finais. Vou preparar um documento resumindo todos os pontos favoráveis que foram apresentados.",
        date: "2024-03-18T14:20:00",
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    from: "Escritório Silva & Associados",
    subject: "Documentos para assinatura",
    preview: "Prezado cliente, enviamos em anexo os documentos que necessitam...",
    date: "2024-03-15T09:00:00",
    unread: false,
    messages: [
      {
        id: "1",
        from: "Escritório Silva & Associados",
        content: "Prezado cliente, enviamos em anexo os documentos que necessitam de sua assinatura. Por favor, assine e retorne até o final da semana.",
        date: "2024-03-15T09:00:00",
        isOwn: false,
      },
      {
        id: "2",
        from: "Você",
        content: "Recebi os documentos. Vou assinar e enviar hoje mesmo. Obrigado!",
        date: "2024-03-15T14:30:00",
        isOwn: true,
      },
    ],
  },
  {
    id: "3",
    from: "Dra. Maria Santos",
    subject: "Reunião de acompanhamento",
    preview: "Bom dia! Gostaria de agendar uma reunião para discutir o andamento...",
    date: "2024-03-12T15:45:00",
    unread: false,
    messages: [
      {
        id: "1",
        from: "Dra. Maria Santos",
        content: "Bom dia! Gostaria de agendar uma reunião para discutir o andamento do seu processo. Você tem disponibilidade na próxima semana?",
        date: "2024-03-12T15:45:00",
        isOwn: false,
      },
      {
        id: "2",
        from: "Você",
        content: "Boa tarde, Dra. Maria! Tenho disponibilidade na terça-feira à tarde ou na quinta-feira pela manhã.",
        date: "2024-03-13T10:20:00",
        isOwn: true,
      },
      {
        id: "3",
        from: "Dra. Maria Santos",
        content: "Perfeito! Vamos marcar para terça-feira às 15h. Confirmo por aqui assim que tiver mais detalhes.",
        date: "2024-03-13T11:00:00",
        isOwn: false,
      },
    ],
  },
]

export default function CustomerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.from.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Ontem"
    } else if (diffDays < 7) {
      return d.toLocaleDateString("pt-BR", { weekday: "short" })
    } else {
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success("Mensagem enviada!")
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Mensagens</h1>
        <p className="text-muted-foreground">Converse com seu advogado e escritório</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConversations.length}</div>
            <p className="text-xs text-muted-foreground">conversas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
            <Mail className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockConversations.filter((c) => c.unread).length}
            </div>
            <p className="text-xs text-muted-foreground">mensagens</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">Dr. João Silva</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(mockConversations[0].date)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1">
        <div className="grid md:grid-cols-3 h-[600px]">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="h-[520px]">
              <div className="space-y-1 p-2">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation.id === conv.id
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    } ${conv.unread ? "bg-blue-50 dark:bg-blue-950/20" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {conv.from.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{conv.from}</p>
                          {conv.unread && (
                            <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(conv.date)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {conv.subject}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {conv.preview}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Messages */}
          <div className="md:col-span-2 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {selectedConversation.from.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{selectedConversation.from}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.subject}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] space-y-1 ${
                        message.isOwn ? "items-end" : "items-start"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{message.from}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(message.date)}
                        </span>
                      </div>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <Separator />
            <div className="p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[80px] resize-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
