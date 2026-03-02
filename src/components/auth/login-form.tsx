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
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useLanguage()
  const [submitError, setSubmitError] = useState<string>('');
  const router = useRouter();

   const { 
    isLoading, 
    error, 
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
        
        
        
        // Tratamento de erros específicos
        if (error?.status === 401) {
          form.setError('email', {
            type: 'manual',
            message: 'Email ou senha incorretos',
          });
          form.setError('password', {
            type: 'manual',
            message: 'Email ou senha incorretos',
          });
          setSubmitError('Credenciais inválidas. Verifique seu email e senha.');
          toast.error('Credenciais inválidas. Verifique seu email e senha.');
        } else if (error?.status === 429) {
          setSubmitError('Muitas tentativas de login. Tente novamente em alguns minutos.');
          toast.error('Muitas tentativas de login. Tente novamente em alguns minutos.');
        } else if (error?.status === 0 || !error?.status) {
          setSubmitError('Erro de conexão. Verifique sua internet e tente novamente.');
          toast.error('Erro de conexão. Verifique sua internet e tente novamente.');
        } else if (error?.errors && typeof error.errors === 'object') {
          // Tratar erros de validação do backend
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
          const errorMessage = error?.message || 'Erro interno do servidor. Tente novamente.';
          setSubmitError(errorMessage);
          toast.error(errorMessage);
        }
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

   // Efeito para monitorar erros do contexto
  useEffect(() => {
    if (contextError) {
      console.log('Erro do contexto detectado no LoginForm:', contextError);
      setSubmitError(contextError);
      
      // Definir erros nos campos também
      form.setError('email', {
        type: 'manual',
        message: 'Verifique suas credenciais',
      });
      form.setError('password', {
        type: 'manual',
        message: 'Verifique suas credenciais',
      });
      
      // Mostrar mensagem toast
      toast.error(contextError);
    }
  }, [contextError, form.setError]);

  // Efeito para redirecionamento após login bem-sucedido
  useEffect(() => {
    if (isAuthenticated && profile?.data) {
      const timer = setTimeout(() => {
        if (isSuperAdmin()) {
          router.push('/k_admin/dashboard');
        } else if (isCostumer()) {
          const companyId = user?.company_acls?.[0]?.company_id
          
          if (companyId) {
            // Força o slug como string e remove caracteres especiais
            const cleanSlug = String(companyId);
            const targetUrl = `/customers/${cleanSlug}/dashboard`;

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
            
            console.error('Company ID not found, redirecting to home');
            router.push('/');
          }
        } else {
          const companyId = user?.costumer_infos?.[0]?.company_id
          
          if (companyId) {
            // Força o slug como string e remove caracteres especiais
            const cleanSlug = String(companyId);
            const targetUrl = `/${cleanSlug}/dashboard`;

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
            console.log('No role matched, staying on current page');
          }
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, profile?.data, user]);

  const isFormLoading = isLoading || form.formState.isSubmitting;
    // Determinar qual erro mostrar (priorizar erro local sobre contexto)
  const displayError = submitError || contextError;

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
          <Button type="button" disabled={isFormLoading} onClick={form.handleSubmit(onSubmit)} className="w-full">
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
