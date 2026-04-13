import { IBaseEntity } from './IBaseEntity';
import { ICompanyACL } from './ICompanyACL';

export interface ITaskList extends IBaseEntity {
  company_id: string;
  company_acl_id: string;
  name: string;
  company_acl?: ICompanyACL;
}

export interface IPaginatedTaskLists {
  taskLists: ITaskList[];
  total: number;
  total_pages: number;
  remaining_pages: number;
  last_page: number;
  page: number;
}
