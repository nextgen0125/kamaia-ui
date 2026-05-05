import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import { IDocument, IDocumentFilters, IDownloadData } from '@/interfaces/IDocument';
import { IPaginatedDocuments } from '@/interfaces/IDocument';

class DocumentService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getDocuments(companyId: string, filters?: IDocumentFilters): Promise<IPaginatedDocuments> {
    const response: AxiosResponse<IPaginatedDocuments> = await this.api.get(
      `/v1/companies/${companyId}/documents`,
      { params: filters }
    );
    return response.data;
  }

  async getClientDocuments(companyId: string, clientId: string, filters?: IDocumentFilters): Promise<IPaginatedDocuments> {
    const response: AxiosResponse<IPaginatedDocuments> = await this.api.get(
      `/v1/companies/${companyId}/clients/${clientId}/documents`,
      { params: filters }
    );
    return response.data || [];
  }

  async getProcessDocuments(companyId: string, processId: string, filters?: IDocumentFilters): Promise<IPaginatedDocuments> {
    const response: AxiosResponse<IPaginatedDocuments> = await this.api.get(
      `/v1/companies/${companyId}/processes/${processId}/documents`,
      { params: filters }
    );
    return response.data || [];
  }


  async getDocumentById(companyId: string, id: string): Promise<IDocument> {
    const response: AxiosResponse<IDocument> = await this.api.get(
      `/v1/companies/${companyId}/documents/${id}`
    );
    return response.data;
  }

  async createDocument(companyId: string, formData: FormData): Promise<IDocument> {
    const response: AxiosResponse<IDocument> = await this.api.post(
      `/v1/companies/${companyId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async deleteDocument(companyId: string, id: string): Promise<void> {
    await this.api.delete(`/v1/companies/${companyId}/documents/${id}`);
  }

  async downloadDocument(companyId: string, id: string): Promise<IDownloadData> {
    const response: AxiosResponse<IDownloadData> = await this.api.get(
      `/v1/companies/${companyId}/documents/${id}/download`
    );
    return response.data;
  }
}

export const documentService = new DocumentService();
export default documentService;
