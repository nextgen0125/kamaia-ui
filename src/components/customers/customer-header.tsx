"use client"

import { Bell, Search, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function CustomerHeader() {
  const notifications = 3

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar processos, documentos..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 p-2">
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer">
                  <p className="text-sm font-medium">Novo andamento processual</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Seu processo teve uma atualização
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Há 2 horas</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer">
                  <p className="text-sm font-medium">Documento disponível</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Novo documento foi adicionado ao processo
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Há 5 horas</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer">
                  <p className="text-sm font-medium">Mensagem recebida</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dr. João Silva enviou uma mensagem
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Ontem</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="size-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Carlos Mendes" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">Carlos Mendes</p>
                  <p className="text-xs text-muted-foreground">Cliente</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/customers/profile">
                  <User className="mr-2 size-4" />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/customers/settings">
                  <Settings className="mr-2 size-4" />
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 size-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
