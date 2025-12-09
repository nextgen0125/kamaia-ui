"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Kanban from "@/components/ui/kanban";
import { MoreVertical, PlusIcon, SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import AddTaskPage from "@/components/dasboard/task/add-task-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

interface Task {
  id: string;
  type: "process" | "attendance";
  title: string;
  client: string;
  othersInvolved?: string[];
  processNumber?: string;
  assignee?: string;
  access?: "private" | "public" | "involved";
  tags?: string[];
  subject?: string;
  recentRecord?: string;
  description?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

const COLUMN_TITLES: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In Progress",
  review: "Review",
  done: "Done",
};

export default function KanbanDynamicOverlayDemo() {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>({
    backlog: [
      {
        id: "1",
        title: "Add authentication",
        type: "process",
        client: "Client A",
        othersInvolved: ["User 1", "User 2"],
        processNumber: "12345",
        assignee: "John Doe",
        access: "private",
        tags: ["backend", "auth"],
        subject: "Implement login and registration",
        priority: "high",
        description: "Create API endpoints for user authentication and registration. Ensure secure password storage and JWT token generation. Integrate with frontend login forms. Test all endpoints thoroughly.",
        recentRecord: "Last updated 2 days ago",
      },
    ],
    inProgress: [],
    review: [],
    done: [],
  });

  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({});
  const [newColumnTitle, setNewColumnTitle] = useState("");


  const handleAddTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      type: (newTask.type as "process" | "attendance") ?? "process",
      client: newTask.client ?? "Client A",
      othersInvolved: newTask.othersInvolved ?? ["User 1", "User 2"],
      processNumber: newTask.processNumber ?? "12345",
      assignee: newTask.assignee ?? "Unassigned",
      access: (newTask.access as "private" | "public" | "involved") ?? "private",
      tags: newTask.tags ?? [],
      subject: newTask.subject ?? "Implement login and registration",
      recentRecord: newTask.recentRecord ?? "Last updated 2 days ago",
    };
    setColumns((prev) => ({
      ...prev,
      backlog: [...prev.backlog, task],
    }));
    setNewTask({});
    setOpen(false);
  };

  function onValueChange(value: Partial<Task>) {
    setTimeout(() => { }, 2000)
    toast("Mudou um tarefa", {
      description: <pre>{JSON.stringify(value, null, 2)}</pre>
    })
  }

  const addColumn = () => {
    const count = Object.keys(columns).length;
    if (count >= 8) {
      toast.error("Limite máximo de 8 colunas atingido!");
      return;
    }

    const key = newColumnTitle.toLowerCase().replace(/\s+/g, "_") || `col_${count + 1}`;
    setColumns(prev => ({ ...prev, [key]: [] }));
    COLUMN_TITLES[key] = newColumnTitle || `Coluna ${count + 1}`;
    setNewColumnTitle("");
  };



  return (
    <>
      <header className="w-full mb-4 border-b bg-background px-4 py-2 flex items-start justify-between">
        <div className="w-96">
          <h2 className="text-2xl font-bold">Minhas Tarefas</h2>
          <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ab ex quae veniam aut, cum vero animi voluptatem quo ipsam</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Dialog>
            <DialogTrigger>
              <Button className="text-white rounded-full px-4" onClick={() => setOpen(true)}>
                <PlusIcon size={16} className="mr-1" />
                Adicionar coluna
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar uma nova coluna</DialogTitle>
                <DialogDescription>Cria uma novaa coluna para a tua lista de tarefas</DialogDescription>
              </DialogHeader>

              <Input
                value={newColumnTitle}
                variant={'kamaia'}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="Nome da nova coluna"
                className="border rounded px-2 py-1"
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={'secondary'}>Cancelar</Button>
                </DialogClose>
                <Button onClick={addColumn}>
                  <PlusIcon size={16} className="mr-1" /> Nova Coluna
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="text-white rounded-full px-4" onClick={() => setOpen(true)}>
            <PlusIcon size={16} className="mr-1" />
            Nova Tarefa
          </Button>
        </div>
      </header>

      <Kanban.Root value={columns} onValueChange={(value) => {
        onValueChange(value)
        setColumns(value)
      }} getItemValue={(item) => item.id}>
        <Kanban.Board className="grid auto-rows-fr h-[500px] grid-cols-4 border-none bg-background gap-4 px-4">
          {Object.entries(columns).map(([columnValue, tasks]) => (
            <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
          ))}
        </Kanban.Board>
        <Kanban.Overlay>
          {({ value, variant }) => {
            if (variant === "column") {
              const tasks = columns[value] ?? [];
              return <TaskColumn value={value} tasks={tasks} />;
            }
            const task = Object.values(columns).flat().find((task) => task.id === value);
            if (!task) return null;
            return <TaskCard task={task} />;
          }}
        </Kanban.Overlay>
      </Kanban.Root>

      {/* Sheet Add New Task */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[40%] sm:max-w-[40%]">
          <SheetHeader>
            <SheetTitle>Nova Tarefa</SheetTitle>
          </SheetHeader>
          <AddTaskPage />
          <SheetFooter>
            <Button onClick={handleAddTask}>Salvar</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface TaskCardProps extends Omit<React.ComponentProps<typeof Kanban.Item>, "value"> {
  task: Task;
}

function TaskCard({ task, ...props }: TaskCardProps) {
  return (
    <Kanban.Item key={task.id} value={task.id} asChild {...props}>
      <div className="rounded-md bg-secondary/35 border p-3 space-y-2 transition">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={`bg-${task.type === "process" ? "blue" : "rose"}-300 text-${task.type === "process" ? "blue" : "rose"}-600 text-xs`}>#{task.type}</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Arquivar</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Apagar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">{task.title}</h3>
          {task.subject && (
            <>
              <p className="text-xs text-muted-foreground line-clamp-4">{task.description}</p>
            </>
          )}
          <div>
            {task.tags && task.tags.map((tag) => (
              <Badge key={tag} className="mr-1 bg-rose-200 text-rose-800 text-xs">{tag}</Badge>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex -space-x-2">
              <Avatar className="h-6 w-6 border border-white">
                <AvatarFallback>KM</AvatarFallback>
                <AvatarImage src={"https://github.com/ruimarcosjoao.png"} />
              </Avatar>
              <Avatar className="h-6 w-6 border border-white">
                <AvatarFallback>KM</AvatarFallback>
                <AvatarImage src={"https://github.com/ruimarcosjoao.png"} />
              </Avatar>
            </div>

            <div>
              <PriorityIcon priority={task.priority} />
            </div>
          </div>
        </div>
      </div>
    </Kanban.Item>
  );
}

function PriorityIcon({ priority }: { priority: Task["priority"] }) {
  switch (priority) {
    case "low":
      return <div className="flex flex-row items-center">
        <SignalLow className="size-4 text-red-500" /> <span className="text-xs text-red-500">High</span>
      </div>;
    case "medium":
      return <div className="flex flex-row items-center">
        <SignalMedium className="size-4 text-orange-500" /> <span className="text-xs text-orange-500">Medium</span>
      </div>;
    case "high":
      return <div className="flex flex-row items-center">
        <SignalHigh className="size-4 text-green-500" /> <span className="text-xs text-green-500">High</span>
      </div>;
    default:
      return null;
  }
}

interface TaskColumnProps extends Omit<React.ComponentProps<typeof Kanban.Column>, "children"> {
  tasks: Task[];
}

function TaskColumn({ value, tasks, ...props }: TaskColumnProps) {
  return (
    <Kanban.Column value={value} {...props} className="bg-background/50 border-0 border-r rounded-none">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">{COLUMN_TITLES[value]}</span>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      <div className="flex flex-col gap-2 p-0.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle />
        ))}
      </div>
    </Kanban.Column>
  );
}
