"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, Calendar, DollarSign, Clock, Tag } from "lucide-react"

interface ViewServiceDialogProps {
  service: {
    id: number
    name: string
    category: string
    description: string
    price: number
    duration?: string
    status: string
    createdAt?: string
    updatedAt?: string
  }
  trigger?: React.ReactNode
}

export function ViewServiceDialog({ service, trigger }: ViewServiceDialogProps) {
  const [open, setOpen] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Eye className="size-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{service.name}</DialogTitle>
          <DialogDescription>
            Detalhes completos do serviço
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <Badge variant={service.status === "active" ? "default" : "secondary"}>
              {service.status === "active" ? "Ativo" : "Inativo"}
            </Badge>
            <Badge variant="outline">
              <Tag className="size-3 mr-1" />
              {service.category}
            </Badge>
          </div>

          <Separator />

          {/* Informações Principais */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Descrição</h4>
              <p className="text-sm">{service.description || "Sem descrição"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Preço
                </h4>
                <p className="text-lg font-semibold">{formatCurrency(service.price)}</p>
              </div>

              {service.duration && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="size-4" />
                    Duração
                  </h4>
                  <p className="text-sm">{service.duration}</p>
                </div>
              )}
            </div>

            {(service.createdAt || service.updatedAt) && (
              <>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  {service.createdAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="size-3" />
                      <span>Criado em: {service.createdAt}</span>
                    </div>
                  )}
                  {service.updatedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="size-3" />
                      <span>Atualizado em: {service.updatedAt}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
