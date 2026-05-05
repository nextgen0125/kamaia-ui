import { IEventType } from "@/interfaces/IEvent";
import { AlertCircle, CalendarIcon, Clock, Users, Video } from "lucide-react";


// Funções auxiliares para formatar os eventos
export const getEventTypeIcon = (type: string) => {
    switch (type) {
        case IEventType.HEARING:
            return <CalendarIcon className="size-4" />;
        case IEventType.MEETING:
            return <Users className="size-4" />;
        case IEventType.TERM:
            return <AlertCircle className="size-4" />;
        case IEventType.VIDEO:
            return <Video className="size-4" />;
        default:
            return <Clock className="size-4" />;
    }
};

export const getEventTypeColor = (type: string) => {
    switch (type) {
        case IEventType.HEARING:
            return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
        case IEventType.MEETING:
            return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
        case IEventType.TERM:
            return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
        case IEventType.VIDEO:
            return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400";
        default:
            return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400";
    }
};

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high":
            return "destructive";
        case "medium":
            return "default";
        case "low":
            return "secondary";
        default:
            return "secondary";
    }
};

// Função para obter texto da prioridade
export const getPriorityText = (priority: string) => {
    switch (priority) {
        case "high":
            return "Alta";
        case "medium":
            return "Média";
        case "low":
            return "Baixa";
        default:
            return "";
    }
};