import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';

export interface IProcessTimeline {
  id: string;
  company_id: string;
  process_id: string;
  company_acl_id: string | null;
  type: string;
  title: string;
  description: string | null;
  metadata: any;
  created_at: string;
  company_acl?: {
      user: {
          first_name: string;
          last_name: string;
      }
  }
}

export interface IPaginatedTimeline {
  timeline: IProcessTimeline[];
  total: number;
  total_pages: number;
  remaining_pages: number;
  page: number;
  last_page: number;
}

class ProcessTimelineService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getTimeline(
    companyId: string,
    processId: string,
    page: number = 1,
    take: number = 10
  ): Promise<IPaginatedTimeline> {
    try {
      const response: AxiosResponse<IPaginatedTimeline> = await this.api.get(
        `/v1/companies/${companyId}/processes/${processId}/timeline`,
        { params: { page, take } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const processTimelineService = new ProcessTimelineService();
