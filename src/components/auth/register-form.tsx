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
import { InputPassword } from "@/components/ui/input-password"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres."),
    email: z.string().email("Por favor, insira um email válido."),
    password: z.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .max(50, "A senha deve ter no máximo 50 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número."),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: RegisterFormValues) {
        toast("Account created!", {
            description: (
                <pre className="mt-2 rounded-md bg-slate-950 p-4 text-white">
                    {JSON.stringify(values, null, 2)}
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("flex flex-col gap-6", className)}
                {...props}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Criar uma conta</h1>
                    <p className="text-muted-foreground text-sm">
                        Preencha seus dados para se cadastrar
                    </p>
                </div>

                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome completo</FormLabel>
                                <FormControl>
                                    <Input variant="kamaia" placeholder="João Silva" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" variant="kamaia" placeholder="seu@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <InputPassword variant="kamaia" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Criar conta
                    </Button>
                </div>

                <div className="text-center text-sm">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                        Fazer login
                    </Link>
                </div>
            </form>
        </Form>
    )
}
