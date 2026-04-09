"use client"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { ActivitySkeleton } from "@/components/ui/skeleton-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, MoreVertical, Phone, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCompanyACL } from "@/hooks/queries/use-company-acl"

// Mock data
const teamMembers = [
  {
    id: 1,
    name: "Dr. João Silva",
    role: "Advogado Sênior",
    avatar: "/avatars/joao.jpg",
    status: "online",
    lastSeen: null,
  },
  {
    id: 2,
    name: "Dra. Maria Santos",
    role: "Advogada",
    avatar: "/avatars/maria.jpg",
    status: "online",
    lastSeen: null,
  },
  {
    id: 3,
    name: "Dr. Pedro Costa",
    role: "Advogado Júnior",
    avatar: "/avatars/pedro.jpg",
    status: "away",
    lastSeen: "5 min atrás",
  },
  {
    id: 4,
    name: "Ana Carolina",
    role: "Assistente Jurídica",
    avatar: "/avatars/ana.jpg",
    status: "offline",
    lastSeen: "2h atrás",
  },
]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

export default function CardCompanyTeamMembers () {

  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isLoadingCompanyACL, data } = useCompanyACL(company?.id as string, { page: 1, take: 3})

  console.log(data)

  return (
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Equipe Online
              </CardTitle>
              <CardDescription>
                {teamMembers.filter((m) => m.status === "online").length} membros ativos
              </CardDescription>
            </CardHeader>

              <CardContent>
                  {
                    !isLoading || !isLoadingCompanyACL
                      ? <ActivitySkeleton />
                      :  <ScrollArea className="h-[200px]">
                            <div className="space-y-3">
                              {teamMembers.map((member) => (
                                <div
                                  key={member.id}
                                  className="flex items-center justify-between space-x-3"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="relative">
                                      <Avatar className="h-10 w-10">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>
                                          {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span
                                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                                          member.status
                                        )}`}
                                      />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium leading-none">
                                        {member.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {member.role}
                                      </p>
                                      {member.lastSeen && (
                                        <p className="text-xs text-muted-foreground">
                                          {member.lastSeen}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Enviar mensagem
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Phone className="mr-2 h-4 w-4" />
                                        Ligar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Video className="mr-2 h-4 w-4" />
                                        Videochamada
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                  }
                </CardContent>
          </Card>
    )
}
