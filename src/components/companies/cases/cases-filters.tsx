"use client";

import { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CasesFiltersProps {
  stats: {
    total: number;
    active: number;
    pending: number;
    completed: number;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CasesFilters({ stats, searchQuery, setSearchQuery }: CasesFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <TabsList>
        <TabsTrigger value="all">Todos ({stats.total})</TabsTrigger>
        <TabsTrigger value="active">Em Andamento ({stats.active})</TabsTrigger>
        <TabsTrigger value="pending">Aguardando ({stats.pending})</TabsTrigger>
        <TabsTrigger value="completed">Concluídos ({stats.completed})</TabsTrigger>
      </TabsList>

      <div className="relative flex-1 md:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por número, título ou cliente..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
