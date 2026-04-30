import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaseTimelineTab } from "./case-timeline-tab";
import { CaseDocumentsTab } from "./case-documents-tab";
import { CaseTasksTab } from "./case-tasks-tab";
import { CaseNotesTab } from "./case-notes-tab";

interface CaseProfileTabsProps {
  companyId: string;
  caseId: string;
}

export function CaseProfileTabs({ companyId, caseId }: CaseProfileTabsProps) {
  return (
    <Tabs defaultValue="timeline" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger
          value="timeline"
          className="cursor-pointer"
        >
          Timeline
        </TabsTrigger>
        <TabsTrigger
          value="documents"
          className="cursor-pointer"
        >
          Documentos
        </TabsTrigger>
        <TabsTrigger
          value="tasks"
          className="cursor-pointer"
        >
          Tarefas
        </TabsTrigger>
        <TabsTrigger
          value="notes"
          className="cursor-pointer"
        >
          Anotações
        </TabsTrigger>
      </TabsList>

      <TabsContent value="timeline" className="m-0 focus-visible:outline-none focus-visible:ring-0 pb-10">
        <CaseTimelineTab companyId={companyId} caseId={caseId} />
      </TabsContent>
      <TabsContent value="documents" className="m-0 focus-visible:outline-none focus-visible:ring-0 pb-10">
        <CaseDocumentsTab />
      </TabsContent>
      <TabsContent value="tasks" className="m-0 focus-visible:outline-none focus-visible:ring-0 pb-10">
        <CaseTasksTab />
      </TabsContent>
      <TabsContent value="notes" className="m-0 focus-visible:outline-none focus-visible:ring-0 pb-10">
        <CaseNotesTab companyId={companyId} caseId={caseId} />
      </TabsContent>
    </Tabs>
  );
}
