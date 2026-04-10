import { IBaseEntity } from './IBaseEntity';

export enum ITaskStatus {
  TODO = 'a fazer',
  IN_PROGRESS = 'em progresso',
  DONE = 'concluído',
}

export enum ITaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface ITask extends IBaseEntity {
  task_list_id: string;
  process_id: string;
  company_acl_id: string;
  status: ITaskStatus;
  priority: ITaskPriority;
  deadline: string; 
  title: string;
  description: string;
  
  // Relações carregadas
  task_list?: any;
  process?: any;
  company_acl?: {
      user?: any;
  };
}

export interface ICreateTaskData {
  task_list_id: string;
  process_id: string;
  company_acl_id: string;
  status?: ITaskStatus;
  priority?: ITaskPriority;
  deadline: string | Date;
  title: string;
  description: string;
}

export interface IUpdateTaskData extends Partial<ICreateTaskData> {}

export interface ITaskFilters {
  page?: number;
  take?: number;
  status?: string;
  search?: string;
}

export interface IPaginatedTasks {
  tasks: ITask[];
  total: number;
  total_pages: number;
  remaining_pages: number;
  last_page: number;
  page: number;
}

export interface ITaskProgress {
    completionRate: number;
    total: number;
    done: number;
}
