"use client"


import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"

import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import {
  Send,
  Paperclip,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const messages = [
  {
    id: 1,
    user: "Dr. João Silva",
    avatar: "/avatars/joao.jpg",
    message: "Pessoal, precisamos revisar o processo da Tech Solutions antes da audiência de amanhã.",
    time: "10:30",
    isOwn: false,
  },
  {
    id: 2,
    user: "Você",
    avatar: "/avatars/you.jpg",
    message: "Pode deixar, Dr. João. Já estou revisando os documentos.",
    time: "10:32",
    isOwn: true,
  },
  {
    id: 3,
    user: "Dra. Maria Santos",
    avatar: "/avatars/maria.jpg",
    message: "Eu posso ajudar também. Qual o horário da audiência?",
    time: "10:35",
    isOwn: false,
  },
  {
    id: 4,
    user: "Dr. João Silva",
    avatar: "/avatars/joao.jpg",
    message: "Às 14h no Fórum Central, sala 201. Obrigado pela ajuda!",
    time: "10:36",
    isOwn: false,
  },
]


export default function CompanyWorkspaceChatTab() {

    const [message, setMessage] = useState("")
  

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aqui você adicionaria a lógica para enviar a mensagem
      console.log("Enviando mensagem:", message)
      setMessage("")
    }
  }

  const { isLoading, company } = useCompanyDashboardContext();
  

  return (
      <>
        <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${
                    msg.isOwn ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex-1 space-y-1 ${
                      msg.isOwn ? "items-end" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium">
                        {msg.user}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {msg.time}
                      </span>
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        msg.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </ScrollArea>

        <Separator className="my-4" />

        {/* Message Input */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Textarea
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="min-h-[60px] resize-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button size="icon" variant="outline">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </>
  )
}
