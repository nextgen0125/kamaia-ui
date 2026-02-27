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
import { useAuthOperations, useLogin } from "@/hooks/queries/use-auth"
import { useEffect } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useLanguage()
   const { 
    isLoading, 
    error, 
    isError, 
    profile, 
    isAuthenticated,
    clearError,
    user
  } = useAuthOperations();

  const loginMutation = useLogin();
  
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

  const onSubmit = async (credentials: LoginFormValues) => {
      try {
        // Limpar erros anteriores do contexto
        if (clearError) {
          clearError();
        }

        // Executar a mutação de login
        await loginMutation.mutateAsync(credentials);

      } catch (error: any) {
        // Log do erro para debug
        console.error('Erro no processo de login na LoginPage:', error);

        
        
        // Tratamento adicional de erros específicos apenas para casos especiais
        if (error?.status === 403) {
          toast("Acesso negado!", {
            description: (
              <pre className="mt-2 rounded-md bg-slate-950 p-4 text-white">
                Sua conta não tem permissão para acessar este sistema.
              </pre>
            ),
          })
        } else if (error?.status >= 500) {
          toast("Erro do servidor!", {
            description: (
              <pre className="mt-2 rounded-md bg-slate-950 p-4 text-white">
                Nossos servidores estão temporariamente indisponíveis. Tente novamente em alguns minutos.
              </pre>
            ),
          })
        }
        
        // NÃO re-throw o erro - deixar o LoginForm tratar
        // O LoginForm já trata todos os erros adequadamente
        return;
      }

    // // Mostra os dados no Sonner
   
  }

  // Efeito para monitorar erros do contexto de autenticação
  useEffect(() => {
    if (error && typeof error === 'string') {
      console.log('Erro do AuthContext detectado:', error);
      // O erro já está sendo tratado pelo LoginForm através do estado do contexto
      // Não precisamos fazer nada aqui para evitar duplicação
    }
  }, [error]);

  // Efeito para redirecionamento após login bem-sucedido
  useEffect(() => {
    if (isAuthenticated && profile?.data) {
      const timer = setTimeout(() => {
        if (isEnterprising()) {
          router.push('/dashboard');
        } else if (isSuperAdmin()) {
          router.push('/admin/dashboard');
        } else if (isEmployee()) {
          const businessSlug = user?.businessAccess?.[0]?.business?.slug;
          
          if (businessSlug) {
            // Força o slug como string e remove caracteres especiais
            const cleanSlug = String(businessSlug).replace(/[^a-zA-Z0-9-]/g, '');
            const targetUrl = `/business/${cleanSlug}/dashboard`;

            // Múltiplas tentativas de redirecionamento
            try {
              // Método 1: Router push com shallow
              router.push(targetUrl, undefined);
            } catch (error) {
              try {
                // Método 2: Window location
                window.location.href = targetUrl;
              } catch (windowError) {
                // Método 3: Router replace
                router.replace(targetUrl);
              }
            }
          } else {
            console.error('Business slug not found, redirecting to home');
            router.push('/');
          }
        } else {
          console.log('No role matched, staying on current page');
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, profile?.data, user]);

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
