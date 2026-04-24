import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import { IFolder, ICreateFolderData, IUpdateFolderData } from '@/interfaces/IFolder';

class FolderService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getFolders(companyId: string): Promise<IFolder[]> {
    const response: AxiosResponse<IFolder[]> = await this.api.get(
      `/v1/companies/${companyId}/folders`
    );
    return response.data;
  }

  async createFolder(companyId: string, data: ICreateFolderData): Promise<IFolder> {
    const response: AxiosResponse<IFolder> = await this.api.post(
      `/v1/companies/${companyId}/folders`,
      data
    );
    return response.data;
  }

  async updateFolder(companyId: string, folderId: string, data: IUpdateFolderData): Promise<IFolder> {
    const response: AxiosResponse<IFolder> = await this.api.put(
      `/v1/companies/${companyId}/folders/${folderId}`,
      data
    );
    return response.data;
  }

  async deleteFolder(companyId: string, folderId: string): Promise<void> {
    await this.api.delete(`/v1/companies/${companyId}/folders/${folderId}`);
  }
}

export const folderService = new FolderService();
export default folderService;
