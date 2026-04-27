import { AxiosInstance } from 'axios';
import { authService } from './auth-service';

export interface IClientProfileKPIs {
  total_processes: number;
  won_processes: number;
  in_progress_processes: number;
  total_financial: number;
  documents_sent: number;
  upcoming_meetings: number;
}

export interface ICompanyClientsKPIs {
  total_clients: number;
  active_clients: number;
  inactive_clients: number;
  new_this_month: number;
  clients_with_active_process: number;
}

class ClientKPIsService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getClientProfileKPIs(companyId: string, clientId: string): Promise<IClientProfileKPIs> {
    const response = await this.api.get(`/v1/companies/${companyId}/clients/${clientId}/kpis`);
    return response.data;
  }

  async getCompanyClientsKPIs(companyId: string): Promise<ICompanyClientsKPIs> {
    const response = await this.api.get(`/v1/companies/${companyId}/kpis?page=clients`);
    return response.data;
  }
}

export const clientKPIsService = new ClientKPIsService();
export default clientKPIsService;
