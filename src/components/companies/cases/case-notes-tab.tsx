import { useState } from "react";
import { useCaseNotes, useCreateCaseNote } from "@/hooks/queries/use-case-notes";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function CaseNotesTab({ companyId, caseId }: { companyId: string; caseId: string }) {
  const { data: notes, isLoading } = useCaseNotes(companyId, caseId);
  const { mutate: createNote, isPending, error } = useCreateCaseNote();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createNote(
      { companyId, processId: caseId, data: { title, content } },
      {
        onSuccess: () => {
          setContent("");
          setTitle("");
        },
      }
    );
  };

  if (isLoading) return <div className="py-8 text-center text-muted-foreground">Carregando anotações...</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Título da anotação (Opcional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Escreva sua anotação aqui..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !content.trim()}>
            {isPending ? "Salvando..." : "Adicionar Anotação"}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {notes?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma anotação registrada ainda.
          </div>
        ) : (
          notes?.map((note) => (
            <div key={note.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {note.company_acl?.user?.first_name} {note.company_acl?.user?.last_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(note.created_at), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                  </span>
                </div>
              </div>
              {note.title && <h5 className="font-medium text-sm mb-1">{note.title}</h5>}
              <p className="text-sm whitespace-pre-wrap text-muted-foreground">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
