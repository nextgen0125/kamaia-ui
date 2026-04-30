import { Card, CardContent } from "@/components/ui/card";
import { IProcess } from "@/interfaces/IProcess";
import { CalendarIcon, UserIcon, BriefcaseIcon, GavelIcon } from "lucide-react";

interface CaseProfileKPIsProps {
  caseData: IProcess;
}

export function CaseProfileKPIs({ caseData }: CaseProfileKPIsProps) {
  const formatValue = (val?: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "AOA" }).format(val || 0);
  };

  return (
    <div className="grid gap-4 md:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-full">
            <BriefcaseIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fase Atual</p>
            <p className="font-semibold">{caseData.action || "-"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full">
            <GavelIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor da Causa</p>
            <p className="font-semibold">{formatValue(caseData.case_value)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-full">
            <CalendarIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Início</p>
            <p className="font-semibold">
              {caseData.created_at ? new Date(caseData.created_at).toLocaleDateString("pt-BR") : "-"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 text-orange-500 rounded-full">
            <UserIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Instância</p>
            <p className="font-semibold">{caseData.instance || "1ª Instância"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
