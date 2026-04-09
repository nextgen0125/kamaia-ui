"use client"
import { Button } from "@/components/ui/button";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadItemProgress,
    FileUploadList,
    FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";



const schema = z.object({
    origin: z.string(),
    description: z.string({
        error: "Este Campo e obrigatorio"
    }).min(2),
    process: z.string().optional(),
    responsable: z.string().optional(),
    client: z.string({
        error: "Este Campo e obrigatorio"
    }).min(2),
    files: z
        .array(z.custom<File>())
        .min(1, "Please select at least one file")
        .max(5, "Please select up to 5 files")
        .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
            message: "File size must be less than 5MB",
            path: ["files"],
        }),
})

export type FormSchema = z.infer<typeof schema>

export function AddDocumentForm() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            origin: "randomUUID",
            files: [],
        }
    })

    const formHandler = (data: FormSchema) => {
        toast("Submitted values:", {
            description: (
                <pre className="mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground">
                    <code>
                        {JSON.stringify({
                            ...data,
                            files: { length: data.files.length },
                            fileNames: data.files.map((file) =>
                                file.name.length > 25
                                    ? `${file.name.slice(0, 25)}...`
                                    : file.name,
                            )
                        },
                            null,
                            2,
                        )}
                    </code>
                </pre>
            ),
        });
    }


    return (
        <Sheet>
            <SheetTrigger>
                <Button>Adicionar Documento</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Adicionar documento a drive</SheetTitle>
                    <SheetDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit qui labore et</SheetDescription>
                </SheetHeader>
                <div className="flex-1 pt-10 flex flex-col gap-1 justify-center items-center">
                    <ScrollArea className="h-[calc(100vh-8rem)] w-full">
                        <div className="space-y-6 max-w-2xl px-5 pb-10">
                            <Form {...form}>
                                <form>
                                    <div className="w-full flex flex-col gap-5 min-w-xl">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Descricao <span className="text-red-500">*</span></FormLabel>
                                                        <FormControl>
                                                            <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Digite a descricao do projecto" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="process"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Processo ou Atendimento</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs flex-1" placeholder="Digite a descricao do projecto" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                        <div className="flex-1 flex flex-row items-center gap-5">
                                            <FormField
                                                control={form.control}
                                                name="client"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex-1">
                                                            <FormLabel>Cliente</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs w-full" placeholder="Digite a descricao do projecto" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="responsable"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex-1">
                                                            <FormLabel>Responsavel</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} className="bg-secondary dark:bg-secondary h-10 rounded-xs w-full" placeholder="Digite a descricao do projecto" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2 ">
                                            <FormField
                                                control={form.control}
                                                name="files"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Attachments</FormLabel>
                                                        <FormControl>
                                                            <FileUpload
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                                accept="image/*"
                                                                maxFiles={5}
                                                                maxSize={5 * 1024 * 1024}
                                                                onFileReject={(_, message) => {
                                                                    form.setError("files", {
                                                                        message,
                                                                    });
                                                                }}
                                                                multiple
                                                            >
                                                                <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center w-full">
                                                                    <CloudUpload className="size-4" />
                                                                    Drag and drop or
                                                                    <FileUploadTrigger asChild>
                                                                        <Button variant="link" size="sm" className="p-0">
                                                                            choose files
                                                                        </Button>
                                                                    </FileUploadTrigger>
                                                                    to upload
                                                                </FileUploadDropzone>

                                                                <FileUploadList orientation="horizontal">
                                                                    {field.value.map((file, index) => (
                                                                        <FileUploadItem key={index} value={file} className="p-0">
                                                                            <FileUploadItemPreview className="size-20 [&>svg]:size-12">
                                                                                <FileUploadItemProgress variant="circular" size={40} />
                                                                            </FileUploadItemPreview>
                                                                            <FileUploadItemMetadata className="sr-only" />
                                                                            <FileUploadItemDelete asChild>
                                                                                <Button
                                                                                    variant="secondary"
                                                                                    size="icon"
                                                                                    className="-top-1 -right-1 absolute size-5 rounded-full"
                                                                                >
                                                                                    <X className="size-3" />
                                                                                </Button>
                                                                            </FileUploadItemDelete>
                                                                        </FileUploadItem>
                                                                    ))}
                                                                </FileUploadList>
                                                            </FileUpload>
                                                        </FormControl>
                                                        <FormDescription>
                                                            Upload up to 5 images up to 5MB each.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex flex-row items-center justify-end gap-3">
                                            <SheetClose asChild>
                                                <Button variant={'secondary'} type="button" onClick={() => form.reset({})}>
                                                    Cancelar
                                                </Button>
                                            </SheetClose>
                                            <Button type="button" onClick={form.handleSubmit(formHandler)}>
                                                Salvar
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    )
}
