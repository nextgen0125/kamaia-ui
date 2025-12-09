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
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const resetSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters.").max(12, "O tamanho maximo sao 12 caracteres"),
    confirm: z.string().min(6, "Password must be at least 6 characters.").max(12, "O tamanho maximo sao 12 caracteres"),
}).refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
})

type ResetFormValues = z.infer<typeof resetSchema>

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const form = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: { password: "", confirm: "" },
    })

    function onSubmit(values: ResetFormValues) {
        toast("Password reset!", {
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
                    <h1 className="text-2xl font-bold">Reset your password</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter a new password below.
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                                <InputPassword variant="kamaia" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <InputPassword variant="kamaia" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Reset password
                </Button>
            </form>
        </Form>
    )
}
