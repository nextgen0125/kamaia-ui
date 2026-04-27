"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageSquare, Trash2, Clock } from "lucide-react";
import { useClientNotes, useCreateClientNote, useDeleteClientNote } from "@/hooks/queries/clients/use-client-notes";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ClientNotesTabProps {
  companyId: string;
  clientId: string;
}

export function ClientNotesTab({ companyId, clientId }: ClientNotesTabProps) {
  const [newNote, setNewNote] = useState("");
  const { data: notes, isLoading } = useClientNotes(companyId, clientId);
  const { mutate: createNote, isPending: isCreating } = useCreateClientNote();
  const { mutate: deleteNote } = useDeleteClientNote();

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    createNote({
      companyId,
      clientId,
      data: {
        client_id: clientId,
        content: newNote,
        title: "Observação"
      }
    }, {
      onSuccess: () => setNewNote("")
    });
  };

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Anotações e Observações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Digite uma nova anotação..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddNote} disabled={isCreating || !newNote.trim()}>
              {isCreating ? "A guardar..." : "Adicionar Anotação"}
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {notes?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma anotação encontrada para este cliente.
              </div>
            ) : (
              notes?.map((note) => (
                <div key={note.id} className="p-4 border rounded-lg bg-muted/30 group relative">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {note.company_acl?.user?.firstName || "Sistema"} {note.company_acl?.user?.lastName || ""}
                      </span>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold">
                        {note.title || "NOTA"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(note.created_at), { addSuffix: true, locale: ptBR })}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteNote({ companyId, clientId, noteId: note.id })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap text-foreground/90">{note.content}</p>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
