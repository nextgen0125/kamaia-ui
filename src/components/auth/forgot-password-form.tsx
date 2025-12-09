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

const forgotSchema = z.object({
    email: z.string().email("Please enter a valid email."),
})

type ForgotFormValues = z.infer<typeof forgotSchema>

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const form = useForm<ForgotFormValues>({
        resolver: zodResolver(forgotSchema),
        defaultValues: { email: "" },
    })

    function onSubmit(values: ForgotFormValues) {
        toast("Reset link sent!", {
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
                    <h1 className="text-2xl font-bold">Forgot password?</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your email and we will send you a reset link.
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input variant="kamaia" placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Send reset link
                </Button>

                <div className="text-center text-sm">
                    <Link href="/login" className="underline underline-offset-4">
                        Back to login
                    </Link>
                </div>
            </form>
        </Form>
    )
}
