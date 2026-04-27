import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';

export interface IClient {
  id: string;
  name: string;
  type: "pf" | "pj";
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  is_active: boolean;
  nacionality: string;
  birth_place: string;
  address: string;
  Id_validity: string;
  Identity_card_number: string;
  nif: string;
  country: string;
  city: string;
  profile: string;
  marital_status: string;
  father_name: string;
  mother_name: string;
  profession: string;
  company_name: string;
  created_at: string;
  involved?: any[];
}

export interface ICreateClientData {
    name?: string;
    type?: "pf" | "pj";
    email?: string;
    phone?: string;
    cpf?: string;
    rg?: string;
    nacionality?: string;
    birth_place?: string;
    address?: string;
    Identity_card_number?: string;
    Id_validity?: string;
    nif?: string;
    country?: string;
    city?: string;
    profile?: string;
    marital_status?: string;
    father_name?: string;
    mother_name?: string;
    profession?: string;
    company_name?: string;
}

export interface IPaginatedClients {
  clients: IClient[];
  total: number;
  total_pages: number;
  remaining_pages: number;
  last_page: number;
  page: number;
}

class ClientsService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getClients(companyId: string, page = 1, take = 10): Promise<IPaginatedClients> {
    const response = await this.api.get(`/v1/companies/${companyId}/clients`, {
        params: { page, take }
    });
    return response.data;
  }

  async getClientById(companyId: string, clientId: string): Promise<IClient> {
    const response = await this.api.get(`/v1/companies/${companyId}/clients/${clientId}`);
    return response.data;
  }

  async createClient(companyId: string, data: ICreateClientData): Promise<IClient> {
    const response = await this.api.post(`/v1/companies/${companyId}/clients`, data);
    return response.data;
  }

  async updateClient(companyId: string, clientId: string, data: Partial<ICreateClientData>): Promise<IClient> {
    const response = await this.api.put(`/v1/companies/${companyId}/clients/${clientId}`, data);
    return response.data;
  }

  async deleteClient(companyId: string, clientId: string): Promise<{ message: string; id: string }> {
    const response = await this.api.delete(`/v1/companies/${companyId}/clients/${clientId}`);
    return response.data;
  }
}

export const clientsService = new ClientsService();
export default clientsService;
