"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const schema = z.object({
    firstResgister: z.string({
        error: "Este Campo e obrigatorio"
    }).min(2),
    tag: z.string().min(2).optional(),
    process: z.string({
        error: "Este Campo e obrigatorio"
    }).min(2),
    subject: z.string({
        error: "Este Campo e obrigatorio"
    }).min(2),
    client: z.string({
        error: "Este Campo e obrigatorio"
    }).min(2),
})

type FormSchema = z.infer<typeof schema>

export default function AddService() {
    const router = useRouter()
    const form = useForm<FormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
        }
    })

    const [showTag, setShowTag] = useState<boolean>(false)
    function formHandler(value: FormSchema) {
        toast("Envio do formulario", {
            description: <pre>{JSON.stringify(value, null, 2)}</pre>
        })
    }

    return (
        <div className="flex-1 pt-10 flex flex-col gap-1 justify-center items-center">
            <div className="space-y-6">
                <div className="flex flex-row items-center gap-2 justify-between">
                    <Button variant={'ghost'} className="px-0" onClick={() => router.back()}>
                        <ChevronLeft />
                    </Button>
                    <h4 className="text-xl font-bold">Adicionar novo Atendimento</h4>
                </div>
                <Form {...form}>
                    <form>
                        <div className="w-full flex flex-col gap-5 min-w-xl">
                            <FormField
                                control={form.control}
                                name="client"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Cliente <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} variant={'kamaia'} className="flex-1" placeholder="Digite a o nome do cliente" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Assunto <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} variant={"kamaia"} className="flex-1" placeholder="Digite o titulo do seu atendimento" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <div className="flex-1 flex flex-row items-end gap-5">
                                <FormField
                                    control={form.control}
                                    name="process"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>Cliente <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} variant={'kamaia'} placeholder="Digite a descricao do projecto" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />

                                {
                                    showTag ? <FormField
                                        control={form.control}
                                        name="tag"
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Etiqueta</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} variant={'kamaia'} placeholder="Digite a etiqueta do projecto" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}
                                    />

                                        : <Button variant={'ghost'} onClick={() => setShowTag(true)}>
                                            <Plus /> Adicionar Tag
                                        </Button>
                                }

                            </div>
                            <FormField
                                control={form.control}
                                name="firstResgister"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex-1">
                                            <FormLabel>1º Registro do Atendimento <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Textarea rows={6}{...field} className="bg-secondary dark:bg-secondary  rounded-md w-full" placeholder="Adicione as anotaçoes recentes aos atendimentos" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <div className="flex flex-row items-center justify-end gap-3">

                                <Button variant={'secondary'} type="button" onClick={() => router.back()}>
                                    Cancelar
                                </Button>
                                <Button type="button" onClick={form.handleSubmit(formHandler)}>
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
