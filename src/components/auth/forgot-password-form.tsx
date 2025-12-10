"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Mail, ArrowLeft } from "lucide-react"

const forgotPasswordSchema = z.object({
  email: z.string().email("Por favor, insira um email válido."),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: ForgotPasswordFormValues) {
    toast.success("Email enviado!", {
      description: "Verifique sua caixa de entrada para redefinir sua senha.",
    })
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="size-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white mb-2">
            <Mail className="size-6" />
          </div>
          <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
          <p className="text-muted-foreground text-sm">
            Insira seu email e enviaremos um link para redefinir sua senha
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    variant="kamaia"
                    type="email"
                    placeholder="seu@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Enviar link de recuperação
          </Button>
        </div>

        <div className="text-center text-sm">
          <Link href="/login" className="inline-flex items-center gap-2 underline underline-offset-4">
            <ArrowLeft className="size-3.5" />
            Voltar para o login
          </Link>
        </div>
      </form>
    </Form>
  )
}
