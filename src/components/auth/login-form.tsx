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
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

 

export function LoginForm({
  className,
  onSubmit: _onSubmit,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useLanguage()
  const [submitError, setSubmitError] = useState<string>('');
  const router = useRouter();

  const {
    isLoading,
    isError,
    profile,
    isAuthenticated,
    clearError,
    user,
    isSuperAdmin,
    isCostumer
  } = useAuthOperations();

  const { error: contextError } = useAuth();
  const loginMutation = useLogin();

   const loginSchema = z.object({
  email: z.string().email(t("validation.email.invalid")),
  password: z.string()
    .min(1, t("validation.password.mandatory"))
    .max(50, t("validation.password.max")),
})

type LoginFormValues = z.infer<typeof loginSchema>

  // Schema estável — criado fora do componente
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // const onSubmit = async (credentials: LoginFormValues) => {
  //   // Log para confirmar que os valores chegam corretamente
  //   console.log(credentials)
  //   clearError?.()
  //   setSubmitError('')

  //   try {
  //     await loginMutation.mutateAsync(credentials);
  //   } catch (error: any) {
  //     console.error('Erro no processo de login:', error);
  //     handleLoginError(error);
  //   }
  // }

  const onSubmit = async (_: LoginFormValues) => {
    const credentials = form.getValues()
    // console.log("credentials form", credentials)

    clearError?.()
    setSubmitError('')

    try {
      await loginMutation.mutateAsync(credentials);
    } catch (error: any) {
      console.error('Erro no processo de login:', error);
      handleLoginError(error);
    }
  }

  // Extraído para função separada — mais legível
  const handleLoginError = (error: any) => {
    const status = error?.status

    if (status === 401) {
      const msg = 'Email ou senha incorretos'
      form.setError('email', { type: 'manual', message: msg });
      form.setError('password', { type: 'manual', message: msg });
      setSubmitError('Credenciais inválidas. Verifique seu email e senha.');
      toast.error('Credenciais inválidas. Verifique seu email e senha.');
    } else if (status === 403) {
      toast("Acesso negado!", {
        description: "Sua conta não tem permissão para acessar este sistema.",
      })
    } else if (status === 429) {
      setSubmitError('Muitas tentativas de login. Tente novamente em alguns minutos.');
      toast.error('Muitas tentativas de login. Tente novamente em alguns minutos.');
    } else if (status >= 500) {
      toast("Erro do servidor!", {
        description: "Nossos servidores estão temporariamente indisponíveis.",
      })
    } else if (!status || status === 0) {
      setSubmitError('Erro de conexão. Verifique sua internet e tente novamente.');
      toast.error('Erro de conexão. Verifique sua internet e tente novamente.');
    } else if (error?.errors && typeof error.errors === 'object') {
      Object.entries(error.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          form.setError(field as keyof LoginFormValues, {
            type: 'manual',
            message: messages[0],
          });
        }
      });
      setSubmitError('Dados inválidos. Verifique os campos destacados.');
      toast.error('Dados inválidos. Verifique os campos destacados.');
    } else {
      const msg = error?.message || 'Erro interno do servidor. Tente novamente.';
      setSubmitError(msg);
      toast.error(msg);
    }
  }

  // useCallback para estabilizar a referência do setError
  const handleContextError = useCallback(() => {
    if (!contextError) return

    setSubmitError(contextError);
    form.setError('email', { type: 'manual', message: 'Verifique suas credenciais' });
    form.setError('password', { type: 'manual', message: 'Verifique suas credenciais' });
    toast.error(contextError);
  }, [contextError])

  useEffect(() => {
    handleContextError()
  }, [handleContextError])

  // Redirecionamento simplificado e correto
  useEffect(() => {
    if (!isAuthenticated || !profile?.data) return

    const timer = setTimeout(() => {
      if (isSuperAdmin()) {
        router.push('/k_admin/dashboard');
        return
      }

      if (isCostumer()) {
        const companyId = user?.company_acls?.[0]?.company_id
        if (companyId) {
          router.push(`/customers/${companyId}/dashboard`);
        } else {
          console.error('Company ID not found');
          router.push('/');
        }
        return
      }

      const companyId = user?.company_acls?.[0]?.company_id
      if (companyId) {
        router.push(`/${companyId}/dashboard`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, profile?.data, user]);

    // Se já estiver autenticado, mostrar loading
  if (isAuthenticated && !isError) {
      return (
        <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="text-center">
            <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
            <p className="text-text-secondary">Redirecionando Usuário...</p>
            </div>
        </div>
      );
  }


  const isFormLoading = isLoading || form.formState.isSubmitting;
  const displayError = submitError || contextError;


  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
        >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("auth.login.title")}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t("auth.login.subtitle")}
          </p>
        </div>
        <div className="grid gap-6">
          {/* Erro geral do formulário */}
          {displayError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{displayError}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              disabled={isFormLoading}
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
              disabled={isFormLoading}
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
          <Button type="submit" disabled={isFormLoading} className="w-full cursor-pointer">
            {isFormLoading ? (
                <div className="loading-spinner"></div>
            ) : (
              t("auth.login.submit")
            )}
            
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
