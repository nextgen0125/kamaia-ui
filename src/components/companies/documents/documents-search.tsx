"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DocumentsSearchProps {
  onSearch: (value: string) => void;
  searchValue: string;
}

export function DocumentsSearch({ onSearch, searchValue }: DocumentsSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar por nome ou tags..."
        className="pl-8"
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}
