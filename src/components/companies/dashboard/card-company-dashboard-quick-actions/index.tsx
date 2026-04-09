"use client"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { SkeletonList } from "@/components/ui/skeleton-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FileText, Scale, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function CardCompanyDashboardQuickActions () {

  const { isLoading, company } = useCompanyDashboardContext();

  return isLoading
    ? <SkeletonList type="stat" count={4} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" />
    : (
        <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
        </CardHeader>
            <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href={`/${company?.id}/cases`}>
                    <Scale className="size-6" />
                    <div className="text-center">
                    <p className="font-semibold">Processos</p>
                    <p className="text-xs text-muted-foreground">Gerenciar casos</p>
                    </div>
                </Link>
                </Button>

                <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href={`/${company?.id}/clients`}>
                    <Users className="size-6" />
                    <div className="text-center">
                    <p className="font-semibold">Clientes</p>
                    <p className="text-xs text-muted-foreground">Gerenciar clientes</p>
                    </div>
                </Link>
                </Button>

                <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href={`/${company?.id}/finances`}>
                    <DollarSign className="size-6" />
                    <div className="text-center">
                    <p className="font-semibold">Financeiro</p>
                    <p className="text-xs text-muted-foreground">Controle financeiro</p>
                    </div>
                </Link>
                </Button>

                <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href={`/${company?.id}/documents`}>
                    <FileText className="size-6" />
                    <div className="text-center">
                    <p className="font-semibold">Documentos</p>
                    <p className="text-xs text-muted-foreground">Biblioteca</p>
                    </div>
                </Link>
                </Button>
            </div>
            </CardContent>
      </Card>
    )
}
