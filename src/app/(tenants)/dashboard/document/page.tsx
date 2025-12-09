import { AddDocumentForm } from "@/components/dasboard/document/document-form";
import CreateFolderButton from "@/components/folder/create-folder";
import { FolderGroup, FolderItem } from "@/components/folder/folder-item";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { folders } from "@/mocks/folders";
import { Boxes, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Document {
    id: string;
    origin: string;
    description: string;
    process: string;
    client: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

type Documents = Document[]

export default function Page() {
    const documents: Documents = []
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h2 className="text-3xl font-bold">Documentos</h2>
            <div className="flex flex-row gap-2 items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <ButtonGroup>
                        <Button variant={'outline'}>Data <ChevronDown /></Button>
                        <Button variant={'outline'}>Client <ChevronDown /></Button>
                        <Button variant={'outline'}>Tags <ChevronDown /></Button>
                        <Button variant={'destructive'}>Reiniciar Filtro</Button>
                    </ButtonGroup>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <AddDocumentForm />
                    <CreateFolderButton />
                </div>
            </div>
            {
                folders.length > 0 ? <div className="mt-5">
                    <FolderGroup>
                        {
                            folders.map((value, index) => (
                                <Link key={index} href={`/dashboard/document/folder/${value.id}`}>
                                    <FolderItem {...value} key={index} />
                                </Link>
                            ))
                        }
                    </FolderGroup>
                </div> : <EmptySection />
            }
        </div>
    )
}

function EmptySection() {
    return <Empty className="flex-1">
        <EmptyContent>
            <EmptyMedia><Boxes /></EmptyMedia>
            <EmptyTitle>Nao tem nunhum documento</EmptyTitle>
            <EmptyDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo minima, eaque maxime tempore ipsam nulla quasi</EmptyDescription>
        </EmptyContent>
    </Empty>
}