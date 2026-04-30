import { useCaseTimeline } from "@/hooks/queries/use-process-timeline";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function CaseTimelineTab({ companyId, caseId }: { companyId: string; caseId: string }) {
  const { data, isLoading } = useCaseTimeline(companyId, caseId);

  if (isLoading) return <div className="py-8 text-center text-muted-foreground">Carregando timeline...</div>;

  const events = data?.pages.flatMap((page) => page.timeline) || [];

  if (events.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">Nenhuma atividade registrada neste processo.</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="relative border-l-2 border-muted ml-6 mt-4 space-y-8">
        {events.map((event) => (
          <div key={event.id} className="relative pl-6">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-primary">{event.type}</span>
              <h4 className="font-semibold">{event.title}</h4>
              {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {event.company_acl?.user?.first_name} {event.company_acl?.user?.last_name}
                </span>
                <span>•</span>
                <span>{format(new Date(event.created_at), "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
