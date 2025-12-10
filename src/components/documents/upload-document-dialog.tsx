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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Upload, Save, FileUp } from "lucide-react"

const documentSchema = z.object({
  folder: z.string().min(1, "Selecione uma pasta"),
  tags: z.string().optional(),
  caseId: z.string().optional(),
})

type DocumentFormValues = z.infer<typeof documentSchema>

interface UploadDocumentDialogProps {
  onSuccess?: () => void
}

export function UploadDocumentDialog({ onSuccess }: UploadDocumentDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      folder: "",
      tags: "",
      caseId: "",
    },
  })

  function onSubmit(values: DocumentFormValues) {
    console.log(values)
    toast.success("Documento enviado com sucesso!")
    setOpen(false)
    form.reset()
    onSuccess?.()
  }

  const folders = ["Processos", "Contratos", "Clientes", "Modelos"]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 size-4" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Enviar Documento</DialogTitle>
          <DialogDescription>
            Faça upload de documentos para a biblioteca
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-violet-500 transition-colors cursor-pointer">
              <FileUp className="size-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm font-medium mb-1">Clique para selecionar ou arraste arquivos</p>
              <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (máx. 10MB)</p>
            </div>

            <FormField
              control={form.control}
              name="folder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pasta *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a pasta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem key={folder} value={folder}>
                          {folder}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Separadas por vírgula" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vincular a Processo (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um processo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">0001234-56.2024.8.26.0100</SelectItem>
                      <SelectItem value="2">0002345-67.2024.8.26.0000</SelectItem>
                    </SelectContent>
                  </Select>
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
                Enviar Documento
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
