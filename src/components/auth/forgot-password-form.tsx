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
import { useLanguage } from "@/contexts/language-context"
import { useForgotPassword } from "@/hooks/queries/use-auth"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useLanguage()
  
  const forgotPasswordSchema = z.object({
    email: z.string().email(t("validation.email.invalid")),
  })

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await forgotPasswordMutation.mutateAsync(values.email)
      form.reset();
      toast.success(t("auth.forgot.success"), {
        description: t("auth.forgot.success.description"),
      })
    } catch (error) {
      toast.error("Houve um erro durante a solicitação", {
        description: `Erro ao solicitar o link de recuperação: ${error}`,
      })
    }
  }

  const isFormLoading = forgotPasswordMutation.isPending || form.formState.isSubmitting;

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
          <h1 className="text-2xl font-bold">{t("auth.forgot.title")}</h1>
          <p className="text-muted-foreground text-sm">
            {t("auth.forgot.subtitle")}
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.forgot.email")}</FormLabel>
                <FormControl>
                  <Input
                    variant="kamaia"
                    type="email"
                    placeholder={t("auth.forgot.email.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {isFormLoading ? (
                <div className="loading-spinner"></div>
            ) : (
              t("auth.forgot.submit")
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          <Link href="/login" className="inline-flex items-center gap-2 underline underline-offset-4">
            <ArrowLeft className="size-3.5" />
            {t("auth.forgot.back")}
          </Link>
        </div>
      </form>
    </Form>
  )
}
