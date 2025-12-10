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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import { useState } from "react"

const checkCodeSchema = z.object({
  code: z.string().length(6, "O código deve ter 6 dígitos"),
})

type CheckCodeFormValues = z.infer<typeof checkCodeSchema>

export function CheckCodeForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isResending, setIsResending] = useState(false)

  const form = useForm<CheckCodeFormValues>({
    resolver: zodResolver(checkCodeSchema),
    defaultValues: {
      code: "",
    },
  })

  function onSubmit(values: CheckCodeFormValues) {
    toast.success("Código verificado!", {
      description: "Sua conta foi verificada com sucesso.",
    })
    console.log(values)
  }

  function handleResend() {
    setIsResending(true)
    toast.success("Código reenviado!", {
      description: "Um novo código foi enviado para seu email.",
    })
    setTimeout(() => setIsResending(false), 3000)
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
          <h1 className="text-2xl font-bold">Verificação de código</h1>
          <p className="text-muted-foreground text-sm">
            Insira o código de 6 dígitos enviado para seu email
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Código de verificação</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Verificar código
          </Button>
        </div>

        <div className="text-center text-sm">
          Não recebeu o código?{" "}
          <button 
            type="button" 
            className="underline underline-offset-4 disabled:opacity-50"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? "Reenviando..." : "Reenviar"}
          </button>
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
