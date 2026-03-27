"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { toast } from "sonner"


export function DialogCreateUser () {



  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
        </Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
            <DialogDescription>
            Configure uma nova organização na plataforma
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="space-y-2">
            <Label htmlFor="name">Nome da Organização</Label>
            <Input id="name" placeholder="Ex: Silva & Associados" />
            </div>
            <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" placeholder="silva-associados" />
            </div>
            <div className="space-y-2">
            <Label htmlFor="email">Email do Responsável</Label>
            <Input id="email" type="email" placeholder="admin@exemplo.com" />
            </div>
            <div className="space-y-2">
            <Label htmlFor="plan">Plano Inicial</Label>
            <Select defaultValue="trial">
                <SelectTrigger id="plan">
                <SelectValue />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="trial">Trial (14 dias)</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
        <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button onClick={() => toast.success("Usuário criado com sucesso!")}>
            Criar Usuário
            </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
