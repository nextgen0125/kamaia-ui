import { IBaseEntity } from './IBaseEntity';

export interface ITaskList extends IBaseEntity {
  company_id: string;
  company_acl_id: string;
  name: string;
}

export interface IPaginatedTaskLists {
  task_lists: ITaskList[];
  total: number;
  total_pages: number;
  remaining_pages: number;
  last_page: number;
  page: number;
}
