import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import {
  ITask,
  ICreateTaskData,
  IUpdateTaskData,
  ITaskFilters,
  IPaginatedTasks,
  ITaskProgress,
} from '@/interfaces/ITask';

class TaskService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getTasks(
    companyId: string,
    filters?: ITaskFilters
  ): Promise<IPaginatedTasks> {
    const response: AxiosResponse<IPaginatedTasks> = await this.api.get(
      `/v1/companies/${companyId}/tasks`,
      { params: filters }
    );
    return response.data;
  }

  async getTaskProgress(companyId: string): Promise<ITaskProgress> {
    const response: AxiosResponse<ITaskProgress> = await this.api.get(
      `/v1/companies/${companyId}/tasks/progress`
    );
    return response.data;
  }

  async createTask(
    companyId: string,
    data: ICreateTaskData
  ): Promise<ITask> {
    const response: AxiosResponse<ITask> = await this.api.post(
      `/v1/companies/${companyId}/tasks`,
      data
    );
    return response.data;
  }

  async updateTask(
    companyId: string,
    taskId: string,
    data: IUpdateTaskData
  ): Promise<ITask> {
    const response: AxiosResponse<ITask> = await this.api.put(
      `/v1/companies/${companyId}/tasks/${taskId}`,
      data
    );
    return response.data;
  }

  async deleteTask(
    companyId: string,
    taskId: string
  ): Promise<void> {
    await this.api.delete(`/v1/companies/${companyId}/tasks/${taskId}`);
  }
}

export const taskService = new TaskService();
export default taskService;
