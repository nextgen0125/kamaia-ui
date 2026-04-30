import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';

export interface ICaseNote {
  id: string;
  company_id: string;
  client_id: string | null;
  process_id: string | null;
  company_acl_id: string;
  title: string;
  content: string;
  created_at: string;
  company_acl?: {
    user: {
      first_name: string;
      last_name: string;
    };
  };
}

export interface ICreateCaseNoteData {
  title?: string;
  content: string;
}

class CaseNotesService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getNotes(companyId: string, processId: string): Promise<ICaseNote[]> {
    try {
      const response: AxiosResponse<ICaseNote[]> = await this.api.get(
        `/v1/companies/${companyId}/processes/${processId}/notes`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createNote(companyId: string, processId: string, data: ICreateCaseNoteData): Promise<ICaseNote> {
    try {
      const response: AxiosResponse<ICaseNote> = await this.api.post(
        `/v1/companies/${companyId}/processes/${processId}/notes`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const caseNotesService = new CaseNotesService();
