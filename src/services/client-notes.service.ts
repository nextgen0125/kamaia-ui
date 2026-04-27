import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';

export interface IClientNote {
  id: string;
  title?: string;
  content: string;
  created_at: string;
  company_acl?: {
    user?: {
      firstName: string;
      lastName: string;
    }
  };
}

class ClientNotesService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getNotes(companyId: string, clientId: string): Promise<IClientNote[]> {
    const response = await this.api.get(`/v1/companies/${companyId}/clients/${clientId}/notes`);
    return response.data;
  }

  async createNote(companyId: string, clientId: string, data: { client_id: string; title?: string; content: string }): Promise<IClientNote> {
    const response = await this.api.post(`/v1/companies/${companyId}/clients/${clientId}/notes`, data);
    return response.data;
  }

  async updateNote(companyId: string, noteId: string, clientId: string, data: { title?: string; content?: string }): Promise<IClientNote> {
    const response = await this.api.put(`/v1/companies/${companyId}/clients/${clientId}/notes/${noteId}`, data);
    return response.data;
  }

  async deleteNote(companyId: string, noteId: string, clientId: string): Promise<{ message: string; id: string }> {
    const response = await this.api.delete(`/v1/companies/${companyId}/clients/${clientId}/notes/${noteId}`);
    return response.data;
  }
}

export const clientNotesService = new ClientNotesService();
export default clientNotesService;
