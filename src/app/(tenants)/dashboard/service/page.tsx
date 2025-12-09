"use client"



import { ServiceType } from "@/@types"
import { generateServiceMocks } from "@/mocks/service-mock-generator"
import { useEffect, useState } from "react"

import ServiceDataTable from "@/components/dasboard/navbar-components/service/serivce-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Service() {
  const [data, setData] = useState<ServiceType[]>([])

  useEffect(() => {
    setData(generateServiceMocks(40))
  }, [])

  return (
    <div className="space-y-4 my-10">
      <div className="flex flex-row items-center justify-between gap-2">
        <h3 className="font-bold text-2xl">Atendimento</h3>
        <Link href={'/dashboard/service/add'}>
          <Button>
            Adicionar Atendimento
          </Button>
        </Link>
      </div>
      <ServiceDataTable data={data} />
    </div>
  )
}
