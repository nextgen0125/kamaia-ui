"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Scale,
  Users,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import CompanyDashboardKPIs from "@/components/dasboard/company-dashboard-kpis"
import CardCompanyDashboardRecentCases from "@/components/dasboard/card-company-dashboard-recent-cases"
import CardCompanyProcessesByArea from "@/components/dasboard/card-company-processes-by-area"
import CardCompanyUpcomingDeadlines from "@/components/dasboard/card-company-upcoming-deadlines"
import CardCompanyRecentActivities from "@/components/dasboard/card-company-recent-activities"

export default function DashboardPage() {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu escritório jurídico
        </p>
      </div>

      {/* Main Stats */}
      <CompanyDashboardKPIs />

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Cases */}
        <CardCompanyDashboardRecentCases />

        {/* Cases by Area */}
        <CardCompanyProcessesByArea />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Upcoming Deadlines */}
        <CardCompanyUpcomingDeadlines />

        {/* Recent Activities */}
        <CardCompanyRecentActivities />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/cases">
                <Scale className="size-6" />
                <div className="text-center">
                  <p className="font-semibold">Processos</p>
                  <p className="text-xs text-muted-foreground">Gerenciar casos</p>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/clients">
                <Users className="size-6" />
                <div className="text-center">
                  <p className="font-semibold">Clientes</p>
                  <p className="text-xs text-muted-foreground">Gerenciar clientes</p>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/finance">
                <DollarSign className="size-6" />
                <div className="text-center">
                  <p className="font-semibold">Financeiro</p>
                  <p className="text-xs text-muted-foreground">Controle financeiro</p>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/document">
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
    </div>
  )
}
