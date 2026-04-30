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
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap">
        <TabsTrigger
          value="timeline"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 pt-2 whitespace-nowrap"
        >
          Timeline
        </TabsTrigger>
        <TabsTrigger
          value="documents"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 pt-2 whitespace-nowrap"
        >
          Documentos
        </TabsTrigger>
        <TabsTrigger
          value="tasks"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 pt-2 whitespace-nowrap"
        >
          Tarefas
        </TabsTrigger>
        <TabsTrigger
          value="notes"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 pt-2 whitespace-nowrap"
        >
          Anotações
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="timeline" className="m-0 focus-visible:outline-none focus-visible:ring-0">
        <CaseTimelineTab companyId={companyId} caseId={caseId} />
      </TabsContent>
      <TabsContent value="documents" className="m-0 focus-visible:outline-none focus-visible:ring-0">
        <CaseDocumentsTab />
      </TabsContent>
      <TabsContent value="tasks" className="m-0 focus-visible:outline-none focus-visible:ring-0">
        <CaseTasksTab />
      </TabsContent>
      <TabsContent value="notes" className="m-0 focus-visible:outline-none focus-visible:ring-0">
        <CaseNotesTab companyId={companyId} caseId={caseId} />
      </TabsContent>
    </Tabs>
  );
}
