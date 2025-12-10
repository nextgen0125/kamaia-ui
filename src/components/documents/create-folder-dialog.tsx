"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { FolderPlus, Save } from "lucide-react"

const folderSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
})

type FolderFormValues = z.infer<typeof folderSchema>

interface CreateFolderDialogProps {
  onSuccess?: () => void
}

export function CreateFolderDialog({ onSuccess }: CreateFolderDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<FolderFormValues>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: FolderFormValues) {
    console.log(values)
    toast.success("Pasta criada com sucesso!")
    setOpen(false)
    form.reset()
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FolderPlus className="mr-2 size-4" />
          Nova Pasta
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Pasta</DialogTitle>
          <DialogDescription>
            Crie uma nova pasta para organizar seus documentos
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Pasta *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Contratos 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="mr-2 size-4" />
                Criar Pasta
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
