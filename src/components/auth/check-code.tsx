"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const checkCodeSchema = z.object({
    code: z.string().length(6, "Code must be 6 digits."),
})

type CheckCodeValues = z.infer<typeof checkCodeSchema>

export function CheckCodeForm({ className, ...props }: React.ComponentProps<"form">) {
    const form = useForm<CheckCodeValues>({
        resolver: zodResolver(checkCodeSchema),
        defaultValues: { code: "" },
    })

    function onSubmit(values: CheckCodeValues) {
        toast("Code submitted!", {
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
                    <h1 className="text-2xl font-bold">Enter verification code</h1>
                    <p className="text-muted-foreground text-sm">
                        We&apos;ve sent a 6-digit code to your email.
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <div className="w-full flex flex-row items-center justify-center">
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>

                                        <InputOTPSeparator />
                                        <InputOTPGroup>

                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Verify
                </Button>
            </form>
        </Form>
    )
}
