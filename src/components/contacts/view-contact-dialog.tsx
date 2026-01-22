"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, User, Tag } from "lucide-react"

interface ViewContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact: {
    id: string
    name: string
    email: string
    phone: string
    type: string
    address: string
  }
}

export function ViewContactDialog({ open, onOpenChange, contact }: ViewContactDialogProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Detalhes do Contacto</DialogTitle>
          <DialogDescription>
            Informações completas do contacto
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="size-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {contact.id}</p>
            </div>
            <Badge className={getTypeColor(contact.type)} variant="secondary">
              {contact.type}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base">{contact.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Phone className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Telemóvel</p>
                <p className="text-base">{contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <MapPin className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                <p className="text-base">{contact.address}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              <Mail className="mr-2 size-4" />
              Enviar Email
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="mr-2 size-4" />
              Ligar
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
