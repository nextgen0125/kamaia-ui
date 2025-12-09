"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    Row,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {
    AlertCircle,
    Archive,
    CalendarIcon,
    CheckCheck,
    ChevronDownIcon,
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    CircleDashedIcon,
    CircleXIcon,
    Columns3Icon,
    EllipsisIcon,
    Eye,
    FilterIcon,
    ListFilterIcon,
} from "lucide-react"

import { ServiceType } from "@/@types"
import { useId, useMemo, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { RangeCalendar } from "@/components/ui/calendar-rac"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

//
// ---------- HELPERS ---------
//
function isRangeObject(v: unknown): v is { start?: unknown; end?: unknown } {
    return !!v && typeof v === "object" && ("start" in (v as any) || "end" in (v as any))
}

function toJsDate(value: unknown): Date | null {
    if (!value) return null
    if (value instanceof Date) return value
    if (typeof value === "string" || typeof value === "number") {
        const d = new Date(value)
        return isNaN(d.getTime()) ? null : d
    }
    try {
        const s = (value as any).toString?.()
        if (typeof s === "string") {
            const d = new Date(s)
            if (!isNaN(d.getTime())) return d
        }
    } catch { }
    return null
}

function formatRangeLabel(range: unknown) {
    if (!range) return "Selecionar período"
    if (Array.isArray(range)) {
        const start = toJsDate(range[0])
        const end = toJsDate(range[1])
        if (start && end) return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
        if (start) return start.toLocaleDateString()
        return "Selecionar período"
    }
    if (isRangeObject(range)) {
        const start = toJsDate((range as any).start)
        const end = toJsDate((range as any).end)
        if (start && end) return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
        if (start) return start.toLocaleDateString()
        return "Selecionar período"
    }
    return "Selecionar período"
}

//
// ---------- FILTERS ---------
//
const globalFilterFn: FilterFn<ServiceType> = (row, _, filterValue) => {
    const searchContent = `${row.original.client} ${row.original.subject} ${row.original.process}`.toLowerCase()
    return searchContent.includes((filterValue ?? "").toLowerCase())
}

const tagFilterFn: FilterFn<ServiceType> = (row, columnId, filterValue: string[]) => {
    if (!filterValue?.length) return true
    const tags = row.getValue(columnId) as string[]
    return filterValue.every((tag) => tags.includes(tag))
}

const dateRangeFilterFn: FilterFn<ServiceType> = (row, columnId, filterValue: unknown) => {
    if (!filterValue) return true

    let rawStart: unknown
    let rawEnd: unknown

    if (Array.isArray(filterValue)) {
        rawStart = filterValue[0]
        rawEnd = filterValue[1]
    } else if (isRangeObject(filterValue)) {
        rawStart = (filterValue as any).start
        rawEnd = (filterValue as any).end
    } else {
        return true
    }

    const start = toJsDate(rawStart)
    const end = toJsDate(rawEnd)
    const rowDate = toJsDate(row.getValue(columnId))

    if (!rowDate) return false
    if (start && rowDate < start) return false
    if (end) {
        const endOfDay = new Date(end)
        endOfDay.setHours(23, 59, 59, 999)
        if (rowDate > endOfDay) return false
    }
    return true
}

//
// ---------- COLUMNS ---------
//
const columns: ColumnDef<ServiceType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 28,
    },
    {
        header: "Cliente",
        accessorKey: "client",
        cell: ({ row }) => <div className="flex flex-col gap-1">
            <h4 className="font-bold">{row.getValue("client")}</h4>
        </div>,
        size: 180,
        filterFn: globalFilterFn,
    },
    { header: "Assunto", accessorKey: "subject", size: 220 },
    { header: "Processo", accessorKey: "process", size: 180 },
    {
        header: "Etiquetas",
        accessorKey: "tags",
        cell: ({ row }) => {
            const tagsType = {
                review: "bg-blue-300 text-blue-900",
                archived: "bg-gray-300 text-gray-900",
                approved: "bg-green-300 text-green-900",
                urgent: "bg-red-300 text-red-900",
                pending: "bg-orange-300 text-orange-900",
            }

            return (
                <div className="flex flex-wrap gap-1">
                    {row.original.tags.map((tag) => (
                        <Badge key={tag} className={tagsType[tag]}>
                            <TagsIcon type={tag} />
                            {tag}</Badge>
                    ))}
                </div>
            )
        },
        filterFn: tagFilterFn,
        size: 160,
    },
    {
        header: "Registro recente",
        accessorKey: "recentRegister",
        cell: ({ row }) => {
            const date = new Date(row.getValue("recentRegister"))
            return new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }).format(date)
        },
        filterFn: dateRangeFilterFn,
        size: 140,
    },
    {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => <RowActions row={row} />,
        enableHiding: false,
        size: 60,
    },
]

//
// ---------- COMPONENT ---------
//
export default function ServiceDataTable({ data }: { data: ServiceType[] }) {
    const id = useId()
    const inputRef = useRef<HTMLInputElement>(null)

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnFilters, columnVisibility, pagination },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const uniqueTags = useMemo(() => {
        const tags = new Set<string>()
        data.forEach((item) => item.tags.forEach((t) => tags.add(t)))
        return Array.from(tags).sort()
    }, [data])

    const selectedTags = (table.getColumn("tags")?.getFilterValue() as string[]) ?? []
    const dateRange = table.getColumn("recentRegister")?.getFilterValue()

    const toggleTagFilter = (tag: string, checked: boolean) => {
        const current = selectedTags ? [...selectedTags] : []
        if (checked) current.push(tag)
        else current.splice(current.indexOf(tag), 1)
        table.getColumn("tags")?.setFilterValue(current.length ? current : undefined)
    }

    return (
        <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-3">
                {/* Busca global */}
                <div className="relative">
                    <Input
                        id={`${id}-search`}
                        ref={inputRef}
                        type="search"
                        value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
                        onChange={(e) => table.getColumn("client")?.setFilterValue(e.target.value)}
                        className="peer min-w-60 ps-9"
                        placeholder="Buscar por cliente, assunto ou processo..."
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center ps-3 text-muted-foreground/70">
                        <ListFilterIcon size={16} />
                    </div>
                    {Boolean(table.getColumn("client")?.getFilterValue()) && (
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-3"
                            onClick={() => {
                                table.getColumn("client")?.setFilterValue("")
                                inputRef.current?.focus()
                            }}
                        >
                            <CircleXIcon size={16} />
                        </button>
                    )}
                </div>
                <ButtonGroup>

                    {/* Filtro por tags */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <FilterIcon size={16} className="mr-2 opacity-60" />
                                Tags
                                {selectedTags.length > 0 && (
                                    <span className="ml-2 rounded border px-1 text-xs">
                                        {selectedTags.length}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-3">
                            <div className="space-y-2">
                                {uniqueTags.map((tag, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`${id}-tag-${i}`}
                                            checked={selectedTags.includes(tag)}
                                            onCheckedChange={(checked) => toggleTagFilter(tag, !!checked)}
                                        />
                                        <Label htmlFor={`${id}-tag-${i}`}>{tag}</Label>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Filtro por range de data */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <CalendarIcon size={16} className="mr-2 opacity-60" />
                                {formatRangeLabel(dateRange)}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-3 w-auto">
                            <RangeCalendar
                                className="rounded-md p-2"
                                value={dateRange as any ?? null}
                                onChange={(range) =>
                                    table.getColumn("recentRegister")?.setFilterValue(range ?? undefined)
                                }
                            />
                            <div className="mt-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        table.getColumn("recentRegister")?.setFilterValue(undefined)
                                    }
                                >
                                    Limpar
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Toggle colunas */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Columns3Icon size={16} className="mr-2 opacity-60" />
                                Colunas
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Mostrar/Ocultar</DropdownMenuLabel>
                            {table
                                .getAllColumns()
                                .filter((c) => c.getCanHide())
                                .map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.id}
                                        checked={col.getIsVisible()}
                                        onCheckedChange={(value) => col.toggleVisibility(!!value)}
                                    >
                                        {col.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ButtonGroup>
            </div>

            {/* 📊 Tabela */}
            <div className="overflow-hidden">
                <Table className="table-fixed">
                    <TableHeader className="bg-secondary">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id} className="bg-secondary">
                                {hg.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        style={{ width: header.getSize() }}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className={cn(header.column.getCanSort() && "cursor-pointer select-none")}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: <ChevronUpIcon size={16} className="inline opacity-60" />,
                                            desc: <ChevronDownIcon size={16} className="inline opacity-60" />,
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center h-24">
                                    Nenhum resultado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-8">
                {/* Results per page */}
                <div className="flex items-center gap-3">
                    <Label htmlFor={id} className="max-sm:sr-only">
                        Rows per page
                    </Label>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                            <SelectValue placeholder="Select number of results" />
                        </SelectTrigger>
                        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                            {[5, 10, 25, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* Page number information */}
                <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                    <p
                        className="text-muted-foreground text-sm whitespace-nowrap"
                        aria-live="polite"
                    >
                        <span className="text-foreground">
                            {table.getState().pagination.pageIndex *
                                table.getState().pagination.pageSize +
                                1}
                            -
                            {Math.min(
                                Math.max(
                                    table.getState().pagination.pageIndex *
                                    table.getState().pagination.pageSize +
                                    table.getState().pagination.pageSize,
                                    0
                                ),
                                table.getRowCount()
                            )}
                        </span>{" "}
                        of{" "}
                        <span className="text-foreground">
                            {table.getRowCount().toString()}
                        </span>
                    </p>
                </div>
                {/* Pagination buttons */}
                <div>
                    <Pagination>
                        <PaginationContent>
                            {/* First page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={() => table.firstPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Go to first page"
                                >
                                    <ChevronFirstIcon size={16} aria-hidden="true" />
                                </Button>
                            </PaginationItem>
                            {/* Previous page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Go to previous page"
                                >
                                    <ChevronLeftIcon size={16} aria-hidden="true" />
                                </Button>
                            </PaginationItem>
                            {/* Next page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Go to next page"
                                >
                                    <ChevronRightIcon size={16} aria-hidden="true" />
                                </Button>
                            </PaginationItem>
                            {/* Last page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={() => table.lastPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Go to last page"
                                >
                                    <ChevronLastIcon size={16} aria-hidden="true" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

//
// ---------- ROW ACTIONS ---------
//
function RowActions({ row }: { row: Row<ServiceType> }) {
    return (
        <div className="flex justify-end">
            <Button size="icon" variant="ghost">
                <EllipsisIcon size={16} />
            </Button>
        </div>
    )
}

type TagsType = "review" |
    "archived" |
    "approved" |
    "urgent" |
    "pending"

function TagsIcon({ type }: {
    type: TagsType
}) {
    switch (type) {
        case "urgent":
            return <AlertCircle />

        case "archived":
            return <Archive />

        case "pending":
            return <CircleDashedIcon />

        case "review":
            return <Eye />


        default:
            return <CheckCheck />

    }
}