import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import { IPaginatedTaskLists, ITaskList } from '@/interfaces/ITaskList';

class TaskListService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getTaskLists(
    companyId: string,
    params?: { page?: number; take?: number }
  ): Promise<IPaginatedTaskLists> {
    const response: AxiosResponse<IPaginatedTaskLists> = await this.api.get(
      `/v1/companies/${companyId}/task-lists`,
      { params }
    );
    return response.data;
  }

  async createTaskList(
    companyId: string,
    data: { name: string; company_acl_id: string }
  ): Promise<ITaskList> {
    const response: AxiosResponse<ITaskList> = await this.api.post(
      `/v1/companies/${companyId}/task-lists`,
      { ...data, company_id: companyId }
    );
    return response.data;
  }

  async updateTaskList(
    companyId: string,
    id: string,
    data: { name: string; company_acl_id: string }
  ): Promise<ITaskList> {
    const response: AxiosResponse<ITaskList> = await this.api.put(
      `/v1/companies/${companyId}/task-list/${id}`,
      { ...data, company_id: companyId }
    );
    return response.data;
  }

  async deleteTaskList(companyId: string, id: string): Promise<void> {
    await this.api.delete(`/v1/companies/${companyId}/task-list/${id}`);
  }
}

export const taskListService = new TaskListService();
export default taskListService;
