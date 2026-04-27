import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';

export interface IFinance {
  id: string;
  amount: number;
  type: "income" | "outcome";
  status: "COMPLETED" | "PENDING";
  description: string;
  created_at: string;
}

export interface ICreateFinanceData {
    amount: number;
    type: "income" | "outcome";
    status: "COMPLETED" | "PENDING";
    description: string;
    category_id: string;
    process_id: string;
}

class FinancesService {
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  async getFinancesByClientId(companyId: string, clientId: string): Promise<IFinance[]> {
    // This expects the backend to support fetching finances directly by client_id. In Kamaia, finances are usually attached to processes.
    // If the backend has an endpoint for it:
    const response = await this.api.get(`/v1/companies/${companyId}/clients/${clientId}/finances`);
    return response.data;
  }

}

export const financesService = new FinancesService();
export default financesService;
