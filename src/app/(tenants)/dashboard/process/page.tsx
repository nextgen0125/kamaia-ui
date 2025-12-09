import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Boxes, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Process {
    id: string;
    origin: string;
    description: string;
    process: string;
    client: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

type Processes = Process[]

export default function Page() {
    const processes: Processes = []
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h2 className="text-3xl font-bold">Processos</h2>
            <div className="flex flex-row gap-2 items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <Button variant={'outline'}>Data <ChevronDown /></Button>
                    <Button variant={'outline'}>Client <ChevronDown /></Button>
                    <Button variant={'outline'}>Tags <ChevronDown /></Button>
                    <Button variant={'destructive'}>Reiniciar Filtro</Button>
                </div>
                <Link href={'/dashboard/process/add'}>
                    <Button>Adicionar Processo</Button>
                </Link>
            </div>
            {
                processes.length > 0 ? <div>Temos Processos</div> : <EmptySection />
            }
        </div>
    )
}

function EmptySection() {
    return <Empty className="flex-1">
        <EmptyContent>
            <EmptyMedia><Boxes /></EmptyMedia>
            <EmptyTitle>Nao tem nunhum Processo</EmptyTitle>
            <EmptyDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo minima, eaque maxime tempore ipsam nulla quasi</EmptyDescription>
        </EmptyContent>
    </Empty>
}