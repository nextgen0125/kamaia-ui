"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, Mail, Phone, MapPin, Filter, Download, User } from "lucide-react"
import { AddContactDialog } from "@/components/contacts/add-contact-dialog"
import { MobileCardList, MobileCardItem, MobileCardField } from "@/components/ui/mobile-card-list"

// Mock data - baseado na imagem fornecida
const contacts = [
  {
    id: "00001",
    name: "Christine Brooks",
    phone: "+244 923 456 789",
    email: "cheri@gmail.com",
    address: "Kilamba, Bloco c, ap 24, Luanda",
    type: "Cliente",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    phone: "+244 945 567 893",
    email: "pearson43@hotmail.com",
    address: "Kilamba, Bloco c, ap 24, Luanda",
    type: "Contacto",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    phone: "+244 912 345 678",
    email: "darrell@example.com",
    address: "Talatona, Condomínio Jardim, Luanda",
    type: "Cliente",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    phone: "+244 923 789 456",
    email: "gilbert@outlook.com",
    address: "Maianga, Rua Direita, Luanda",
    type: "Fornecedor",
  },
  {
    id: "00005",
    name: "Alan Cain",
    phone: "+244 934 567 890",
    email: "alan.cain@gmail.com",
    address: "Viana, Urbanização Nova Vida, Luanda",
    type: "Cliente",
  },
]

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [selectedTag, setSelectedTag] = useState<string>("")

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery) ||
      contact.id.includes(searchQuery)

    const matchesType = filterType === "all" || contact.type === filterType

    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Cliente":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
      case "Contacto":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "Fornecedor":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contactos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os contactos do escritório
          </p>
        </div>
        <AddContactDialog />
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="size-5 text-muted-foreground" />
              <span className="font-semibold">Filtrar por</span>
            </div>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              Restaurar Filtro
            </Button>
          </div>
          
          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4">
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger>
                <SelectValue placeholder="Data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="all">Todos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Clientes</SelectItem>
                <SelectItem value="active">Clientes Ativos</SelectItem>
                <SelectItem value="inactive">Clientes Inativos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Etiqueta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="contacto">Contacto</SelectItem>
                <SelectItem value="fornecedor">Fornecedor</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Pesquisar"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>TELEMÓVEL</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>ENDEREÇO</TableHead>
                  <TableHead>PERFIL</TableHead>
                  <TableHead className="text-right">AÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Nenhum contacto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{contact.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="size-3.5 text-muted-foreground" />
                          {contact.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="size-3.5 text-muted-foreground" />
                          {contact.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 max-w-xs">
                          <MapPin className="size-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{contact.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(contact.type)} variant="secondary">
                          {contact.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="size-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 size-4" />
                              Ver detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 size-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 size-4" />
                              Enviar email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 size-4" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <MobileCardList>
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <User className="size-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum contacto encontrado</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <MobileCardItem key={contact.id}>
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-white">
                            {contact.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{contact.name}</div>
                          <div className="text-xs text-muted-foreground">ID: {contact.id}</div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreVertical className="size-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 size-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 size-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 size-4" />
                            Enviar email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 size-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <MobileCardField
                        label="Telemóvel"
                        value={contact.phone}
                        icon={<Phone className="size-4" />}
                      />
                      <MobileCardField
                        label="Email"
                        value={contact.email}
                        icon={<Mail className="size-4" />}
                      />
                      <MobileCardField
                        label="Endereço"
                        value={contact.address}
                        icon={<MapPin className="size-4" />}
                      />
                    </div>

                    {/* Badge */}
                    <div className="pt-2 border-t">
                      <Badge className={getTypeColor(contact.type)} variant="secondary">
                        {contact.type}
                      </Badge>
                    </div>
                  </div>
                </MobileCardItem>
              ))
            )}
          </MobileCardList>

          {/* Footer Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-sm text-muted-foreground">
            <div className="text-center sm:text-left">
              Mostrando {filteredContacts.length} de {contacts.length} contactos
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Download className="mr-2 size-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
