"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputPassword } from "@/components/ui/input-password"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useLanguage } from "@/contexts/language-context"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useLanguage()
  
  const loginSchema = z.object({
    email: z.string().email(t("validation.email.invalid")),
    password: z.string()
      .min(6, t("validation.password.min"))
      .max(50, t("validation.password.max")),
  })

  type LoginFormValues = z.infer<typeof loginSchema>

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: LoginFormValues) {
    // Mostra os dados no Sonner
    toast("Form submitted!", {
      description: (
        <pre className="mt-2 rounded-md bg-slate-950 p-4 text-white">
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("auth.login.title")}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t("auth.login.subtitle")}
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.login.email")}</FormLabel>
                  <FormControl>
                    <Input variant={'kamaia'} placeholder={t("auth.login.email.placeholder")} type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>{t("auth.login.password")}</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      {t("auth.login.forgot")}
                    </Link>
                  </div>
                  <FormControl>
                    <InputPassword variant="kamaia" placeholder={t("auth.login.password.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="button" onClick={form.handleSubmit(onSubmit)} className="w-full">
            {t("auth.login.submit")}
          </Button>
        </div>
        <div className="text-center text-sm">
          {t("auth.login.no_account")}{" "}
          <Link href="/contact" className="underline underline-offset-4">
            {t("auth.login.contact")}
          </Link>
        </div>
      </form>
    </Form>
  )
}
