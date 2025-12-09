"use client"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { FolderIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useRouter } from "next/navigation";


export interface FolderProps {
    name: string;
    numberItems: number;
    color?: "purple" | "red" | "blue" | "yellow" | "green" | "pink"
    createdAt: Date | string;
    orientation?: "grid" | "row"
    id: string;
}

const colorVariants = {
    purple: "fill-purple-400 group-hover:fill-purple-600 text-purple-400 group-hover:text-purple-600",
    red: "fill-red-400 group-hover:fill-red-600 text-red-400 group-hover:text-red-600",
    blue: "fill-blue-400 group-hover:fill-blue-600 text-blue-400 group-hover:text-blue-600",
    yellow: "fill-yellow-400 group-hover:fill-yellow-600 text-yellow-400 group-hover:text-yellow-600",
    green: "fill-green-400 group-hover:fill-green-600 text-green-400 group-hover:text-green-600",
    pink: "fill-pink-400 group-hover:fill-pink-600 text-pink-400 group-hover:text-pink-600",
};

export function FolderItem({ id, name, numberItems, color = "purple", createdAt, orientation = "grid" }: FolderProps) {
    const router = useRouter()

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Item onDoubleClick={() => {
                    router.push(`/folders/${id}`)
                }} key={id} className={`bg-muted/40 group hover:bg-muted/70  rounded-xl ${orientation === "grid" ? "min-w-64" : "w-full"}`}>
                    <ItemContent className={`flex ${orientation === "grid" ? "flex-col" : "flex-row gap-6 items-center"}`}>
                        <FolderIcon
                            className={cn(
                                colorVariants[color],
                                "cursor-default select-none",
                                orientation === "grid" ? "size-16" : "size-12"
                            )}
                        />
                        <div>
                            <ItemTitle className="font-bold cursor-default select-none">{name} </ItemTitle>
                            <ItemDescription className="cursor-default select-none">{numberItems} Arquivo{numberItems > 1 ? "s" : ""} - <span className="text-xs">{format(createdAt, "dd 'de' MMMM 'de' yyyy", {
                                locale: pt
                            })}</span></ItemDescription>
                        </div>
                    </ItemContent>
                </Item>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
                <ContextMenuItem inset>
                    Voltar
                </ContextMenuItem>
                <ContextMenuItem inset disabled>
                    Renomear Pasta
                </ContextMenuItem>
                <ContextMenuItem inset>
                    Recarregar
                </ContextMenuItem>
                <ContextMenuItem variant="destructive">Apagar</ContextMenuItem>

                <ContextMenuItem>Partilhar Pasta</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSeparator />
                <ContextMenuContent >
                    <ContextMenuLabel inset>Pessoas com acesso</ContextMenuLabel>
                    <ContextMenuItem>
                        Pedro Duarte
                    </ContextMenuItem>
                    <ContextMenuItem>Colm Tuite</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenuContent>
        </ContextMenu>
    )
}


export function FolderGroup({ orientation = "grid", className, ...props }: React.ComponentProps<"div"> & { orientation?: "grid" | "row" }) {
    return (
        <div
            role="list"
            data-slot="item-group"
            className={cn(`${orientation === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "flex flex-col"}`, "gap-4", className)}
            {...props}
        />
    )
}