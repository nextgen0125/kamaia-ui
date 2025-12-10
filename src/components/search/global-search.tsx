"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  FileText,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  Folder,
  Settings,
  File,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "case" | "client" | "lawyer" | "document" | "task" | "event" | "page"
  url: string
  icon: any
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Ação Trabalhista - Horas Extras",
    description: "Processo 0001234-56.2024.8.26.0100",
    type: "case",
    url: "/dashboard/cases/1",
    icon: Briefcase,
  },
  {
    id: "2",
    title: "Carlos Eduardo Mendes",
    description: "Cliente - Pessoa Física",
    type: "client",
    url: "/dashboard/clients/1",
    icon: User,
  },
  {
    id: "3",
    title: "Dr. João Silva",
    description: "Advogado - OAB/SP 123456",
    type: "lawyer",
    url: "/dashboard/lawyers/1",
    icon: Users,
  },
  {
    id: "4",
    title: "Petição Inicial.pdf",
    description: "Documento - Processo 0001234-56.2024",
    type: "document",
    url: "/dashboard/document",
    icon: File,
  },
  {
    id: "5",
    title: "Preparar memoriais finais",
    description: "Tarefa - Prazo: 25/03/2024",
    type: "task",
    url: "/dashboard/task",
    icon: FileText,
  },
  {
    id: "6",
    title: "Audiência de Instrução",
    description: "Evento - 22/03/2024 às 09:30",
    type: "event",
    url: "/dashboard/agenda",
    icon: Calendar,
  },
]

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const filteredResults = mockSearchResults.filter((result) =>
    result.title.toLowerCase().includes(search.toLowerCase()) ||
    result.description.toLowerCase().includes(search.toLowerCase())
  )

  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = []
    }
    acc[result.type].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)

  const getTypeLabel = (type: string) => {
    const labels = {
      case: "Processos",
      client: "Clientes",
      lawyer: "Advogados",
      document: "Documentos",
      task: "Tarefas",
      event: "Eventos",
      page: "Páginas",
    }
    return labels[type as keyof typeof labels] || type
  }

  const handleSelect = (url: string) => {
    setOpen(false)
    router.push(url)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Buscar...</span>
        <span className="inline-flex lg:hidden">Buscar</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Buscar processos, clientes, documentos..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

          {Object.entries(groupedResults).map(([type, results], index) => (
            <div key={type}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={getTypeLabel(type)}>
                {results.map((result) => {
                  const Icon = result.icon
                  return (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result.url)}
                      className="cursor-pointer"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <div className="flex-1">
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {result.description}
                        </div>
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ))}

          {search && filteredResults.length === 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Ações rápidas">
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard/cases")
                  }}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Criar novo processo</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard/clients")
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Adicionar cliente</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard/document")
                  }}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Upload de documento</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}

          {!search && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Navegação">
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard")
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard/cases")
                  }}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Processos</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard/clients")
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Clientes</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard/lawyers")
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Advogados</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard/agenda")
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Agenda</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push("/dashboard/finance")
                  }}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Financeiro</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
