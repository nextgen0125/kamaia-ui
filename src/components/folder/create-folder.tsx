"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Item, ItemContent } from "../ui/item";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const schema = z.object({
    name: z.string().min(3).max(20),
    color: z.enum([
        "purple",
        "red",
        "blue",
        "yellow",
        "green",
        "pink"])
})

type FormProps = z.infer<typeof schema>

export default function CreateFolderButton() {
    const form = useForm<FormProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            color: "purple",
            name: "Nova Pasta"
        }
    })

    function formHandler(data: FormProps) {
        toast("Criar pasta", {
            description: <pre>{JSON.stringify(data, null, 2)}</pre>
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><FolderPlus />Nova Pasta</Button>

            </DialogTrigger>
            <DialogOverlay className="fixed inset-0 backdrop-blur-sm" />
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>Criar uma Nova Pasta</DialogTitle>
                    <DialogDescription>
                        Crie uma nova pasta para organizar os seus documentos.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Nome da Pasta</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Nome da pasta" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="w-full flex-1">
                                            <FormLabel>Cor da Pasta</FormLabel>
                                            <Select>
                                                <SelectTrigger>
                                                    <FormControl>
                                                        <SelectValue defaultValue={field.value} onVolumeChange={field.onChange} {...field} placeholder="cor da pasta" className="w-full" />
                                                    </FormControl>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="purple">
                                                        <Item className="p-0">
                                                            <ItemContent className="flex flex-row items-cecnter gap-2">
                                                                <div className="w-5 h-5 rounded bg-purple-400" />
                                                                <p>Roxo</p>
                                                            </ItemContent>
                                                        </Item>
                                                    </SelectItem>
                                                    <SelectItem value="red"><Item className="p-0">
                                                        <ItemContent className="flex flex-row items-cecnter gap-2">
                                                            <div className="w-5 h-5 rounded bg-red-400" />
                                                            <p>Vermelho</p>
                                                        </ItemContent>
                                                    </Item></SelectItem>
                                                    <SelectItem value="green"><Item className="p-0">
                                                        <ItemContent className="flex flex-row items-cecnter gap-2">
                                                            <div className="w-5 h-5 rounded bg-green-400" />
                                                            <p>Verde</p>
                                                        </ItemContent>
                                                    </Item></SelectItem>
                                                    <SelectItem value="yellow"><Item className="p-0">
                                                        <ItemContent className="flex flex-row items-cecnter gap-2">
                                                            <div className="w-5 h-5 rounded bg-yellow-400" />
                                                            <p>Amarelo</p>
                                                        </ItemContent>
                                                    </Item></SelectItem>
                                                    <SelectItem value="blue"><Item className="p-0">
                                                        <ItemContent className="flex flex-row items-cecnter gap-2">
                                                            <div className="w-5 h-5 rounded bg-blue-400" />
                                                            <p>Azul</p>
                                                        </ItemContent>
                                                    </Item></SelectItem>
                                                    <SelectItem value="pink"><Item className="p-0">
                                                        <ItemContent className="flex flex-row items-cecnter gap-2">
                                                            <div className="w-5 h-5 rounded bg-pink-400" />
                                                            <p>Rosa</p>
                                                        </ItemContent>
                                                    </Item></SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" onClick={form.handleSubmit(formHandler)}>Criar Pasta</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
