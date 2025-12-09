"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const schema = z.object({
    title: z.string({
        error: "Este Campo e obrigatorio"
    }).nonempty(),
    tag: z.string().optional(),
    instance: z.string().optional(),
    clientQualification: z.string().optional(),
    responsable: z.string().optional(),
    envolvedQualification: z.string().optional(),
    processNumber: z.string({
        error: "Este Campo e obrigatorio"
    }).nonempty(),
    action: z.string({
        error: "Este Campo e obrigatorio"
    }).nonempty(),
    objective: z.string({
        error: "Este Campo e obrigatorio"
    }).nonempty(),
    client: z.string({
        error: "Este Campo e obrigatorio"
    }).nonempty(),
    envolved: z.string().min(3).optional(),
    sectionValue: z.number().positive().optional(),
    condenationValue: z.number().positive().optional(),
    distributedAt: z.string().date(),
    access: z.enum(['public', 'private', 'envolved'])
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
                        <div className="flex flex-col gap-5 w-[576px]">
                            <div className="flex-1 flex flex-row items-end gap-5">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>Titulo <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs w-full" placeholder="Digite a descricao do projecto" />
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
                                                        <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs w-full" placeholder="Digite a etiqueta do projecto" />
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
                            <div className="flex-1 flex flex-row items-end gap-5">
                                <FormField
                                    control={form.control}
                                    name="client"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>Cliente <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Digite a o nome do cliente" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="clientQualification"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>qualificacao do cliente <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Qualificacao" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                            <div className="flex-1 flex flex-row items-end gap-5">
                                <FormField
                                    control={form.control}
                                    name="envolved"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>Outro Envolvido <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Digite a o nome do cliente" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="envolvedQualification"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>qualificacao <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Qualificacao" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                            <div className="flex-1 flex flex-row items-end gap-5">
                                <FormField
                                    control={form.control}
                                    name="instance"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Instancia</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="bg-secondary dark:bg-secondary rounded-xs flex-1 h-11">
                                                        <FormControl>
                                                            <SelectValue onChange={field.onChange} onBlur={field.onBlur} defaultValue={field.name} />
                                                        </FormControl>
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-secondary dark:bg-secondary rounded-xs flex-1">
                                                        <SelectItem value="2">2</SelectItem>
                                                        <SelectItem value="3">3</SelectItem>
                                                        <SelectItem value="4">4</SelectItem>
                                                        <SelectItem value="5">5 </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="processNumber"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>N do Processo</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="number" className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Numero do processo" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="action"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>Accao</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Digite a Accao" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="objective"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex-1">
                                            <FormLabel>Objectivo<span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Textarea rows={6}{...field} className="bg-secondary dark:bg-secondary  rounded-md w-full" placeholder="Digite mais detalhes" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <div className="flex-1 flex flex-row items-end gap-5">
                                <FormField
                                    control={form.control}
                                    name="sectionValue"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Valor da Causa</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="number" className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Numero do processo" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="distributedAt"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Distribuido em</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="date" className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Numero do processo" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />

                                <FormField
                                    control={form.control}
                                    name="condenationValue"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>Valor da Condenacao</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="number" className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Digite o valor da condenacao" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                            <div className="flex-1 flex flex-row items-end gap-5">
                                <FormField
                                    control={form.control}
                                    name="responsable"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Valor da Causa</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Numero do processo" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="access"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Acesso</FormLabel>
                                                <FormControl>
                                                    Depois alterar
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
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
