import { CreateCaseDialog } from "./create-case-dialog";

export function CasesPageHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Processos</h1>
        <p className="text-muted-foreground">Gerencie todos os processos jurídicos</p>
      </div>
      <CreateCaseDialog />
    </div>
  );
}
