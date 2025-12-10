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
import { InputPassword } from "@/components/ui/input-password"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { ShieldCheck, ArrowLeft } from "lucide-react"

const resetPasswordSchema = z
  .object({
    password: z.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .max(50, "A senha deve ter no máximo 50 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: ResetPasswordFormValues) {
    toast.success("Senha redefinida com sucesso!", {
      description: "Você já pode fazer login com sua nova senha.",
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
            <ShieldCheck className="size-6" />
          </div>
          <h1 className="text-2xl font-bold">Redefinir senha</h1>
          <p className="text-muted-foreground text-sm">
            Escolha uma nova senha forte para sua conta
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <InputPassword
                    variant="kamaia"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <InputPassword
                    variant="kamaia"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Redefinir senha
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
