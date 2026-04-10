import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import { IPaginatedTaskLists } from '@/interfaces/ITaskList';

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
      `/v1/task-lists/${companyId}`,
      { params }
    );
    return response.data;
  }
}

export const taskListService = new TaskListService();
export default taskListService;
